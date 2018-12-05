// require("babel-polyfill");
const puppeteer = require('puppeteer');
const path = require('path');

// 自定义的Chromium位置
const ChromiumPth = path.join(__dirname, '../../../chrome-mac/Chromium.app/Contents/MacOS/Chromium')

let main =  async () => {
  const browser = await puppeteer.launch({
    executablePath: ChromiumPth,
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 3480
  }); 
  await page.goto('https://www.huxiu.com/article/267248.html');

  page.on('frameattached', async ()=> {
    console.log(await page.mainFrame().$$('div'))
  })

  await page.screenshot({
    path: 'GithubActions.png'
  });
  await browser.close();
};
main();