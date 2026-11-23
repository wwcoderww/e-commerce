import { randomUUID } from 'node:crypto';
import { unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { request, type APIRequestContext } from '@playwright/test';

export type AdminTestFixtures = {
  adminId: string;
  productId: string;
  productName: string;
  storageState: Awaited<ReturnType<APIRequestContext['storageState']>>;
};

const fixturesPath = resolve(process.cwd(), '.playwright-admin-fixtures.json');
const frontendOrigin = 'http://localhost:3000';

export default async function globalSetup() {
  const backendUrl = (
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'
  ).replace(/\/$/, '');
  const productName = `E2E Product ${randomUUID()}`;
  const adminEmail = `playwright-admin-${randomUUID()}@example.com`;
  const adminPassword = `Test-${randomUUID()}-Password`;

  let bootstrapApi: APIRequestContext | undefined;
  let adminApi: APIRequestContext | undefined;
  let adminId: string | undefined;
  let productId: string | undefined;
  let fixtureFileCreated = false;

  const cleanup = async () => {
    const cleanupErrors: Error[] = [];

    if (adminApi && productId) {
      try {
        const productsResponse = await adminApi.get('/products');
        if (!productsResponse.ok()) {
          throw new Error(
            `Product lookup failed (${productsResponse.status()}): ${await productsResponse.text()}`,
          );
        }

        const products = (await productsResponse.json()) as { id: string }[];
        if (products.some((product) => product.id === productId)) {
          const deleteResponse = await adminApi.delete(
            `/products/${productId}`,
          );
          if (!deleteResponse.ok()) {
            throw new Error(
              `Test product deletion failed (${deleteResponse.status()}): ${await deleteResponse.text()}`,
            );
          }
        }
      } catch (error) {
        cleanupErrors.push(
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }

    if (bootstrapApi && adminId) {
      try {
        const removeAdminResponse = await bootstrapApi.post(
          '/auth/admin/remove-user',
          {
            data: { userId: adminId },
          },
        );
        if (!removeAdminResponse.ok()) {
          throw new Error(
            `Test admin deletion failed (${removeAdminResponse.status()}): ${await removeAdminResponse.text()}`,
          );
        }
      } catch (error) {
        cleanupErrors.push(
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }

    await Promise.all(
      [adminApi, bootstrapApi].map((context) => context?.dispose()),
    );

    if (fixtureFileCreated) {
      try {
        await unlink(fixturesPath);
      } catch (error) {
        cleanupErrors.push(
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    }

    if (cleanupErrors.length) {
      console.error('Cleanup error details:', cleanupErrors);
      throw new AggregateError(cleanupErrors, 'Test fixture cleanup failed');
    }
  };

  try {
    bootstrapApi = await request.newContext({
      baseURL: backendUrl,
      extraHTTPHeaders: { Origin: frontendOrigin },
    });

    const bootstrapSignIn = await bootstrapApi.post('/auth/sign-in/email', {
      data: {
        email: process.env.PLAYWRIGHT_BOOTSTRAP_ADMIN_EMAIL || 'a@a.com',
        password:
          process.env.PLAYWRIGHT_BOOTSTRAP_ADMIN_PASSWORD || 'aaaaaaaaa',
      },
    });
    if (!bootstrapSignIn.ok()) {
      throw new Error(
        `Bootstrap admin sign-in failed (${bootstrapSignIn.status()}): ${await bootstrapSignIn.text()}`,
      );
    }
    const createAdminResponse = await bootstrapApi.post(
      '/auth/admin/create-user',
      {
        data: {
          name: 'Playwright Test Admin',
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        },
      },
    );
    if (!createAdminResponse.ok()) {
      throw new Error(
        `Test admin creation failed (${createAdminResponse.status()}): ${await createAdminResponse.text()}`,
      );
    }

    const createdAdmin = (await createAdminResponse.json()) as {
      user: { id: string };
    };
    adminId = createdAdmin.user.id;

    adminApi = await request.newContext({
      baseURL: backendUrl,
      extraHTTPHeaders: { Origin: frontendOrigin },
    });
    const adminSignIn = await adminApi.post('/auth/sign-in/email', {
      data: { email: adminEmail, password: adminPassword },
    });
    if (!adminSignIn.ok()) {
      throw new Error(
        `Test admin sign-in failed (${adminSignIn.status()}): ${await adminSignIn.text()}`,
      );
    }

    const productResponse = await adminApi.post('/products', {
      data: { name: productName, price: 1 },
    });
    if (!productResponse.ok()) {
      throw new Error(
        `Test product creation failed (${productResponse.status()}): ${await productResponse.text()}`,
      );
    }

    const createdProduct = (await productResponse.json()) as {
      data: { id: string }[];
    };
    productId = createdProduct.data[0]?.id;
    if (!productId) {
      throw new Error('Test product creation did not return an ID');
    }

    const fixtures: AdminTestFixtures = {
      adminId,
      productId,
      productName,
      storageState: await adminApi.storageState(),
    };
    await writeFile(fixturesPath, JSON.stringify(fixtures), { mode: 0o600 });
    fixtureFileCreated = true;
  } catch (error) {
    try {
      await cleanup();
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        'Test setup and cleanup both failed',
      );
    }
    throw error;
  }

  return cleanup;
}
