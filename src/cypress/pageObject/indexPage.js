const {parseElementsListToTextsList} = require('../support/utils/helpers')

exports.IndexPage = class IndexPage {

  filterDropdownLocator = '#filterDropdown';
  dropdownOptionsLocator = '.dropdown-menu.show .dropdown-item';

  dataTableLocator = '#table2';
  tableHeadersLocator = `${this.dataTableLocator} .-header`;
  tableRowsLocator = `${this.dataTableLocator} tbody tr`;

  nextPaginationButtonLocator = `${this.dataTableLocator}_next`;
  paginationNumberButtonLocator = `${this.dataTableLocator}_paginate > span .paginate_button`;

  constructor(page) {
    this.page = page;
    this.tableHeaders = page.locator(this.tableHeadersLocator);
    this.paginationNumberButton = page.locator(this.paginationNumberButtonLocator)
    this.tableRows = page.locator(this.tableRowsLocator)
    this.filterDropdown = page.locator(this.filterDropdownLocator)
    this.nextPaginationButton = page.locator(this.nextPaginationButtonLocator)
  }

  getDropdownItems(page,option) {
    return page.locator(this.dropdownOptionsLocator, { hasText: option })
  }

  async getHeaders() {
    const headersCount = await this.tableHeaders.count()
    let headersLabel = []

    for (let i = 0; i < headersCount; ++i){
      headersLabel[i] = await this.tableHeaders.nth(i).textContent
    }
    
    return headersLabel;
  }

  async getTableElements() {
      const tableElements = {};
      console.log(await this.getHeaders())
      return this.getHeaders()/* .then((headers) => {
          return this.tableRows.then((rows) => {
              headers.forEach((headerName, index) => {
                  tableElements[headerName] = [];
                  console.log(tableElements[headerName])
                  Array.from(rows).forEach((row) => {
                      const element = row.children[index].innerHTML;
                      tableElements[headerName].push(element);
                  });
              });
              return tableElements;
          });
      }); */
  }

  async clickFilterDropdown() {
      await this.filterDropdown.click();
  }

  async clickNextPaginationButton() {
      await this.nextPaginationButton.click();
  }
}