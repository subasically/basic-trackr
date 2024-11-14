// server/api/scrape.js

import { defineEventHandler, readBody } from 'h3';
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  console.log('Scraping event:', event);
  try {
    // Parse request body
    const { url, selector } = await readBody(event);
    console.log('Scraping URL:', url);
    console.log('Scraping selector:', selector);

    if (!url || !selector) {
      return {
        status: 400,
        message: 'URL and selector are required.',
      };
    }

    // Launch Puppeteer browser
    console.log('Launching Puppeteer browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }); // Use headless mode to avoid GUI
    console.log('Puppeteer browser launched.');
    const page = await browser.newPage();

    // Set custom headers to mimic a real person's browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.google.com/'
    });

    // Navigate to the provided URL
    try {
      console.log('Navigating to URL:', url);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      console.log('Navigation complete.');
    } catch (navigationError) {
      console.error('Navigation error:', navigationError);
      await browser.close();
      return {
        status: 500,
        message: 'Failed to navigate to the specified URL.',
      };
    }

    // Wait for the selector to appear on the page
    try {
      console.log('Waiting for selector:', selector);
      await page.waitForSelector(selector, { visible: true, timeout: 30000 });
      console.log('Selector found.');
    } catch (waitError) {
      console.error('Wait error:', waitError);
      await browser.close();
      return {
        status: 404,
        message: 'The specified selector was not found on the page.',
      };
    }

    // Evaluate the selector and get its text content
    try {
      console.log('Evaluating selector:', selector);
      const result = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.textContent.trim() : null;
      }, selector);
      console.log('Evaluation complete:', result);

      // Close the browser
      await browser.close();

      if (!result) {
        return {
          status: 404,
          message: 'The specified selector could not be evaluated.',
        };
      }

      // Return the scraped data
      return {
        status: 200,
        data: result,
      };
    } catch (evaluationError) {
      console.error('Evaluation error:', evaluationError);
      await browser.close();
      return {
        status: 500,
        message: 'An error occurred while evaluating the selector.',
      };
    }
  } catch (error) {
    console.error('General scraping error:', error);
    return {
      status: 500,
      message: 'An unexpected error occurred during scraping.',
    };
  }
});