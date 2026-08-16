import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('/home/ashok/Projects/riddhi-sidhi-lab/test-screenshots');

test.describe('Automated Visual Screenshot Verification', () => {

  test.beforeAll(() => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
  });

  test('Capture Desktop Viewports (Home, Catalogue, Tracking, Doctors)', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('Desktop')) {
      await page.goto('http://127.0.0.1:5173');
      await page.waitForLoadState('networkidle');

      // 1. Desktop Home & Hero
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_desktop_home_hero.png'), fullPage: false });

      // 2. Desktop Catalogue
      await page.locator('#catalogue').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_desktop_catalogue.png'), fullPage: false });

      // 3. Desktop Tracker
      await page.locator('#tracker').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_desktop_report_tracker.png'), fullPage: false });

      // 4. Desktop Doctors
      await page.locator('#doctors').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_desktop_doctor_concierge.png'), fullPage: false });
    }
  });

  test('Capture Mobile Viewports (iPhone 13 / 390px)', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('Mobile')) {
      await page.goto('http://127.0.0.1:5173');
      await page.waitForLoadState('networkidle');

      // 1. Mobile Home View
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_mobile_home.png') });

      // 2. Open Symptom Modal on Mobile
      await page.locator('button:has-text("Describe Symptoms"), button:has-text("लक्षण अनुसार जांच चुनें")').first().click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_mobile_symptom_modal.png') });
      await page.locator('.modal-card button:has-text("Close"), .modal-card button:has-text("बंद करें")').click();

      // 3. Mobile Tracker
      await page.locator('#tracker').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_mobile_tracker_stepper.png') });
    }
  });
});
