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
    this.table = page.locator(this.dataTableLocator);
    this.tableHeaders = page.locator(this.tableHeadersLocator);
    this.paginationNumberButton = page.locator(this.paginationNumberButtonLocator)
    this.tableRows = page.locator(this.tableRowsLocator)
    this.filterDropdown = page.locator(this.filterDropdownLocator)
    this.nextPaginationButton = page.locator(this.nextPaginationButtonLocator)
  }

  getDropdownItems(option) {
    return this.page.locator(this.dropdownOptionsLocator, { hasText: option })
  }

  async getHeadersLabels() {
    return this.page.evaluate(() => {
      const table = document.getElementById('table2');
      const headerRow = table.querySelector('thead tr');
      const columns = Array.from(headerRow.children).map((th) => th.textContent.trim());
      return columns;
    });
  }

  async getTableElements() {
    return this.page.evaluate(() => {
      const table = document.getElementById('table2');
      const headerRow = table.querySelector('thead tr');
      const columns = Array.from(headerRow.children).map((th) => th.textContent.trim());
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      const rowData = rows.map((row) => {
        const values = Array.from(row.children).map((td) => td.textContent.trim());
        const rowObject = {};
        columns.forEach((column, index) => {
          rowObject[column] = values[index];
        });
        return rowObject;
      });
  
      return rowData;
    });
  }

  async clickFilterDropdown() {
      await this.filterDropdown.click();
  }

  async clickNextPaginationButton() {
      await this.nextPaginationButton.click();
  }
}