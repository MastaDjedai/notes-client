
import { test, expect } from '@playwright/test';

test('user can create, edit and delete a note', async ({ page }) => {
  await page.goto('/');

  const uniqueTitle = `E2E Note ${Date.now()}`;

  // Create
  await page.getByLabel('Title').fill(uniqueTitle);
  await page.getByLabel('Content').fill('Created by Playwright');
  await page.getByRole('button', { name: 'Add note' }).click();

  const note = page.locator('.note-card').filter({ hasText: uniqueTitle });
  await expect(note).toBeVisible();

  // Edit
  await note.getByRole('button', { name: `Edit ${uniqueTitle}` }).click();

// Wait for the GET specific note request to complete
  await page.getByRole('button', { name: 'Save changes' }).waitFor({
    state: 'visible'
  });

  const titleInput = page.getByLabel('Title');
  await titleInput.fill(`${uniqueTitle} Updated`);
  await expect(titleInput).toHaveValue(`${uniqueTitle} Updated`);

  await page.getByRole('button', { name: 'Save changes' }).click();

  const updatedNote = page.locator('.note-card')
    .filter({ hasText: `${uniqueTitle} Updated` });
  await expect(updatedNote).toBeVisible();

  // Delete
  page.once('dialog', dialog => dialog.accept());

  await updatedNote.getByRole('button', {
    name: `Delete ${uniqueTitle} Updated`
  }).click();

  await expect(updatedNote).toHaveCount(0);
});
