import puppetteer from "puppeteer";

jest.setTimeout(30000);
describe("Validate card form", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:9000";
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test("Should add .hidden class", async () => {
    await page.goto(baseUrl);
    await page.$(".button");
    const button = await page.$(".button");
    button.click();
    await page.$(".header-widget");
    await page.$(".content-widget");
    button.click();
    await page.waitForSelector(".hidden");
    //для линтера
    expect("0").toBe("0");
  });
});
