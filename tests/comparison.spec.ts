import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const settings = 'theme=light&direction=rtl&font=free-palestine';
const preview = (provider: string, task: string) => `/compare/${provider}.html?task=${task}&${settings}`;

for (const provider of ['hero', 'mantine']) {
  test(`${provider}: same Arabic form validates and saves`, async ({ page }) => {
    await page.goto(preview(provider, 'form'));
    await page.getByRole('button', { name: 'حفظ المشروع' }).click();
    await expect(page.getByText('أدخل اسمًا من حرفين على الأقل')).toBeVisible();
    await expect(page.getByText('أدخل بريدًا إلكترونيًا صالحًا')).toBeVisible();
    await page.getByRole('textbox', { name: 'اسم المشروع' }).fill('أطلس');
    await page.getByRole('textbox', { name: 'البريد الإلكتروني' }).fill('atlas@example.com');
    if (provider === 'hero') await page.getByRole('button', { name: /القسم/ }).click();
    else await page.getByRole('combobox', { name: 'القسم' }).click();
    await page.getByRole('option', { name: 'التصميم', exact: true }).click();
    await page.getByRole('button', { name: 'حفظ المشروع' }).click();
    await expect(page.getByRole('status')).toHaveText('تم التحقق من بيانات المشروع بنجاح');
  });

  test(`${provider}: dialog traps focus and restores it`, async ({ page }) => {
    await page.goto(preview(provider, 'dialog'));
    await page.getByRole('button', { name: 'فتح الحوار' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      expect(await page.getByRole('dialog').evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'فتح الحوار' })).toBeFocused();
    await page.getByRole('button', { name: 'فتح الحوار' }).click();
    await page.getByRole('button', { name: 'تأكيد المشروع' }).click();
    await expect(page.getByRole('status')).toHaveText('تم تأكيد المشروع');
  });

  test(`${provider}: table sort and pagination show the same records`, async ({ page }) => {
    await page.goto(preview(provider, 'table'));
    await expect(page.locator('tbody tr').first()).toContainText('أطلس');
    await page.getByRole('button', { name: 'التالية', exact: true }).click();
    await expect(page.locator('tbody')).toContainText('مرصد');
    await page.locator('thead').getByText('المشروع', { exact: true }).click();
    await expect(page.locator('tbody tr').first()).toContainText('مرصد');
    await expect(page.getByText('1–3 من 5')).toBeVisible();
  });

  test(`${provider}: date picker opens and preserves Gregorian storage`, async ({ page }) => {
    await page.goto(preview(provider, 'date'));
    if (provider === 'hero') await page.getByRole('button', { name: 'فتح التقويم' }).click();
    else await page.getByLabel('تاريخ البدء', { exact: true }).click();
    await expect(page.getByRole('button', { name: 'الشهر التالي', exact: true })).toBeVisible();
    await expect(page.getByTestId('stored-date')).toHaveText('2026-10-22');
    await page.getByRole('button', { name: provider === 'hero' ? 'الجمعة، ٢٣ أكتوبر ٢٠٢٦' : '23 أكتوبر 2026', exact: true }).click();
    await expect(page.getByTestId('stored-date')).toHaveText('2026-10-23');
  });
}

test('HeroUI displays Umm al-Qura while keeping storage consistent', async ({ page }) => {
  await page.goto(`${preview('hero', 'date')}&calendar=islamic-umalqura`);
  await page.getByRole('button', { name: 'فتح التقويم' }).click();
  const gregorianYear = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', { year: 'numeric' }).format(new Date('2026-10-22T12:00:00Z'));
  const content = await page.locator('body').textContent();
  expect(content).not.toContain(gregorianYear);
  await expect(page.getByTestId('stored-date')).toHaveText('2026-10-22');
  await expect(page.locator('[role="grid"]')).toBeVisible();
  await page.getByRole('button', { name: 'الجمعة، ١٢ جمادى الأولى ١٤٤٨ هـ', exact: true }).click();
  await expect(page.getByTestId('stored-date')).toHaveText('2026-10-23');
});

