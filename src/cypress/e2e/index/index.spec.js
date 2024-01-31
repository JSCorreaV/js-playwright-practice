/* const { test, expect } = require('@playwright/test');
const { IndexPage }=require('../../pageObject/indexPage')

test.describe('',()=>{

    test.beforeEach(async ({ page }, testInfo) =>{
        console.log(`Running ${testInfo.title}`);
        await page.goto('/')
    })
    test('has title', async ({ page }) => {
        const indexPage = new IndexPage(page);
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });
})
 */