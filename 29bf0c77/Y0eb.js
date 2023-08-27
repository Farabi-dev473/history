import puppeteer from "puppeteer";

const getDataFromNode = () => {
    return 'Data returned from node'
}

const main = async() => {
    const browser = await puppeteer.launch({headless: false})
    const [page] = await browser.pages();
    await page.exposeFunction('getDataFromNodeJS', getDataFromNode);
    await page.evaluate(async() => {
        const data = await getDataFromNodeJS();
        console.log(data);
    })
    await browser.close()
}

main()