test('comparison controls update both isolated previews and remain responsive', async ({ page }) => {
  await page.goto('/compare/');
  await expect(page.locator('iframe')).toHaveCount(2);
  for (const name of ['hero', 'mantine']) await expect(page.frameLocator(`iframe[name="${name}"]`).getByRole('heading', { name: 'مشروع جديد' })).toBeVisible();
  await page.getByText('الجدول', { exact: true }).click();
  for (const name of ['hero', 'mantine']) await expect(page.frameLocator(`iframe[name="${name}"]`).getByRole('heading', { name: 'مشروعات الفريق' })).toBeVisible();
  await page.getByRole('button', { name: 'تبديل اتجاه المقارنة' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  for (const width of [1440, 820, 390]) {
    await page.setViewportSize({ width, height: 1100 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `artifacts/comparison-table-${width}.png`, animations: 'disabled', fullPage: false });
  }
});

test('heading font supports local Free Palestine or Noto fallback and persists the choice', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-atlas-font', 'free-palestine');
  const fonts = await page.evaluate(async () => {
    const localFaces = await document.fonts.load('16px "Atlas Free Palestine"', 'فلسطين').catch(() => []);
    const fallbackFaces = await document.fonts.load('16px "Noto Sans Arabic Variable"', 'فلسطين');
    return { localLoaded: localFaces.some((face) => face.status === 'loaded'), fallbackLoaded: fallbackFaces.some((face) => face.status === 'loaded') };
  });
  expect(fonts.fallbackLoaded).toBe(true);
  await testInfo.attach('font-availability', { body: JSON.stringify(fonts), contentType: 'application/json' });
  expect(await page.locator('body').evaluate((element) => getComputedStyle(element).fontFamily)).toContain('Noto Sans Arabic');
  expect(await page.locator('h1').first().evaluate((element) => getComputedStyle(element).fontFamily)).toContain('Atlas Free Palestine');
  await page.getByRole('button', { name: 'اختيار الخط' }).click();
  await page.getByRole('menuitem', { name: 'Noto Sans Arabic' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-atlas-font', 'noto');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-atlas-font', 'noto');
});

test('comparison fixtures have no automated WCAG A/AA violations', async ({ page }, testInfo) => {
  test.setTimeout(240000);
  const scans = [];
  for (const theme of ['light', 'dark']) for (const provider of ['hero', 'mantine']) {
    for (const task of ['form', 'dialog', 'table', 'date']) {
      await page.goto(preview(provider, task).replace('theme=light', `theme=${theme}`));
      if (task === 'dialog') {
        await page.getByRole('button', { name: 'فتح الحوار' }).click();
        await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined))));
      }
      if (task === 'date') {
        if (provider === 'hero') await page.getByRole('button', { name: 'فتح التقويم' }).click();
        else await page.getByLabel('تاريخ البدء', { exact: true }).click();
        await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined))));
      }
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      scans.push({ provider, task, theme, violations: result.violations });
    }
  }
  await testInfo.attach('comparison-axe', { body: JSON.stringify(scans, null, 2), contentType: 'application/json' });
  expect(scans.flatMap((scan) => scan.violations.map((v) => ({ provider: scan.provider, task: scan.task, theme: scan.theme, id: v.id, nodes: v.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })))).toEqual([]);
});

test('both libraries support the compared flows with touch at 390px', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 900 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    for (const provider of ['hero', 'mantine']) {
      await page.goto(preview(provider, 'form'));
      const trigger = provider === 'hero' ? page.getByRole('button', { name: /القسم/ }) : page.getByRole('combobox', { name: 'القسم' });
      await trigger.tap();
      const listbox = page.getByRole('listbox');
      await expect(listbox).toBeVisible();
      const bounds = await listbox.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(391);
      await page.getByRole('option', { name: 'التصميم', exact: true }).tap();
      await page.goto(preview(provider, 'dialog'));
      await page.getByRole('button', { name: 'فتح الحوار' }).tap();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('button', { name: 'إلغاء', exact: true }).tap();
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await page.goto(preview(provider, 'table'));
      await page.getByRole('button', { name: 'التالية', exact: true }).tap();
      await expect(page.locator('tbody')).toContainText('مرصد');
      await page.goto(preview(provider, 'date'));
      if (provider === 'hero') await page.getByRole('button', { name: 'فتح التقويم' }).tap();
      else await page.getByLabel('تاريخ البدء', { exact: true }).tap();
      await expect(page.getByRole('button', { name: 'الشهر التالي', exact: true })).toBeVisible();
      if (provider === 'hero') {
        expect(await page.locator('[data-slot="date-picker-popover"]').evaluate((popover) => {
          const bounds = popover.getBoundingClientRect();
          return [...popover.querySelectorAll('[data-slot="calendar-cell"]')].every((cell) => {
            const rectangle = cell.getBoundingClientRect();
            return rectangle.left >= bounds.left && rectangle.right <= bounds.right;
          });
        })).toBe(true);
      }
      await page.screenshot({ path: `artifacts/${provider}-calendar-mobile.png`, animations: 'disabled' });
      await page.getByRole('button', { name: provider === 'hero' ? 'الجمعة، ٢٣ أكتوبر ٢٠٢٦' : '23 أكتوبر 2026', exact: true }).tap();
      await expect(page.getByTestId('stored-date')).toHaveText('2026-10-23');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
