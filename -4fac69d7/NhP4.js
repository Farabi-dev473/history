import puppeteer from "puppeteer";
import {Queue, Worker} from 'bullmq'

class Chrome {
    constructor(){}

    async init(options) {
        // start browser
        if(!this.browser) this.browser = await puppeteer.launch(options)
    }

    async cleanup(){
        if(this.browser) {
          await this.browser.close()
          this.browser = null
        }
    }

    async navigate(url) {
        const page = await this.browser.newPage()
        await page.goto(url)
        return page
    }

    async getTitle(page) {
        await page.title()
    }

    async click(page, selector, navigation){
          await page.waitForSelector(selector, {visible: true})
          Promise.all([
            navigation && (await page.waitForNavigation()),
            await page.click(selector)
          ])
    }

    async type(page, selector) {
        await page.waitForSelector(selector, {visible: true})
        await page.focus(selector)
        await page.click(selector)
        await page.type(selector)
    }
}

class ExampleDotComScraper extends Chrome {
    async scrape(url) {
        await this.init()
        const page = await this.navigate(url)
        console.log(await this.getTitle(page))
        this.cleanup()
    }
}

const main = async() => {
    const exampleDotComScraper = new ExampleDotComScraper()
    await exampleDotComScraper.scrape('http://example.com')
}

const spaceQueue = new Queue('space')

spaceQueue.add('job1', {data: 'Data'})

new Worker('space', async function process(job) {
    console.log(job) 
})