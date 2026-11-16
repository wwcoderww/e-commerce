import { test, expect } from '@playwright/test';

let authenticatedState: Awaited<
  ReturnType<import('@playwright/test').BrowserContext['storageState']>
>;

test.describe('Main', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: 'http://localhost:3000',
    });
    const page = await context.newPage();

    page.on('pageerror', (error) => console.error('Page error:', error));
    page.on('console', (message) => {
      if (message.type() === 'error')
        console.error('Console error:', message.text());
    });

    await page.goto('/auth');

    await page.getByLabel('email').fill('a@a.com');
    await page.getByLabel('password').fill('aaaaaaaaa');
    const loginButton = page.getByRole('button', {
      name: 'Login',
      exact: true,
    });

    await expect(page).toHaveURL(/\/auth(?:\?|$)/);
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveURL('/');

    authenticatedState = await context.storageState();
    await context.close();
  });

  test.use({
    storageState: async ({}, use) => {
      await use(authenticatedState);
    },
  });

  test.describe.serial('Admin Panel + Actions', () => {
    test('POST Product', async ({ page }) => {
      await page.goto('/admin');
      await page.getByLabel('admin-create').click();
      await page.getByLabel('name').fill('ATestATestATest');
      await page.getByLabel('price').fill('1');
      await page.getByRole('button', { name: 'Submit' }).click();

      await page.getByLabel('admin-edit').click();
      await expect(page.getByText('ATestATestATest')).toBeVisible();
    });
    test('PUT Product', async ({ page }) => {
      await page.goto('/admin');
      await page.getByLabel('admin-edit').click();
      await page.getByText('ATestATestATest').click();
      await page.getByLabel('name').fill('ATestATest');
      await page.getByRole('button', { name: 'Submit' }).click();

      await page.getByLabel('admin-edit').click();
      await expect(page.getByText('ATestATest')).toBeVisible();
    });
    test('DELETE Product', async ({ page }) => {
      await page.goto('/admin');
      await page.getByLabel('admin-edit').click();
      await page.getByText('ATestATest').click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.getByLabel('admin-edit').click();
      await expect(page.getByText('ATestATestATest')).not.toBeVisible();
      await expect(page.getByText('ATestATest')).not.toBeVisible();
    });
  });
});
