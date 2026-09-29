const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--autoplay-policy=no-user-gesture-required"]
  });

  const page = await browser.newPage({
    viewport: {
      width: 1080,
      height: 1920
    },
    deviceScaleFactor: 1
  });

  await page.goto("file://" + process.cwd() + "/bpl-intro.html", {
    waitUntil: "load"
  });

  // Start the animation automatically
  await page.evaluate(() => {
    if (typeof start === "function") {
      start();
    }
  });

  console.log("BPL animation started...");

  // Wait for the complete 34.3 second animation
  await page.waitForTimeout(35000);

  console.log("BPL animation finished.");

  await browser.close();
})();
