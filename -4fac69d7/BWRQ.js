import puppeteer from "puppeteer";

class Chrome {
    constructor(){}

    async init(options) {
        // start browser
        if(!this.browser) this.browser = await puppeteer.launch(options)
    }

    async cleanup(){
        if(this.browser) await this.browser.close()
    }

    async navigate(url) {
        const page = await this.browser.newPage()
        await page.goto(url)
        return page
    }

    async getTitle(page) {
        return await page.title
    }

}

class ExampleDotComScraper extends Chrome {
    async scrape(url) {
        await this.init()
        const page = await this.navigate(url)
        console.log(this.getTitle(page))
        this.cleanup()
    }
}

const main = async() => {
    const exampleDotComScraper = new ExampleDotComScraper()
    await exampleDotComScraper.scrape('example.com')
}