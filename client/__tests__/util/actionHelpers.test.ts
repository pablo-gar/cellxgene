import { rangeEncodeIndices } from "../../src/util/actionHelpers";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("rangeEncodeIndices", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("small array edge cases", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([])).toMatchObject([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([1])).toMatchObject([1]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([1, 99])).toMatchObject([1, 99]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([99, 1])).toMatchObject([1, 99]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([1, 100, 4])).toMatchObject([1, 4, 100]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("sorted flag", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([1, 9, 432], 10, true)).toMatchObject([
      1,
      9,
      432,
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(rangeEncodeIndices([1, 9, 432], 10, false)).toMatchObject([
      1,
      9,
      432,
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 1, 2, 3, 9, 10, 432], 2, true)
    ).toMatchObject([[0, 3], [9, 10], 432]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 1, 2, 3, 9, 10, 432], 2, false)
    ).toMatchObject([[0, 3], [9, 10], 432]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("begin or end edge cases", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([3, 4, 5, 6, 7, 10, 11, 12, 99], 3, false)
    ).toMatchObject([[3, 7], [10, 12], 99]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([3, 4, 5, 6, 7, 10, 11, 12], 3, false)
    ).toMatchObject([
      [3, 7],
      [10, 12],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 3, 4, 5, 6, 7, 10, 11, 12], 3, false)
    ).toMatchObject([0, [3, 7], [10, 12]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 3, 4, 5, 6, 7, 10, 11, 12, 99], 3, false)
    ).toMatchObject([0, [3, 7], [10, 12], 99]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("minRangeLength", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([3, 4, 5, 6, 7, 10, 11, 12, 99], 4, false)
    ).toMatchObject([[3, 7], 10, 11, 12, 99]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([3, 4, 5, 6, 7, 10, 11, 12], 4, false)
    ).toMatchObject([[3, 7], 10, 11, 12]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 3, 4, 5, 6, 7, 10, 11, 12], 4, false)
    ).toMatchObject([0, [3, 7], 10, 11, 12]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      rangeEncodeIndices([0, 3, 4, 5, 6, 7, 10, 11, 12, 99], 4, false)
    ).toMatchObject([0, [3, 7], 10, 11, 12, 99]);
  });
});
