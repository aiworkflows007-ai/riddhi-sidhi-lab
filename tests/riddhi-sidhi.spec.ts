import { test, expect } from '@playwright/test';

test.describe('Riddhi Sidhi Janch Lab - End-to-End System Tests', () => {

  test('Flow A: Symptom Matching & Home Collection Booking', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');

    // 1. Verify Branding & Hero
    await expect(page.locator('text=Riddhi Sidhi Janch Lab').first()).toBeVisible();

    // 2. Open Symptom Matcher
    const symptomBtn = page.locator('button:has-text("Describe Symptoms"), button:has-text("लक्षण अनुसार जांच चुनें")').first();
    await symptomBtn.click();

    // 3. Select Fever chip inside modal
    await expect(page.locator('text=Symptom-Based Test Matcher').or(page.locator('text=लक्षण अनुसार जांच सुझाव'))).toBeVisible();
    await page.locator('.modal-card .chip-btn').first().click();

    // 4. Add recommended tests to cart & proceed
    await page.locator('.modal-card button:has-text("Add to Cart & Proceed"), .modal-card button:has-text("कार्ट में जोड़ें और आगे बढ़ें")').click();

    // 5. Verify Booking Modal opens with Cart
    await expect(page.locator('.modal-card').first()).toBeVisible();
    await page.locator('.modal-card button:has-text("Proceed to Details"), .modal-card button:has-text("आगे बढ़ें")').click();

    // 6. Fill Patient & Address Details
    await page.fill('input[placeholder*="Ramesh Kumar"]', 'Anand Mohan Jha');
    await page.fill('input[placeholder*="10-digit mobile"]', '9835012345');
    await page.fill('input[placeholder*="House #14"]', 'House 42, Shivganj Chowk, Ara');

    // 7. Proceed to Payment
    await page.locator('.modal-card button:has-text("Proceed to Payment"), .modal-card button:has-text("भुगतान विकल्प चुनें")').click();

    // 8. Confirm Booking
    await page.locator('.modal-card button:has-text("Confirm & Generate Booking"), .modal-card button:has-text("बुकिंग कन्फर्म करें")').click();

    // 9. Verify Confirmation Screen & Booking ID
    await expect(page.locator('.modal-card').filter({ hasText: 'RSL-2026-' })).toBeVisible();
  });

  test('Flow B: Report Tracking with 5-Stage Stepper & Authenticity Seal', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');

    // 1. Search for Seed Booking ID 'RSL-2026-48291'
    await page.locator('#tracker').scrollIntoViewIfNeeded();
    await page.fill('input[placeholder*="RSL-2026-48291"]', 'RSL-2026-48291');
    await page.locator('#tracker button:has-text("Track"), #tracker button:has-text("ट्रैक करें")').first().click();

    // 2. Verify Stepper and Progress
    await expect(page.locator('#tracker').filter({ hasText: 'RSL-2026-48291' })).toBeVisible();

    // 3. Open Authenticity Seal Modal
    await page.locator('button:has-text("View Authenticity Seal"), button:has-text("डिजिटल प्रमाण पत्र देखें")').click();
    await expect(page.locator('.modal-card').filter({ hasText: 'Dr. S. K. Verma' })).toBeVisible();
  });

  test('Flow C: Doctor Concierge Queue Token Request', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');

    // 1. Scroll to Doctor Directory
    await page.locator('#doctors').scrollIntoViewIfNeeded();

    // 2. Check Doctor Card
    await expect(page.locator('text=Dr. Sangeeta Gupta').first()).toBeVisible();

    // 3. Request Token
    await page.locator('button:has-text("Request Token"), button:has-text("नंबर लगवाएं")').first().click();

    // 4. Fill Concierge Request Form
    await page.fill('input[placeholder*="Sunil Tiwari"]', 'Kavita Kumari');
    await page.fill('input[placeholder*="10-digit mobile"]', '9431012345');
    await page.fill('input[placeholder*="Joint pain"]', 'ANC Consultation visit');

    // 5. Submit Concierge Request
    await page.locator('.modal-card button:has-text("Submit Token Request"), .modal-card button:has-text("टोकन का अनुरोध भेजें")').click();

    // 6. Verify Confirmation
    await expect(page.locator('text=Request Queued for Ground Staff').or(page.locator('text=अनुरोध प्राप्त हुआ'))).toBeVisible();
  });

  test('Flow D: Staff Operations Console Live Status Update', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');

    // 1. Open Lab Ops Drawer
    await page.locator('button:has-text("Lab Ops"), button:has-text("स्टाफ शीट")').click();

    // 2. Verify Table Loaded
    await expect(page.locator('text=Lab Operations Store & Google Sheet Sync')).toBeVisible();
    await expect(page.locator('td:has-text("RSL-2026-48291")').first()).toBeVisible();

    // 3. Update Status to 'REPORT_READY'
    const statusSelect = page.locator('table select').first();
    await statusSelect.selectOption('REPORT_READY');

    // 4. Close Ops Drawer
    await page.locator('button:has-text("Close Console")').click();

    // 5. Check Tracker section
    await page.locator('#tracker').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Doctor Verified').or(page.locator('text=डॉक्टर सत्यापित'))).toBeVisible();
  });
});
