import puppeteer from "puppeteer";

const main = async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.google.com")
    await page.screenshot({path: "google.png"})
    await browser.close()
}


main()