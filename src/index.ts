import { get } from "http";
import puppeteer from "puppeteer";

type PoolDetail = {
  tvl: number;
  apy: number;
};

const getOlivePool = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();

  await page.goto(
    "https://oliveapp.finance/earn/vaults/glp-high-yield-arbitrum"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.waitForSelector(".apyDetailInfo");

  const elemets = await page.$$(".apyDetailInfo > h6");
  const apyText = await (
    await elemets[0].getProperty("textContent")
  ).jsonValue();

  const tvlText = await (
    await elemets[1].getProperty("textContent")
  ).jsonValue();

  if (!apyText || !tvlText) {
    throw new Error("Cannot get Olive APY and TVL from source!");
  }

  // format APY
  const getTvlOnly = tvlText.split("Total")[0];
  const apy = apyText.replace("%", "");
  console.log([apy, getTvlOnly]);
};

const getRedactedPool = async () => {
  // if (this.poolDetail) return this.poolDetail;

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();

  await page.goto("https://pirex.io/vaults/pxgmx");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.waitForNetworkIdle();
  const values = await page.$$eval("div.mantine-3zl18c", (nodes) => {
    const realValue = nodes.map((n) => n.innerText);
    return realValue;
  });
  console.log(values);
  if (!values || values.length < 2) {
    throw new Error("Cannot get Redacted APY and TVL from source!");
  }
  const apyText = parseFloat(values[0]!.replace("%", "").replace(/,/g, ""));
  const tvlText = parseFloat(values[1]!.replace("$", "").replace(/,/g, ""));

  const poolDetail: PoolDetail = { tvl: +tvlText, apy: +apyText };
  await browser.close();
  return poolDetail;
};

getOlivePool();
getRedactedPool();
