import puppeteer from "puppeteer" 

(async () =>{
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://twitter.com/i/flow/login', {waitUntil: 'networkidle2'})
    await page.waitForSelector('[name="text"]')
    await page.type('[name="text"]', "farabi.dev.224@gmail.com")
    await page.keyboard.press('Enter')
    await page.waitForSelector('[type="password"]')
    await page.type('[name="password"]', "New Password")
    await page.keyboard.press('Enter') 
    await page.goto('https://twitter.com/i/spaces/1kvJpmWQpvLxE/peek', {waitUntil: 'networkidle2'})
    await page.click('[aria-label="Join this Space"]')
    let time = new Date().getTime() + 10000
    while(new Date().getTime() < time) {}
    const data = await page.evaluate(() => {
        const data = []
        let row = 2
        let column = 1
        let done = false
        let result, element
        while(!done) {
            for(column; column <= 4; column++) {
                element = document.querySelector(`#layers > div:nth-child(2) > div > div > div > div > div.css-1dbjc4n.r-1q9bdsx.r-13qz1uu > div > div > div.css-1dbjc4n.r-13awgt0.r-1pn2ns4 > div > div > div:nth-child(${row}) > div > div:nth-child(${column})`)
                if(element === null) {
                    done = true
                    break
                }
                const [name, type] = element?.innerText.split('\n')    
                data.push({name, type})
            }
            column = 1
            ++row
        }
        return data

    })

    console.log(data)
    
    // await page.type()
    // await page.evaluate(() => document.querySelector('[aria-label="Join this Space"]'))

})()

// for getting all memeber in a space
//new Set([...document.querySelectorAll(".css-1dbjc4n.r-1awozwy.r-xoduu5.r-18u37iz.r-dnmrzs")].map((e) => e.innerText))

