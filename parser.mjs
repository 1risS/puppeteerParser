import puppeteer from "puppeteer";
import api from 'api';

const sdk = require('api')('@lokalise-devhub/v1.0#4jrla2jld4mbb1b');

sdk.auth('e194d92821be3306227f2c7d593a12961e5215cf');
sdk.uploadAFile({project_id: '3735380963dd813d1995c3.11101902'})
.then(({ data }) => console.log(data))
.catch(err => console.error(err));

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
        const split = className.split(' ');
        const translationKeys = split.filter(className => className !== 'englishDefault')[0];
        keys[translationKeys] = h;
    }

    // console.log(keys);
    
    var json = JSON.stringify(keys);

    console.log(json);

    const buff = new Buffer(JSON.stringify(json));
    const base64data = buff.toString('base64');

    const objJsonForUpload = {
        data: {base64data},
        filename: "en.json",
        lang_iso: "en",
    }
})
()


