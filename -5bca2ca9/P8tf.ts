// external imports
import axios, {AxiosProxyConfig } from 'axios'
import PQueue from 'p-queue'
import fs from 'fs'
import dotenv from 'dotenv'
import jsonFormat from 'json-format'
import express from 'express'
import getSpaceData from './services/getSpaceData.js'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.post('/', async (req, res) => {
  const {spaceIds} = req.body
  const shouldProcess = spaceIds instanceof Array
  if(!shouldProcess) {
    res.status(400).json({message: 'Please provide spaceIds body'})
  }

  const spaceId = spaceIds[0]

  const spaceData = await getSpaceData(spaceId)

  const {data: {audioSpace}} = spaceData
   const {title, started_at, state} = audioSpace?.metadata
   const {admins, speakers, listeners} = audioSpace?.participants
   const admin = admins[0]
   admins?.shift()

  if(state.toLowerCase() !== 'running') {
    res.status(400).send("Space has been ended")
  }

  const space = await prisma.space.findFirst({
    where: {
      id: spaceId
    },
    select: {
      id: true
    }
  })

  if(space?.id) {
    const data = await prisma.space.findFirst({
      where: {
        id: spaceId,
      },
      select: {
        coHosts: {
          where: {
            spaceId: spaceId
          },
          select: {
            name: true
          }
        },
        speakers: {
          where: {
            spaceId: spaceId
          },
          select: {
            name: true
          }
        },
        listener: {
          where: {
            spaceId: spaceId
          },
          select: {
            name: true
          }
        },
        id: true
      },
    })


    const liveListenerNames = listeners.map(({display_name}: any) => display_name)
    const liveSpeakerNames = speakers.map(({display_name}: any) => display_name)
    const liveCoHostNames = admins.map(({display_name}: any) => display_name)

   
    const liveMemberNames = [...liveCoHostNames, ...liveListenerNames, ...liveSpeakerNames]
    const memberNames = await prisma.members.findMany({
      where: {
        spaceId
      },
      select: {
        name: true
      }
    })

    const membersToUpdate: string[] = []

    memberNames.forEach(({name}) => {
      if(!liveMemberNames.includes(name)) membersToUpdate.push(name)
    } )

    // const liveListenerNames =  listeners.map(({display_name}: any) => display_name)
    // const liveSpeakerNames =  speakers.map(({display_name}: any) => display_name)
    // const liveListenerNames =  listeners.map(({display_name}: any) => display_name)

    // const listenersToUpdate: string[] = []
    // data?.listener.forEach((listener) => {
    //   const isListenerExist = liveListenerNames.includes(listener.name)
    //   if(!isListenerExist) {
    //      listenersToUpdate.push(listener.name)
    //   }
    // })

    const intervalTimeInMs = 10000
    const updatedTime = new Date((new Date().getTime() - intervalTimeInMs)) 
    await prisma.members.updateMany({
      where: {
        name: {
          in: membersToUpdate
        }
      } ,
      data: {
        time: updatedTime
      }
    })
  }

}) 

// // Create data of listeners
// // If someone gets out form the space then don't update his time
// // If someone gets add then set his time

// // internal imports
// import axiosProxyConfigs from './configs/axiosProxyConfigs.js'
// import axiosConfigs from './configs/axiosConfigs.js'
// import getSpaceData from './services/getSpaceData.js'


// const getTwitterSpaceData = async (spaceId: string) => {
//    const url = `https://twitter.com/i/api/graphql/SZf3Ceycp2dG7rrjd4oorg/AudioSpaceById?variables=%7B%22id%22%3A%22${spaceId}%22%2C%22isMetatagsQuery%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withReplays%22%3Atrue%7D&features=%7B%22spaces_2022_h2_clipping%22%3Atrue%2C%22spaces_2022_h2_spaces_communities%22%3Atrue%2C%22blue_business_profile_image_shape_enabled%22%3Afalse%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Afalse%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_richtext_consumption_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`

//    const response = await axios.get(url, {
//     proxy: (axiosProxyConfigs as unknown) as AxiosProxyConfig,
//     ...axiosConfigs
//    })

//    if(!response?.data) throw new Error("Space Id was invalid")
  
//    const {data: {audioSpace}} = response?.data
//    const {title, started_at} = audioSpace?.metadata
//    const {admins, speakers, listeners} = audioSpace?.participants
//    const admin = admins[0]
//    admins?.shift()

  
//   const space = await prisma.space.findFirst({where: {id: spaceId}, select: {id: true}})
//   if(!space?.id) {
//     await prisma.space.create({
//       data: {
//         id: spaceId,
//         title,
//         host: admin?.display_name,
//         time: new Date(started_at),
//         coHosts: {
//           createMany: {
//             data: admins.map((coHost: any) => {
//                return {
//                  name: coHost.display_name,
//                  time: new Date(coHost.start)
//                }
//             })
//           }
//         },
        
//         speakers: {
//           createMany: {
//             data: speakers.map((speaker: any) => {
//                return {
//                  name: speaker.display_name,
//                  time: new Date(speaker.start)
//                }
//             })
//           }
//         },
  
//         listener: {
//           createMany: {
//             data: listeners.map((listener: any) => {
//                return {
//                  name: listener.display_name,
//                  time: listener.start? new Date(listener.start) : new Date()
//                }
//             })
//           }
//         }
        
//       }
//     })
//   }else{
//     const data = await prisma.space.findMany({
//       where: {
//         id: spaceId,
//       },

//       include: {
//         coHosts: {
//           where: {
//             spaceId: spaceId
//           },
//           select: {
//             name: true
//           }
//         },
//         speakers: {
//           where: {
//             spaceId: spaceId
//           },
//           select: {
//             name: true
//           }
//         },
//         listener: {
//           where: {
//             spaceId: spaceId
//           },
//           select: {
//             name: true
//           }
//         },
//       },
//       select: {id: true}
//     })
//   } 
// }

// const spaceIds :any[] = ['1gqGvypgnokKB', '1YqKDodnYYNxV', '1MYGNgpPXmZJw']
// const spaceQueue = new PQueue({concurrency: spaceIds.length})

// const intervalTimeInMs = 10000

// const main = async () => {
//     spaceIds.forEach(async (spaceId) => {
//        await spaceQueue.add(() => {
//         setInterval( async() => {
//           await getTwitterSpaceData(spaceId)
//           // const filePath = `${process.cwd()}/spaces/$${spaceId}.json`
//           // fs.writeFileSync(filePath, jsonFormat(spaceMembersData))
//         }, intervalTimeInMs)
//        }) 
//     })
// }

// main()



app.listen(4000)