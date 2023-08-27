import puppeteer from "puppeteer";


async function main() {
    const browser = await puppeteer.launch({headless: false});
    const [page] = await browser.pages()

    const client = await page.target().createCDPSession()
    await client.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 20,
        downloadThroughput: (50 * 1024) / 8,
        uploadThroughput:(30 * 1024) / 8
    })

    page.goto('https://unsplash.com', {waitUntil: 'networkidle2'})

    // await browser.close();
}

main()