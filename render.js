const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--autoplay-policy=no-user-gesture-required"
    ]
  });

  const context = await browser.newContext({
    viewport: {
      width: 1080,
      height: 1920
    },
    recordVideo: {
      dir: "video-output",
      size: {
        width: 1080,
        height: 1920
      }
    }
  });

  const page = await context.newPage();

  await page.goto(
    "file://" + process.cwd() + "/bpl-intro.html",
    {
      waitUntil: "load"
    }
  );

  // Start the BPL animation
  await page.evaluate(() => {
    if (typeof start === "function") {
      start();
    }
  });

  console.log("BPL animation started...");

  // Wait for the complete animation
  await page.waitForTimeout(35000);

  console.log("BPL animation finished.");

  // Closing the page finalizes the video file
  await page.close();
  await context.close();

  await browser.close();

  console.log("Video recording completed.");
})();
