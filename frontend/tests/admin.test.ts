import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { AdminTestFixtures } from './globalSetup';

const fixturesPath = resolve(process.cwd(), '.playwright-admin-fixtures.json');
let productName: string;
let updatedProductName: string;

async function readFixtures(): Promise<AdminTestFixtures> {
  return JSON.parse(await readFile(fixturesPath, 'utf8')) as AdminTestFixtures;
}

test.describe('Admin Panel + Actions', () => {
  test.beforeAll(async () => {
    const fixtures = await readFixtures();
    productName = fixtures.productName;
    updatedProductName = `${productName} Updated`;
  });

  test.use({
    storageState: async ({}, use) => {
      const fixtures = await readFixtures();
      await use(fixtures.storageState);
    },
  });

  test.describe.serial('POST/PUT/DELETE', () => {
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
