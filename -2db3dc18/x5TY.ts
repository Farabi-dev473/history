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

  if (isTweetPinned) {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 50);
    }

    const element = (await page.$$('div[data-testid="tweetText"]'))[0];
    await element.click();

    await page.waitForLoadState("networkidle");
    for (let i = 0; i < 200; i++) {
      await page.mouse.wheel(0, 10);
    }

    await page.waitForTimeout(4000);

    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, -100);
    }

    await page.goBack({ waitUntil: "networkidle" });
  }

  const scrollSlowly = async () => {
    for (let j = 0; j < 110; j++) {
      await page.mouse.wheel(0, 5);
    }
    await page.waitForTimeout(
      Math.floor(Math.random() * (3000 - 500 + 1)) + 500
    );
  };

  for (let i = 0; i < 10000; i++) {
    console.log("HELLO");
    await scrollSlowly();
  }
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, -200);
  }

  await page.waitForTimeout(1000);
  await browser.close();
};

// main("https://twitter.com/kunalstwt");
main("https://twitter.com/CNCFStudents");
// main("https://twitter.com/mrhm_dev?lang=en");
