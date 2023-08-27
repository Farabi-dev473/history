import puppeteer from "puppeteer" 

(async () =>{
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://twitter.com/i/flow/login', {waitUntil: 'networkidle2'})
    await page.click('[name="text"]')
    // await page.evaluate(() => document.querySelector('[aria-label="Join this Space"]'))

})()

// for getting all memeber in a space
//new Set([...document.querySelectorAll(".css-1dbjc4n.r-1awozwy.r-xoduu5.r-18u37iz.r-dnmrzs")].map((e) => e.innerText))

