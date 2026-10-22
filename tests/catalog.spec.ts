import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('all 70 upstream examples render without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'جميع المكونات' }).click();
  await expect(page.locator('article[data-example]')).toHaveCount(70);
  await expect(page.getByLabel('تحميل المثال')).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'محرر وصف المشروع' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('Arabic search, category changes, empty state, and actual example source', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'بحث المكونات' }).fill('أزرار');
  await expect(page.locator('article[data-example]')).toHaveCount(2);
  await page.getByRole('textbox', { name: 'بحث المكونات' }).fill('zzzz-no-result');
  await expect(page.getByText('لا توجد مكونات مطابقة')).toBeVisible();
  await page.getByRole('button', { name: 'عرض جميع المكونات' }).click();
  await page.getByRole('textbox', { name: 'بحث المكونات' }).fill('number-flow');
  await expect(page.locator('article[data-example]')).toHaveCount(1);
  await page.getByRole('button', { name: 'شيفرة الأرقام المتحركة' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText("import { NumberFlow } from '@atlas/ui/numbers'");
  await expect(dialog.getByRole('button', { name: 'نسخ المثال كاملًا' })).toBeVisible();
});

test('dialog focus is trapped and restored with keyboard, and menus open in RTL', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'الحوارات والقوائم' }).click();
  await page.getByRole('button', { name: 'فتح الحوار', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
    expect(await page.getByRole('dialog').evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'فتح الحوار', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'إجراءات المشروع' }).click();
  await expect(page.getByRole('menu')).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'نسخ المرجع' })).toBeVisible();
});

test('form validation, selection, notifications and Arabic date integration', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'النماذج والإدخال' }).click();
  await page.getByRole('button', { name: 'التحقق من البيانات' }).click();
  await expect(page.getByText('أدخل بريدًا إلكترونيًا صالحًا')).toBeVisible();
  await page.getByRole('textbox', { name: 'البريد الإلكتروني', exact: true }).fill('atlas@example.com');
  await page.getByRole('button', { name: 'التحقق من البيانات' }).click();
  await expect(page.getByText('تم التحقق', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'القسم', exact: true }).fill('تط');
  await page.getByRole('option', { name: 'التطوير' }).click();
  await expect(page.getByRole('combobox', { name: 'القسم', exact: true })).toHaveValue('التطوير');
  await page.getByRole('button', { name: 'التاريخ والوقت' }).click();
  await page.getByLabel('تاريخ البدء', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'الشهر التالي' }).first()).toBeVisible();
});

test('data table pagination and sort integrate with upstream components', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'عرض البيانات', exact: false }).click();
  const table = page.locator('[data-example="data-table"]');
  await expect(table.getByText('أطلس', { exact: true })).toBeVisible();
  await table.getByRole('button', { name: 'التالية', exact: true }).click();
  await expect(table.getByText('مرصد', { exact: true })).toBeVisible();
  await table.getByRole('button', { name: /المشروع/ }).click();
  await expect(table.getByText('مرصد', { exact: true })).toBeVisible();
  await expect(table.getByText('1–3 من 5')).toBeVisible();
});

test('large list renders a bounded number of rows, and editor is editable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'المكونات المتقدمة' }).click();
  const list = page.locator('[data-example="virtual-list"]');
  await list.scrollIntoViewIfNeeded();
  await expect(list.getByText('سجل المشروع رقم ١', { exact: true })).toBeVisible();
  expect(await list.getByText(/سجل المشروع رقم/).count()).toBeLessThan(100);
  const editor = page.getByRole('textbox', { name: 'محرر وصف المشروع' });
  await editor.fill('نص تجريبي للمكتبة');
  await expect(editor).toHaveText('نص تجريبي للمكتبة');
});

test('all examples pass the automated WCAG A/AA scan in both themes', async ({ page }, testInfo) => {
  test.setTimeout(120000);
  await page.goto('/');
  await page.getByRole('button', { name: 'جميع المكونات' }).click();
  await expect(page.getByLabel('تحميل المثال')).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'محرر وصف المشروع' })).toBeVisible();
  const scans = [];
  for (const theme of ['dark', 'light']) {
    await expect(page.locator('html')).toHaveAttribute('data-mantine-color-scheme', theme);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    scans.push({ theme, violations: result.violations });
    await page.getByRole('button', { name: 'تبديل المظهر' }).click();
  }
  await testInfo.attach('axe-scans', { body: JSON.stringify(scans, null, 2), contentType: 'application/json' });
  expect(scans.flatMap((scan) => scan.violations.map((v) => ({ theme: scan.theme, id: v.id, nodes: v.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })))).toEqual([]);
});

test('responsive layouts and both directions have no page overflow', async ({ page }) => {
  await page.goto('/');
  for (const width of [1440, 820, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const direction of ['rtl', 'ltr']) {
      await expect(page.locator('html')).toHaveAttribute('dir', direction);
      await page.evaluate(async () => {
        await Promise.all(document.getAnimations()
          .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
          .map((animation) => animation.finished.catch(() => undefined)));
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: `artifacts/catalog-${width}-${direction}.png`, fullPage: false, animations: 'disabled' });
      await page.getByRole('button', { name: 'تبديل اتجاه الواجهة' }).click();
    }
  }
  await page.getByRole('button', { name: 'فتح قائمة الأقسام' }).click();
  await page.getByRole('button', { name: 'النماذج والإدخال' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'النماذج والإدخال' })).toBeVisible();
});
