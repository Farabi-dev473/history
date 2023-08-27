import puppeteer from "puppeteer";

const main = async() => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto("https://google.com", {waitUntil: "networkidle2"})
    await page.type(".gLFyf", "facebook")
    await page.keyboard.press("Enter", {delay: "10000"})
    // await page.click()
    // await page.screenshot({path: "stripeSS.png"})
    await browser.close()
}

main()
