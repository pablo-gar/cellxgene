/* eslint-disable no-await-in-loop -- await in loop is needed to emulate sequential user actions */
export function getTestId(id: any) {
  return `[data-testid='${id}']`;
}

export function getTestClass(className: any) {
  return `[data-testclass='${className}']`;
}

export async function waitByID(testId: any, props = {}) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.waitForSelector(getTestId(testId), props);
}

export async function waitByClass(testClass: any, props = {}) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitForSelector(`[data-testclass='${testClass}']`, props);
}

export async function waitForAllByIds(testIds: any) {
  await Promise.all(
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    testIds.map((testId: any) => page.waitForSelector(getTestId(testId)))
  );
}

export async function getAllByClass(testClass: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.$$(`[data-testclass=${testClass}]`);
}

export async function typeInto(testId: any, text: any) {
  // blueprint's  typeahead is treating typing weird, clicking & waiting first solves this
  // only works for text without special characters
  await waitByID(testId);
  const selector = getTestId(testId);
  // type ahead can be annoying if you don't pause before you type
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.click(selector);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitFor(200);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.type(selector, text);
}

export async function clearInputAndTypeInto(testId: any, text: any) {
  await waitByID(testId);
  const selector = getTestId(testId);
  // only works for text without special characters
  // type ahead can be annoying if you don't pause before you type
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.click(selector);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitFor(200);
  // select all
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.click(selector, { clickCount: 3 });
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.keyboard.press("Backspace");
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.type(selector, text);
}

export async function clickOn(testId: any, options = {}) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  await expect(page).toClick(getTestId(testId), options);
}

/**
 * (thuang): There are times when Puppeteer clicks on a button and the page doesn't respond.
 * So I added clickOnUntil() to retry clicking until a given condition is met.
 */
export async function clickOnUntil(testId: any, assert: any) {
  const MAX_RETRY = 10;
  const WAIT_FOR_MS = 200;

  let retry = 0;

  while (retry < MAX_RETRY) {
    try {
      await clickOn(testId);
      await assert();

      break;
    } catch (error) {
      retry += 1;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
      await page.waitFor(WAIT_FOR_MS);
    }
  }

  if (retry === MAX_RETRY) {
    throw Error("clickOnUntil() assertion failed!");
  }
}

export async function getOneElementInnerHTML(selector: any, options = {}) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitForSelector(selector, options);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.$eval(selector, (el: any) => el.innerHTML);
}

export async function getOneElementInnerText(selector: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  expect(page).toMatchElement(selector);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.$eval(selector, (el: any) => el.innerText);
}

export async function getElementCoordinates(testId: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.$eval(getTestId(testId), (elem: any) => {
    const { left, top } = elem.getBoundingClientRect();
    return [left, top];
  });
}

async function clickTermsOfService() {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!(await isElementPresent(getTestId("tos-cookies-accept")))) return;

  await clickOn("tos-cookies-accept");
}

async function nameNewAnnotation() {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (await isElementPresent(getTestId("annotation-dialog"))) {
    await typeInto("new-annotation-name", "ignoreE2E");
    await clickOn("submit-annotation");

    // wait for the page to load
    await waitByClass("autosave-complete");
  }
}

export async function goToPage(url: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await nameNewAnnotation();
  await clickTermsOfService();
}

export async function isElementPresent(selector: any, options: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return Boolean(await page.$(selector, options));
}
/* eslint-enable no-await-in-loop -- await in loop is needed to emulate sequential user actions */
