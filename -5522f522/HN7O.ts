import { Message } from "discord.js";
import extractStringInsideCurlyBraces from "../utils/extractStringInsideCurlyBraces.js";
import {prisma} from '../app.js'
import QuoteAPIResponse from "../interfaces/QuoteAPIResponse";
import getRandomQuote from "../utils/getRandomQuote.js";

type GraphQLReqType = {author: string, category: string}

const messageCreateHandler =  async (message: Message | GraphQLReqType) => {

    try {

      let isGraphQLRequest = typeof message === 'object' || false
      
      if((message as Message).author.bot) return

      // extract author name and category name from input message
      let authorName, categoryName
      let entities = isGraphQLRequest ? [message.author, (message as GraphQLReqType).category] : extractStringInsideCurlyBraces((message as Message).content)
      authorName = entities[0]
      categoryName = entities[1]

      if(!authorName && typeof message === 'object') {
        (message as Message).reply('Provide both author')
        return
      }

      // find quotes in database based on authorName & categoryName
      let data = await prisma.author.findUnique({
        where: {
          name: authorName
        },
        select: {
          name: true,
          quotes: {
            where: {
              Category: {
                name: categoryName
              },
            },
            select: {
              quote: true,
              authorId: true,
              categoryId: true,
            }
          }
        }
      });


      // return a random quote from the result from the above query
      if(data && data?.quotes?.length !== 0) {
        const quote = data?.quotes[Math.floor(Math.random() * data.quotes.length)].quote
        // (message as Message).reply(`${quote} - ${data.name}`)
        if()
        return
      }

      // make request to external api to get quote based on authorName & category name (optional)
      const quoteApiURL = categoryName ? `${process.env.QUOTE_API_ROOT_URL}quotes?autho-r=${authorName}&genre=${categoryName}` : `${process.env.QUOTE_API_ROOT_URL}quotes?author=${authorName}`
      const response = await fetch(quoteApiURL)
      const {data: quotes} = await response.json() as QuoteAPIResponse
      
      // check whether the result from external api has any quote
      if(quotes.length.toString() === '0') {
        message.reply('No quotes found. Use /ask command to generate using AI.')
        return
      }

      // return a random quote from the api result
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const {quoteText, quoteGenre, quoteAuthor} = quotes[randomIndex]
      message.reply(`${quoteText} - ${authorName}`)


      // prisma query to get author using its name property
      let author = await prisma.author.findFirst({
        where: {
          name: authorName,
        },
        select: {
          id: true,
        }
      })

      // if author not found, create author
      if(!author) {
        author = await prisma.author.create({
          data: {
            name: authorName,
          }
        })
      }

      // extract categories of all the quotes from api result
      const quoteGenres = quotes.reduce((acc: string[], quote) => {
        acc.push(quote.quoteGenre)
        return acc
      }, [])

      // get all the categories which  mathced with api response quotes categorry
      let categories = await prisma.category.findMany({
          where: {
            name: {
              in: quotes.reduce((acc: string[], quote) => {
                acc.push(quote.quoteGenre)
                return acc
              }, [])
            }
          },
          select: {
            id: true,
            name: true
          }
        })

        
      // create categories if they don't exist in the database 
      const newCategories = await prisma.category.createMany({
        data: quoteGenres.reduce((acc: any[], quoteGenre) => {
          if(!categories.find(category => category.name === quoteGenre)) {
            acc.push({name: quoteGenre})
          }
          return acc
        }, [])
      })

      // save all the categories to database from the api result
      categories = await prisma.category.findMany({
        where: {
          name: {
            in: quoteGenres
          }
        },
        select: {
          id: true,
          name: true
        }
      })


      // save all the quotes to database from the api result
      await prisma.quote.createMany({
        data: quotes.reduce((acc: QuoteTableColumn[], quote, index) => {

          const data: QuoteTableColumn = {
            authorId: author?.id as number,
            categoryId: categories.find(category => category.name === quote.quoteGenre)?.id as number,
            quote: quote.quoteText
          }

          acc.push(data)
          return acc
        }, [])
      })

    }catch(err){
        message.reply("Server Error: " + (err as Error).message)
    }
};

export default messageCreateHandler