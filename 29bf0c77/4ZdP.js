import express from 'express'
import puppeteer from 'puppeteer'

const app = express()
let browser

app.get('/', async (req, res) => {
   if(!browser) {
    browser = await puppeteer.launch({headless: false})
   }    

   const [page] = puppeteer.pages()
   await page.goto('https://jobs.bdjobs.com/jobsearch.asp', {waitUntil: 'networkidle2'})
   await page.waitForSelector('.job_seen_beacon')
   await page.evaluate(() => {
      return [...document.querySelectorAll('.jcs-JobTitle')].map((data) => {
         return {
            title: data.childNodes[0].innerText,
            url: data.href
         }
      })
   })
})

app.listen(4000, () => console.log('app listening on port 4000!'))