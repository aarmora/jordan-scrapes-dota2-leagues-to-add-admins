import puppeteer, { Browser, ElementHandle } from 'puppeteer';

(async () => {
    const headless = process.argv[2] === 'noHead' ? true : false;
    try {
        const browser: Browser = await puppeteer.launch({ headless: headless, args: [`--window-size=${1800},${1200}`] });
        const url = 'http://www.dota2.com/league/0/list';
        const adminUrl = 'http://www.dota2.com/league/10260/admins';
        const testAdmin = 'https://steamcommunity.com/profiles/76561198040889152/';

        const page = await browser.newPage();
        await page.setViewport({ height: 1200, width: 1900 });
        await page.goto(url);
        await page.click('.HomeContentSignInBox a');
        
        await page.waitForSelector('.HomeWelcomeText', {timeout: 90000});
        await page.goto(adminUrl);
        await page.waitForSelector('#addAdminForm');

        await page.type('#admin_profile_url', testAdmin);
        await page.click('.btn_darkblue_white_innerfade');
    
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