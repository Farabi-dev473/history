import { chromium } from "@playwright/test";

const main = async (twitterUrl: string) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: { dir: "./videos" },
  });

  const page = await context.newPage();

  // navigate to twitter
  await page.goto(twitterUrl, { waitUntil: "networkidle" });
  const isTweetPinned = await page.evaluate(() =>
    document.querySelector("html")?.innerText.includes("Pinned Tweet")
  );

  const scrollSlowly = async () => {
    const notNowBtn = await page.evaluate(() => {
      const notNowBtn = [...document.querySelectorAll('[role="button"]')].find(
        (node) => node.innerText === "Not now"
      );

      if (notNowBtn) {
        notNowBtn.click();
      }
    });

    for (let j = 0; j < 110; j++) {
      await page.mouse.wheel(0, 5);
    }
    await page.waitForTimeout(
      Math.floor(Math.random() * (3000 - 500 + 1)) + 500
    );
  };

  if (isTweetPinned) {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 50);
    }

    await page.waitForTimeout(2000);
    const element = (await page.$$('div[data-testid="tweetText"]'))[0];
    await element.click();

    await page.waitForLoadState("networkidle");

    await scrollSlowly();

    await page.waitForTimeout(1000);

    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, -100);
    }

    await page.goBack({ waitUntil: "networkidle" });
  }

  for (let i = 0; i < 5; i++) {
    console.log("HELLO");
    await scrollSlowly();
  }
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, -200);
  }

  await page.waitForTimeout(2000);
  await browser.close();
};

main("https://twitter.com/kunalstwt");
// main("https://twitter.com/CNCFStudents");
// main("https://twitter.com/mrhm_dev?lang=en");
