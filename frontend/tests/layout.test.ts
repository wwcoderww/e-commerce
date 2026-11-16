import test, { expect } from '@playwright/test';

test.describe('Test / and Banner', () => {
  test('Should have correct metadata/title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('E-Commerce');
  });

  test('Banner link to /products works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/products');
  });
});
