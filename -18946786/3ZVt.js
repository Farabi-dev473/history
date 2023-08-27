import puppeteer from "puppeteer";


async function main() {
    const browser = await puppeteer.launch({headless: false});
    const [page] = await browser.pages()

    const client = await page.target().createCDPSession()
    await client.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 20,
        downloadThroughput: (500 * 1024) / 8,
        uploadThroughput:(500 * 1024) / 8
    })

    await client.send('Emulation.setCPUThrottlingRate', {
        rate: 100,
    })

    page.goto('https://unsplash.com', {waitUntil: 'networkidle2'})
    // await browser.close();
}

main()