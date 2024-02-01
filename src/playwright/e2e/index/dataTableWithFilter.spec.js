const { test, expect } = require('@playwright/test');
const { dataTableData } = require('../../fixtures/dataTableWithFilterData.json')
const { metricsTableFormats } = require('../../support/utils/formats')

const { IndexPage } = require('../../pageObject/indexPage')

test.describe('Data Table With Sorting and Filter Test',()=>{

    test.beforeEach(async ({page},testInfo) =>{
        console.log(`Running ${testInfo.title}`);
        await page.goto('http://127.0.0.1:5500/src/app/')
    }) 
    test('The user should be able to see All, 2024-01-01, 2024-01-02, 2024-01-03 options in filter when clicks.\
    The user should see, at most, 10 rows in table per pagination with cell values in the expected format.', async ({ page }) => {
        const indexPage = new IndexPage(page);

        const {
            filterBy: { options },
            columns,
        } = dataTableData;

        const expectedHeaders = columns.map(column => column.displayName);

        const minRowsPerPagination = 1;
        const maxRowsPerPagination = 10;
      
        await indexPage.clickFilterDropdown();

        options.forEach((option)=>{
            expect(indexPage.getDropdownItems(option)).toBeVisible();
        })

        await indexPage.clickFilterDropdown();

        const columnNames = await indexPage.getHeadersLabels();

        expect(columnNames).toMatchObject(expectedHeaders);
      
        const paginationButtonCount = await page.$$eval('#table2_paginate > span .paginate_button', elements => elements.length);

        for (let i = 0; i < paginationButtonCount; i++){
            const tableElements = await indexPage.getTableElements();
            const tableLenght = tableElements.length

            expect(tableLenght).toBeGreaterThanOrEqual(minRowsPerPagination);
            expect(tableLenght).toBeLessThanOrEqual(maxRowsPerPagination);

            for (const metric of columns) {
                const type = metric.type;
                const label = metric.displayName;
                
                for (let j = 0; j < tableLenght; j++){
                    const metricValue = tableElements[j][label];
                    switch (type) {
                        case 'decimal': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.DECIMAL
                            );
                            break;
                        }
                        case 'currency': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.CURRENCY
                            );
                            break;
                        }
                        case 'integer': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.INTEGER
                            );
                            break;
                        }
                        case 'decimalAndPercentage': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.DECIMAL_AND_PERCENTAGE
                            );
                            break;
                        }
                        case 'date': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.DATE
                            );
                            break;
                        }
                        case 'percentage': {
                            expect(metricValue).toMatch(
                                metricsTableFormats.PERCENTAGE
                            );
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            await indexPage.clickNextPaginationButton();
        }
    });
})
