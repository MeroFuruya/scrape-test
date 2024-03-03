import { inspect } from "util";
import { getChromeContext } from "../util/getChromeInstance";
export async function main() {
  const context = await getChromeContext();
  const page = await context.newPage();
  await page.goto(
    "https://webscraper.io/test-sites/e-commerce/ajax/computers/laptops"
  );
  const pages = await page.$$(".pagination button");
  const mappedItems = [];

  for (let paginatorButton of pages) {
    await paginatorButton.click();
    const items = await page.$$(".card.product-wrapper .card-body");
    for (let item of items) {
      const link = await item.$("a.title");
      const title = await link?.innerText();
      const url = await link?.getAttribute("href");
      const price = await (await item.$(".price"))?.innerText();
      const description = await (await item.$(".description"))?.innerText();
      mappedItems.push({ title, url, price, description });
    }
  }

  await page.close();
  console.log(
    "webscraperio - ajax pagination",
    inspect(mappedItems, false, null, true)
  );
  return;
}

// async function scrapeProductDetails(url: string) {
//   const context = await getChromeContext();
//   const page = await context.newPage();
//   await page.goto(url);
//   const productPane = await page.$(".product-wrapper.card .card-body .row");
//   const productCaption = await productPane?.$(".caption");
//   const details = [];
//   const selectors = (await productCaption?.$$("label"))?.map((label) =>
//   );
// }
