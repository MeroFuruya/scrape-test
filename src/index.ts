import { closeChromeInstance } from "./util/getChromeInstance";
import * as webscraperio from "./webscraperio";
(async () => {
  await webscraperio.fetchSites();
  await webscraperio.ajaxPagination();
  await closeChromeInstance();
})().catch(console.error);
