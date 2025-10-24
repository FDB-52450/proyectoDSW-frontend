import { test, expect } from '@playwright/test';

test('categoria aparece en el listado luego de ser creada', async ({ page }) => {
    const categoriaNombre = 'TEST CATEGORIA' + Date.now()

    await page.goto('/dashboard/categorias/new')
    await page.fill('#nombre', categoriaNombre)
    await page.fill('#garantia', '12')
    await page.fill('#stockLim', '5')
    await page.click('#crearButton')

    await page.waitForTimeout(2000)
    await page.goto('/dashboard/categorias')

    await expect(page.locator(`text=${categoriaNombre}`)).toBeVisible()
});