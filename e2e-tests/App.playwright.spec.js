/* eslint-disable no-undef */
const { test, describe, expect } = require('@playwright/test')

describe('Simple e2e tests', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('Simple webshop')).toBeVisible()
  })

})