import puppeteer from "puppeteer"
import delay from "delay"

const twitterLoginPageUrl = 'https://twitter.com/i/flow/login'

const getAllMembersFromSpace = async (spaceId) => {
    const browser = await puppeteer.launch()
    const [page] = await browser.pages()
    await page.goto(twitterLoginPageUrl)
    await page.waitForSelector('[name="text"]')
    await page.type('[name="text"]', process.env.TWITTER_EMAIL)
    await page.keyboard.press('Enter')
    await page.waitForSelector('[name="password"]')
    await page.type('[name="text"]', process.env.TWITTER_PASSWORD)
    await page.keyboard.press('Enter') 
    await page.goto(`https://twitter.com/i/spaces/${spaceId}/peek`, {waitUntil: 'networkidle2'})    
    const element = await page.$('[aria-label="Join this Space"]')
    if(!element) throw new Error('Space has been closed') 
    await page.waitForSelector('[aria-label="Join this Space"]')
    await page.click('[aria-label="Join this Space"]')
    await page.waitForSelector('.css-1dbjc4n.r-13awgt0.r-1pn2ns4')
    const data = await page.evaluate(() => {
        const data = []
        let row = 2
        let column = 1
        let done = false
        let element
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
    return data
}

export default getAllMembersFromSpace