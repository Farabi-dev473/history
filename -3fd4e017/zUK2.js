import puppeteer from "puppeteer";

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/login");
    await page.waitForSelector('iframe')
    const element = await page.$('iframe')
    console.log(element)
    // await page.screenshot({ path: "google.png" });
    // await browser.close();
}