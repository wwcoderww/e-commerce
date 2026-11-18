import test, { expect } from '@playwright/test';

test.describe('Products + Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });
  test('Should load products', async ({ page }) => {
    await expect(page.getByLabel('product-card').first()).toBeVisible();
  });
  test('Should display overlay when product clicked', async ({ page }) => {
    await page.getByLabel('product-card').first().click();
    await expect(
      page.getByRole('button', { name: 'Add to Cart' }),
    ).toBeVisible();
  });
  test('Cart buttons should work', async ({ page }) => {
    await page.getByLabel('product-card').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.getByLabel('quantity')).toHaveText('1');
    await page.getByLabel('add-one').click();
    await expect(page.getByLabel('quantity')).toHaveText('2');
    await page.getByLabel('del-one').click();
    await expect(page.getByLabel('quantity')).toHaveText('1');
    await page.getByLabel('delete').click();
    await expect(page.getByLabel('quantity')).not.toBeVisible();
  });
});
