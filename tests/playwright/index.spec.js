const { test, expect } = require('@playwright/test');

test.describe('Test end to end Pendu', () => {
    test('La page d\'accueil ce lance', async ({ page }) => {
        await page.goto('/');
      
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Le Jeu du Pendu/);

        await expect(page.locator('#gamesection')).toBeVisible();
        await expect(page.locator('#resultsection')).toBeHidden();
        await expect(page.locator('#scoresection')).toBeHidden();
    });

    test('Le mot masqué est affiché', async ({ page }) => {
        await page.goto('/');

        const maskedWord = await page.locator('#word');
        const maskedWordText = await maskedWord.textContent();
        expect(maskedWordText).toBe('#'.repeat(maskedWordText.length)); 
    });

    test('Test lettre', async ({ page }) => {
        await page.goto('/');
        
        const letterInput = await page.locator('#letterInput');
        await letterInput.fill("a");

        const testButton = await page.locator('#testButton');
        await testButton.click();
    
        const word = await page.locator('#word');
        //await expect(word).toHaveValue('a');

        const numberOfTries = await page.locator('#numberOfTries');
        //await expect(numberOfTries).toHaveValue('4');

        let isTestPassed = false;

        try {
            await expect(word).toHaveText(/a/);
            isTestPassed = true;
        } catch (e) {
        }

        try {
            await expect(numberOfTries).toHaveText(/4/);
            isTestPassed = true;
        } catch (e) {
        }

        expect(isTestPassed).toBe(true);
    });

    test('Le nombre d\'essais est supérieu à 0', async ({ page }) => {
        await page.goto('/');

        const numberOfTries = await page.locator('#numberOfTries');
        const numberOfTriesText = await numberOfTries.textContent();

        const numberOfTriesValue = parseInt(numberOfTriesText, 10);
        expect(numberOfTriesValue).toBeGreaterThan(0);
    });

    test('Les sections sont affichées correctement en fonction des conditions', async ({ page }) => {
        await page.goto('/');
        const isWin = await page.evaluate(() => localStorage.getItem('isWin'));
        const numberOfTries = await page.evaluate(() => localStorage.getItem('numberOfTries'));
    
        if (isWin === "true" || parseInt(numberOfTries, 10) === 0) {
            await expect(page.locator('#resultsection')).toBeVisible();
            await expect(page.locator('#gamesection')).toBeHidden();
        } else {
            await expect(page.locator('#gamesection')).toBeVisible();
            await expect(page.locator('#resultsection')).toBeHidden();
        }
    });
    
    test('Le score est mis à jour correctement', async ({ page }) => {
        await page.goto('/');
        const initialScore = await page.evaluate(() => parseInt(localStorage.getItem('score'), 10));
    
        await page.locator('#letterInput').fill('a');
        await page.locator('#testButton').click();
    
        const updatedScore = await page.evaluate(() => parseInt(localStorage.getItem('score'), 10));
        expect(updatedScore).toBeLessThan(initialScore);
    });
});


// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
