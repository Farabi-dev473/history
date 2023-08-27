import express from 'express'
import puppeteer from 'puppeteer'

const app = express()
let browser

app.get('/', async (req, res) => {
   if(!browser) {
    browser = await puppeteer.launch({headless: false})
   }    

   let [page] = await browser.pages()
   await page.goto('https://www.indeed.com/?vjk=021b649beb2e6bee', {waitUntil: 'networkidle2'})
   await page.waitForSelector('.job_seen_beacon')
   const data = await page.evaluate(() => {
      return [...document.querySelectorAll('.jcs-JobTitle')].map((data) => {
         return {
            title: data.childNodes[0].innerText,
            url: data.href
         }
      })
   })
   
   data.forEach(async (item, index) => {
      let newTab = await browser.newPage()

      await newTab.goto(item.url, {waitUntil: 'networkidle2'})
      const newData = await page.evaluate(() => {
         return {
            applyLink: document.querySelector('.css-w6kkgs').href,
            description: document.querySelector('.jobsearch-jobDescriptionText').innerText
         }
      })

      console.log(newData)
  
      // res.write(JSON.stringify(data[index]))
      
      newTab.close()
   })
  
   
   
})

app.listen(4000, () => console.log('app listening on port 4000!'))