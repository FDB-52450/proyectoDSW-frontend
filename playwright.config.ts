import dotenv from 'dotenv'
import path from 'path'

import { defineConfig, devices } from '@playwright/test'

dotenv.config({ path: '.env' })

export default defineConfig({
    testDir: './tests/e2eTests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.VITE_FRONTEND_URL,
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run dev',
        port: Number(process.env.PORT),
        reuseExistingServer: true,
    },
    projects: [
        { name: 'setup', testMatch: 'auth.setup.ts' },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], storageState: path.resolve(process.cwd(), 'state.json')},
            dependencies: ['setup'],
            testMatch: '**/*.test.ts'
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'], storageState: path.resolve(process.cwd(), 'state.json')},
            dependencies: ['setup'],
            testMatch: '**/*.test.ts'
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'], storageState: path.resolve(process.cwd(), 'state.json')},
            dependencies: ['setup'],
            testMatch: '**/*.test.ts'
        }
    ],
});
