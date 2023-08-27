import puppeteer from "puppeteer" 
import express from 'express'
import getAllMembersFromSpace from './handlers/getAllMembersFromSpace.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/:id', async(req, res) => {
    res.send(await getAllMembersFromSpace(req.params.id))
})

app.listen(4000, () => console.log('listening on 4000'))

// (async () =>{
//     const browser = await puppeteer.launch()
//     const [page] = await browser.pages()
//     await page.goto('https://twitter.com/i/flow/login', {waitUntil: 'networkidle2'})
//     await page.waitForSelector('[name="text"]')
//     await page.type('[name="text"]', "farabi.dev.224@gmail.com")
//     await page.keyboard.press('Enter')
//     await page.waitForSelector('[type="text"]')
//     await page.type('[name="text"]', "New Password")
//     await page.keyboard.press('Enter') 
//     await page.goto('https://twitter.com/i/spaces/1BdGYyRRyRBGX/peek', {waitUntil: 'networkidle2'})
//     await page.waitForSelector('[aria-label="Join this Space"]')
//     await page.click('[aria-label="Join this Space"]')
//     let time = new Date().getTime() + 20000
//     while(new Date().getTime() < time) {}
//     const data = await page.evaluate(() => {
//         const data = []
//         let row = 2
//         let column = 1
//         let done = false
//         let element
//         while(!done) {
//             for(column; column <= 4; column++) {
//                 element = document.querySelector(`#layers > div:nth-child(2) > div > div > div > div > div.css-1dbjc4n.r-1q9bdsx.r-13qz1uu > div > div > div.css-1dbjc4n.r-13awgt0.r-1pn2ns4 > div > div > div:nth-child(${row}) > div > div:nth-child(${column})`)
//                 if(element === null) {
//                     done = true
//                     break
//                 }
//                 const [name, type] = element?.innerText.split('\n')    
//                 data.push({name, type})
//             }
//             column = 1
//             ++row
//         }
//         return data

//     })
// })()

// for getting all memeber in a space
//new Set([...document.querySelectorAll(".css-1dbjc4n.r-1awozwy.r-xoduu5.r-18u37iz.r-dnmrzs")].map((e) => e.innerText))

