import test, { expect } from '@playwright/test';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.getByLabel('product-card').first().click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Add to Cart' }).click();
  });
  test('Should load products', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.getByLabel('product-card').first()).toBeVisible();
  });
  test('Should contain table and total', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.getByLabel('product-item-table').first()).toBeVisible();
    await expect(page.getByLabel('checkout-total')).toHaveText(
      /^Cart Total: \$/,
    );
  });
  test('Payment works', async ({ page }) => {
    await page.goto('/checkout');
    await page.locator('input[name="cardNumber"]').fill('1234567890123456');
    await page.locator('input[name="cvv"]').fill('123');
    await page.locator('input[name="firstName"]').fill('Abcdef');
    await page.locator('input[name="lastName"]').fill('Ghijkl');
    await page.locator('input[name="email"]').fill('aaaaa@aaaaa.com');
    await page.locator('input[name="address"]').fill('12345 abcdefghi st.');
    await page.locator('input[name="zip"]').fill('12345');
    await page.locator('input[name="city"]').fill('Abcdefg');
    await page.getByRole('button', { name: 'Purchase' }).click();
    await expect(page).toHaveURL(/\/history(?:\?.*)?$/);
  });
});
