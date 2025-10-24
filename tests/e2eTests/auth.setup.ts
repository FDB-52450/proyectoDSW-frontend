import path from 'path'
import { test as setup, expect } from '@playwright/test'

const statePath = path.resolve(process.cwd(), 'state.json')

setup('boton del dashboard aparece despues de hacer login', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Ingresar')
    await page.fill('#usuario', 'subAdmin1')
    await page.fill('#password', 'subPass1')
    await page.click('text=Ingresar')

    await expect(page.locator('text=DASHBOARD')).toBeVisible({ timeout: 5000 })

    await page.context().storageState({ path: statePath })
});