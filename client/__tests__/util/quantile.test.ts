import quantile from "../../src/util/quantile";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("quantile", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("single q", () => {
    const arr = new Float32Array([9, 3, 5, 6, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([1.0], arr)).toMatchObject([9]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.9], arr)).toMatchObject([9]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.8], arr)).toMatchObject([9]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.7], arr)).toMatchObject([6]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.6], arr)).toMatchObject([6]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.5], arr)).toMatchObject([5]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.4], arr)).toMatchObject([5]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.3], arr)).toMatchObject([3]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.2], arr)).toMatchObject([3]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0.1], arr)).toMatchObject([0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0], arr)).toMatchObject([0]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("multi q", () => {
    const arr = new Float32Array([9, 3, 5, 6, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(quantile([0, 0.25, 0.5, 0.75, 1.0], arr)).toMatchObject([
      0,
      3,
      5,
      6,
      9,
    ]);
  });
});
