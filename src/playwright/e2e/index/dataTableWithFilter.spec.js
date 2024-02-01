const { test, expect } = require('@playwright/test');
const { dataTableData } = require ('../../fixtures/dataTableWithFilterData.json')

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
    
      // Expect a title "to contain" a substring.
      /* await expect(page).toHaveTitle(/Cypress common challenges/); */
      
        await indexPage.clickFilterDropdown();

        options.forEach((option)=>
        {
            expect(indexPage.getDropdownItems(page,option)).toBeVisible()
        })

        await indexPage.clickFilterDropdown();

        const columnNames = await indexPage.getHeadersLabels()

        expect(columnNames).toMatchObject(expectedHeaders)
      
        const paginationButtonCount = await indexPage.paginationNumberButton.count()
        
        for (let i = 0; i < paginationButtonCount; i++){
            const tableElements = await getTableElements()
            const j=0
            for (const row of tableElements) {
                for (const [column, value] of Object.entries(row)) {
                    switch (column) {
                        case 'Column1':
                        expect(value).toMatch(columns[j]);
                        break;
                        case 'Column2':
                        expect(value).toMatch(/your-regex-for-Column2/);
                        break;
                        // Add cases for other columns
                
                        default:
                        // Handle unknown columns
                        throw new Error(`Unknown column: ${column}`);
                    }
                }
            }
            await indexPage.clickNextPaginationButton();
        }
        /* .forEach(() => {
            indexPage.getTableElements().then((tableElements) => {
                console.log(tableElements)
                columns.forEach((metric) => {
                    console.log(metric)
                    const type = metric.type;
                    const label = metric.displayName;
                    const metricColumn = tableElements[label];
                    console.log(metricColumn)
                    cy.wrap(metricColumn)
                        .should('have.length.at.most', maxRowsPerPagination)
                        .and('have.length.at.least', minRowsPerPagination);
                    cy.wrap(metricColumn).each((metricValue) => {
                        switch (type) {
                            case 'decimal': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DECIMAL
                                );
                                break;
                            }
                            case 'currency': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.CURRENCY
                                );
                                break;
                            }
                            case 'integer': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.INTEGER
                                );
                                break;
                            }
                            case 'decimalAndPercentage': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DECIMAL_AND_PERCENTAGE
                                );
                                break;
                            }
                            case 'date': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DATE
                                );
                                break;
                            }
                            case 'percentage': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.PERCENTAGE
                                );
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    });
                });
            });
            indexPage.clickNextPaginationButton();
        }); */
    });
})
