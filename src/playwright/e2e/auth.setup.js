
const { setup, expect } = require('@playwright/test');
const { request } = require('http');
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.

  console.log(require('child_process').execSync('curl -4 icanhazip.com'))

  console.log(authFile.username, authFile.password);

  const data = {
    body: {
        grant_type: 'password',
        username: authFile.username,
        password: authFile.password,
    },
  };

  await request.post(Cypress.env('AUTH_API'),{
    data:data
  })

});