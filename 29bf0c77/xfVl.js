import puppeteer from "puppeteer"
// const puppeteer = require('puppeteer')

async function main () {
   const browser = await puppeteer.launch({headless: false})
   const [page] = await browser.pages()
   await page.setRequestInterception(true)
   page.on('request', interceptedRequest => {
       if(interceptedRequest.resourceType() === 'image') interceptedRequest.abort()
       else interceptedRequest.continue()
   })

}

main()