import { Message } from "discord.js";
import extractStringInsideCurlyBraces from "../utils/extractStringInsideCurlyBraces.js";
import {prisma} from '../app.js'
import QuoteAPIResponse from "../interfaces/QuoteAPIResponse";

const messageCreateHandler =  async (message: Message) => {

    try {
      if(message.author.bot) return
      let authorName, categoryName, authorId, categoryId
      let entities = extractStringInsideCurlyBraces(message.content)
      authorName = entities[0]
      categoryName = entities[1]

      if(!authorName) {
        message.reply('Provide both author')
      }

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

      if(data && data?.quotes?.length !== 0) {
        const quote = data?.quotes[Math.floor(Math.random() * data.quotes.length)].quote
        message.reply(`${quote} - ${data.name}`)
        return
      }

      const quoteApiURL = categoryName ? `${process.env.QUOTE_API_ROOT_URL}quotes?autho-r=${authorName}&genre=${categoryName}` : `${process.env.QUOTE_API_ROOT_URL}quotes?author=${authorName}`
      const response = await fetch(quoteApiURL)
      const {data: quotes} = await response.json() as QuoteAPIResponse
      
      if(quotes.length.toString() === '0') {
        message.reply('No quotes found. Use /ask command to generate using AI.')
        return
      }

      const randomIndex = Math.floor(Math.random() * quotes.length)
      const {quoteText, quoteGenre, quoteAuthor} = quotes[randomIndex]
      message.reply(`${quoteText} - ${authorName}`)
      console.log(quoteText)
      // prisma query to get author using its name property
      let author = await prisma.author.findFirst({
        where: {
          name: authorName,
        },
        select: {
          id: true,
        }
      })

    //  // prisma query to get category using its name property
    //   let category = await prisma.category.findFirst({
    //     where: {
    //       name: quoteGenre.toLowerCase()
    //     },
    //     select: {
    //       id: true,
    //     }
    //   })


      if(!author) {
        author = await prisma.author.create({
          data: {
            name: authorName,
          }
        })
      }

      const quoteGenres = quotes.reduce((acc: string[], quote) => {
        acc.push(quote.quoteGenre)
        return acc
      }, [])

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

        

      const newCategories = await prisma.category.createMany({
        data: quoteGenres.reduce((acc: any[], quoteGenre) => {
          if(!categories.find(category => category.name === quoteGenre)) {
            acc.push({name: quoteGenre})
          }
          return acc
        }, [])
      })

      // get all the categories which  mathced withh api response quotes categorry
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


      // save all the quotes to database
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

    //   // prisma query to get author id using its name property
    //   const author = await prisma.author.findUnique({
    //     where: {
    //       name: authorName
    //     },
    //     select: {
    //       id: true,
    //     }
    //   })

    //   if(!author) {
    //     message.reply('Author not found. Use /ask command to generate using AI.')
    //     return
    //   }

    //   const authorId = author.id

    //   // prisma query to get quote id using its text property



      
    //   const categoryData = await prisma.category.findFirst({
    //     where: {
    //        name: categoryName
    //     },
    //     select: {
    //       id: true,
    //     }
    //   })

    // let category
      
    //   if(categoryData?.id) {
    //       category = await prisma.category.create({
    //         data: {
    //           name: categoryName
    //         },
    //         select: {
    //           id: true
    //         }
    //       })
    //   }
    
      

    //   // save the quote with author id & cateogyr id to database
    //   // authorId = authorData?.id || 
    //   categoryId = categoryData?.id || category?.id
    //   // await prisma.quote.create({
    //   //   data: quotes.reduce((acc, curr) => {
    //   //       const data = {
    //   //         quote: curr.quoteText,
    //   //         authorId: 
      //       }
      //   }, [])
      // })
    }catch(err){
      
      message.reply("Server Error: " + (err as Error).message)
    }
};

export default messageCreateHandler