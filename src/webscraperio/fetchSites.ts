import { inspect } from "util";
import { getChromeContext } from "../util/getChromeInstance";
export async function main() {
  console.log("webscraperio");
  const context = await getChromeContext();
  const page = await context.newPage();
  await page.goto("https://webscraper.io/test-sites");
  const sites = (await page.$$(".container.test-sites .row")).map(
    async (site) => {
      const link = await site.$$("a");
      const href = await link[0].getAttribute("href");
      const title = await link[0].innerText();
      const description = await site
        .$$(".lead")
        .then((el) => el.map((e) => e.innerText()));
      return Promise.all(description).then((values) => {
        return { title, href, descriptions: values };
      });
    }
  );
  const mappedSites = await Promise.all(sites);
  await page.close();
  console.log(
    "webscraperio - fetch sites",
    inspect(mappedSites, false, null, true)
  );
  return;
}
