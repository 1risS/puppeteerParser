import puppeteer from "puppeteer";
import api from 'api';

const sdk = api('@lokalise-devhub/v1.0#4jrla2jld4mbb1b');

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

    const buff = Buffer.from(json);
    const base64data = buff.toString('base64');

    const objJsonForUpload = {
        data: base64data,
        filename: "en.json",
        lang_iso: "en",
    }

    console.log(objJsonForUpload);

    sdk.auth('f18e176392ec254590ba86bf84888c55d334faa0');
    sdk.uploadAFile(objJsonForUpload, {project_id: '1506245863dd675f528a85.86927298'})
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));
})
()


