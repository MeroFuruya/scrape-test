import { Browser, BrowserContext, chromium } from "playwright";
let browser: Browser;
let context: BrowserContext;
async function initChromeInstance() {
  if (!browser) browser = await chromium.launch({ headless: true });
  if (!context) context = await browser.newContext();
  context.addCookies([
    {
      name: "cookie",
      value: "value",
      domain: "webscraper.io",
      path: "/",
      expires: Date.now() / 1000 + 10,
    },
  ]);
}
export async function closeChromeInstance() {
  if (context) await context.close();
  if (browser) await browser.close();
}
export async function getChromeContext() {
  if (!browser || !context) {
    await initChromeInstance();
  }
  return context;
}

export async function openChromePage(url: string) {
  const context = await getChromeContext();
  const page = await context.newPage();
  await page.goto(url);
  return page;
}
