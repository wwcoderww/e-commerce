import { defineConfig, devices } from '@playwright/test';

const isDocker = !!process.env.CI || !!process.env.DOCKER;

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/.next/**', '**/node_modules/**'],
  fullyParallel: true,
  forbidOnly: isDocker,
  retries: isDocker ? 2 : 0,
  workers: isDocker ? 1 : undefined,

  reporter: [
    [
      'html',
      {
        host: '0.0.0.0',
        port: 9323,
        open: isDocker ? 'never' : 'always',
      },
    ],
  ],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: isDocker
      ? 'HOSTNAME=127.0.0.1 NODE_NO_WARNINGS=1 node .next/standalone/frontend/server.js'
      : 'NODE_NO_WARNINGS=1 npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !isDocker,
    timeout: 60 * 1000,
    env: {
      NEXT_PUBLIC_BACKEND_URL:
        process.env.NEXT_PUBLIC_BACKEND_URL || 'https://store.ezwezz.com',
    },
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
