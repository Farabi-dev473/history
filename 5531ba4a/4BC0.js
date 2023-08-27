import puppeteer from "puppeteer"
import delay from "delay"

const twitterLoginPageUrl = 'https://twitter.com/i/flow/login'

const getAllMembersFromSpace = async (spaceId) => {
    const browser = await puppeteer.launch()
    const [page] = await browser.pages()
    await page.goto(twitterLoginPageUrl)
    await page.waitForSelector('.r-30o5oe')
    await page.type('.r-30o5oe', process.env.TWITTER_EMAIL)
    await page.keyboard.press('Enter')
    await page.waitForSelector('.r-30o5oe')
    await page.type('.r-30o5oe', process.env.TWITTER_PASSWORD)
    await page.keyboard.press('Enter') 
    await page.goto(`https://twitter.com/i/spaces/${spaceId}/peek`, {waitUntil: 'networkidle2'})    
    const element = await page.$('[aria-label="Join this Space"]')
    if(!element) throw new Error('Space has been closed') 
    await page.waitForSelector('[aria-label="Join this Space"]')
    await page.click('[aria-label="Join this Space"]')
    // await page.waitForSelector('.css-1dbjc4n.r-13awgt0.r-1pn2ns4')
    await delay(20000)
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
    let host 
    let coHosts = []
    let speakers = []
    let listners = []

    for(const user in data) {
        switch(data[user].type.toLowerCase()) {
            case 'host':
                host = data[user].name
                break
            case 'co-host':
                coHosts.push(data[user].name)
                break
            case 'speaker':
                speakers.push(data[user].name)
                break
            case 'listner':
                console.log(data[user].name)
                listners.push(data[user].name)
                break
            default:
                break
        }
    }

    console.log(data.length)
    return {host, coHosts, speakers, listners}
}

export default getAllMembersFromSpace