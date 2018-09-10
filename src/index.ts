import puppeteer, { Browser, ElementHandle } from 'puppeteer';
import csv from 'csvtojson';

(async () => {
    try {
        const browser: Browser = await puppeteer.launch({ headless: false, args: [`--window-size=${1800},${1200}`] });
        const url = 'http://www.dota2.com/league/0/list';
        const adminUrl = 'http://www.dota2.com/league/2642/admins';
        const testAdmin = 'https://steamcommunity.com/profiles/76561198040889152/';

        const page = await browser.newPage();
        await page.setViewport({ height: 1200, width: 1900 });
        await page.goto(url);
        await page.click('.HomeContentSignInBox a');

        await page.waitForSelector('.HomeWelcomeText', { timeout: 90000 });
        await page.goto(adminUrl);
        await page.waitForSelector('#addAdminForm');

        const steamUrls = await csv().fromFile('./get_captain_steam_info.csv');

        for (let i = 0; i < steamUrls.length; i++) {
            try {

                await page.goto(adminUrl);
                const adminProfileUrl = await page.$('#admin_profile_url');
                if (adminProfileUrl) {
                    await adminProfileUrl.click({ clickCount: 3 });
                    await adminProfileUrl.type(steamUrls[i].steamurl);
                    await page.click('.btn_darkblue_white_innerfade');
                    await page.waitForSelector('.newmodal_buttons .btn_grey_white_innerfade');
                    await page.click('.newmodal_buttons .btn_grey_white_innerfade');
                    await page.waitFor(750);
                }
            }
            catch (e) {
                console.log('some kind of error doing admin entering', e);
            }
        }

        process.exit();


    }
    catch (e) {
        console.log('error setting up script', e);
    }

})();

export async function getProperty(handle: ElementHandle, property: string) {
    if (handle) {
        return await (await handle.getProperty(property)).jsonValue();
    }
    else {
        return null;
    }
}

export async function setUpNewPage(browser: Browser) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'image')
            request.abort();
        else
            request.continue();
    });
    return Promise.resolve(page);
}