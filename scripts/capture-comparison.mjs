import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  for (const theme of ['light', 'dark']) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(`http://127.0.0.1:5173/compare/?theme=${theme}`);
      for (const provider of ['hero', 'mantine']) {
        await page.frameLocator(`iframe[name="${provider}"]`).getByRole('heading', { name: 'مشروع جديد' }).waitFor();
      }
      await page.evaluate(() => document.fonts.ready);
      for (const frame of page.frames().slice(1)) await frame.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `artifacts/comparison-form-${theme}-${width}.png`, fullPage: true, animations: 'disabled' });
    }
  }
  await page.setViewportSize({ width: 650, height: 900 });
  for (const provider of ['hero', 'mantine']) {
    await page.goto(`http://127.0.0.1:5173/compare/${provider}.html?task=date&theme=light&calendar=islamic-umalqura`);
    if (provider === 'hero') await page.getByRole('button', { name: 'فتح التقويم' }).click();
    else await page.getByLabel('تاريخ البدء', { exact: true }).click();
    await page.getByRole('button', { name: 'الشهر التالي', exact: true }).waitFor();
    await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined))));
    await page.screenshot({ path: `artifacts/${provider}-calendar-comparison.png`, animations: 'disabled' });
  }
} finally {
  await browser.close();
}
