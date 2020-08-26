/*
Test cases for nameCreators.js.
*/
import {
  layoutDimensionName,
  obsAnnoDimensionName,
  diffexpDimensionName,
  userDefinedDimensionName,
  makeContinuousDimensionName,
} from "../../src/util/nameCreators";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("nameCreators", () => {
  const nameCreators = [
    layoutDimensionName,
    obsAnnoDimensionName,
    diffexpDimensionName,
    userDefinedDimensionName,
  ];

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("check for namespace isolation", () => {
    const foo = "foo";
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    nameCreators.forEach((fn) => expect(fn(foo)).not.toBe(foo));

    const bar = "bar";
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    nameCreators.forEach((fn) => expect(fn(foo)).not.toBe(fn(bar)));

    nameCreators.forEach((fn) => {
      const allOtherFn = nameCreators.filter((elmnt) => elmnt !== fn);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      allOtherFn.forEach((otherFn) => expect(fn(foo)).not.toBe(otherFn(foo)));
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("check for legal keys", () => {
    /* need namespace creators to return strings only */
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    nameCreators.forEach((fn) => expect(fn("X")).toMatch(/X/));
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("makeContinuousDimensionName", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("namespaces", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeContinuousDimensionName({ isObs: true }, "OK")).toMatch(/OK/);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeContinuousDimensionName({ isDiffExp: true }, "OK")).toMatch(
      /OK/
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeContinuousDimensionName({ isUserDefined: true }, "OK")).toMatch(
      /OK/
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("error handling", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => makeContinuousDimensionName({}, "oops")).toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() =>
      makeContinuousDimensionName(
        { isObs: false, isDiffExp: false, isUserDefined: false },
        "oops"
      )
    ).toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() =>
      makeContinuousDimensionName({ isObs: true }, "OK")
    ).not.toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() =>
      makeContinuousDimensionName({ isDiffExp: true }, "OK")
    ).not.toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() =>
      makeContinuousDimensionName({ isUserDefined: true }, "OK")
    ).not.toThrow();
  });
});
