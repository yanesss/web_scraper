const puppeteer = require('puppeteer');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'; 


const webscraper = async (URL) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent(userAgent);
    
    await page.goto(URL);
    await page.waitForSelector('.commerce-product');
    await page.waitForSelector('.commerce-product-details');
    const productDetails = await page.$$('.commerce-product');
        
    let productList = {};
    const funkoDetails = [];

    for (const product of productDetails) {
        const link = await (await product.getProperty('href')).jsonValue();

        const titleHandler = await product.$('.heading-3');
        const title = await (await titleHandler.getProperty('innerHTML')).jsonValue();

        const priceHandler = await product.$('.product-price');
        const price = await (await priceHandler.getProperty('innerHTML')).jsonValue();  

        const imageHandler = await product.$('.shopify-image');
        const image = await (await imageHandler.evaluateHandle(element => element.getAttribute("style")));
        const imageJSON = await image.jsonValue();
        const regex = /"(.*?)"/;
        const imageURL = regex.exec(imageJSON)[0];
        
        funkoDetails.push([title, price, link, imageURL]);
    }

    productList = {
        funkoDetails
    };

    await browser.close();
    return productList;
}

module.exports = webscraper;