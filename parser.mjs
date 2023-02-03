import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage();
    page.waitForTimeout(1000)

    await page.evaluateOnNewDocument(() => {
        window.onlyMarkdown = true;
        console.log('window.onlyMarkdown');
    });

    await page.goto('https://context-anticipate-686475.framer.app/new-Translations')

    const elements = await page.$$(".englishDefault")

    const keys = {}

    for (const elem of elements) {
        const h = await page.evaluate(el => el.innerText, elem);
        const classNameHd = await elem.getProperty('className');
        const className = await classNameHd.jsonValue();
        const split = className.split(' ')
        const translationKeys = split.filter(className => className !== 'englishDefault')[0]
        console.log(translationKeys)

        keys[translationKeys] = h

        console.log(keys)
    }


    
}) ()


