import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://127.0.0.1:5173');
  await page.getByRole('heading', { level: 2, name: 'المكونات الأساسية' }).waitFor();
  const reports = [];
  for (const theme of ['dark', 'light']) {
    const result = await page.evaluate(() => {
      const text = document.querySelector('.example-meta p');
      const card = text.closest('.example-card');
      const input = document.querySelector('#component-search');
      const pairs = [
        { label: 'secondary text', color: getComputedStyle(text).color, background: getComputedStyle(card).backgroundColor },
        { label: 'placeholder', color: getComputedStyle(input, '::placeholder').color, background: getComputedStyle(input).backgroundColor },
      ];
      const luminance = (color) => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((value) => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
      };
      return pairs.map((pair) => {
        const a = luminance(pair.color), b = luminance(pair.background);
        return { ...pair, ratio: Number(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2)) };
      });
    });
    reports.push({ theme, pairs: result });
    if (theme === 'dark') await page.getByRole('button', { name: 'تبديل المظهر' }).click();
  }
  await fs.writeFile(new URL('../artifacts/contrast.json', import.meta.url), JSON.stringify(reports, null, 2)+'\n');
  if (reports.some((r) => r.pairs.some((p) => p.ratio < 4.5))) throw new Error('Contrast fell below 4.5:1: '+JSON.stringify(reports));
  console.log(JSON.stringify(reports, null, 2));
  await page.mouse.move(700, 600);
  await page.screenshot({ path: 'artifacts/catalog-desktop-light.png', animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.screenshot({ path: 'artifacts/catalog-mobile-light.png', animations: 'disabled' });
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.getByRole('button', { name: 'المكونات المتقدمة' }).click();
  await page.getByRole('textbox', { name: 'محرر وصف المشروع' }).waitFor();
  await page.getByRole('heading', { name: 'المكونات المتقدمة', exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/catalog-advanced-light.png', animations: 'disabled' });
} finally { await browser.close(); }
