/**
 * `client/jest-puppeteer.config.js` is for configuring Puppeteer's launch config options
 * `client/__tests__/e2e/puppeteer.setup.js` is for configuring `jest`, `browser`,
 * and `page` objects
 */

// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/expect-puppeteer` if it ex... Remove this comment to see the full error message
import { setDefaultOptions } from "expect-puppeteer";
import { isDebug, isDev } from "./config";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../../../environment.default.j... Remove this comment to see the full error message
import * as ENV_DEFAULT from "../../../environment.default.json";

// (thuang): This is the max time a test can take to run.
// Since when debugging, we run slowMo and !headless, this means
// a test can take more time to finish, so we don't want
// jest to shut off the test too soon
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
jest.setTimeout(2 * 60 * 1000);
setDefaultOptions({ timeout: 20 * 1000 });

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
jest.retryTimes(ENV_DEFAULT.RETRY_ATTEMPTS);

(async () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'browser'.
  const userAgent = await browser.userAgent();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.setUserAgent(`${userAgent}bot`);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page._client.send("Animation.setPlaybackRate", { playbackRate: 12 });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  page.on("pageerror", (err: any) => {
    throw new Error(`Console error: ${err}`);
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  page.on("error", (err: any) => {
    throw new Error(`Console error: ${err}`);
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  page.on("console", async (msg: any) => {
    if (isDev || isDebug) {
      // If there is a console.error but an error is not thrown, this will ensure the test fails
      console.log(`PAGE LOG: ${msg.text()}`);
      if (msg.type() === "error") {
        // TODO: chromium does not currently support the CSP directive on the
        // line below, so we swallow this error. Remove this when the test
        // suite uses a browser version that supports this directive.
        if (
          msg.text() ===
          "Unrecognized Content-Security-Policy directive 'require-trusted-types-for'.\n"
        ) {
          return;
        }
        const errorMsgText = await Promise.all(
          // TODO can we do this without internal properties?
          msg.args().map((arg: any) => arg._remoteObject.description)
        );
        throw new Error(`Console error: ${errorMsgText}`);
      }
    }
  });
})().catch((error) => {
  console.error("puppeteer.setup.js error", error);
});
