// jshint esversion: 6

// const PositiveIntervals = require("../../src/util/typedCrossfilter/positiveIntervals");
import PositiveIntervals from "../../../src/util/typedCrossfilter/positiveIntervals";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("canonicalize", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("empty", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.canonicalize([])).toEqual([]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("simple, already correct", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.canonicalize([[0, 1]])).toEqual([[0, 1]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.canonicalize([
        [0, 1],
        [2, 3],
      ])
    ).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("non-canonical, need to be canonicalized", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.canonicalize([
        [0, 1],
        [1, 2],
      ])
    ).toEqual([[0, 2]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.canonicalize([
        [1, 2],
        [2, 3],
      ])
    ).toEqual([[1, 3]]);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("union", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("empty range", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([], [])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([], [[1, 2]])).toEqual([[1, 2]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.union(
        [],
        [
          [1, 2],
          [3, 4],
        ]
      )
    ).toEqual([
      [1, 2],
      [3, 4],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[3, 4]], [])).toEqual([[3, 4]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.union(
        [
          [1, 2],
          [3, 4],
        ],
        []
      )
    ).toEqual([
      [1, 2],
      [3, 4],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[3, 3]], [])).toEqual([[3, 3]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([], [[3, 3]])).toEqual([[3, 3]]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("simple ranges", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[1, 2]], [[2, 3]])).toEqual([[1, 3]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[2, 3]], [[1, 2]])).toEqual([[1, 3]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[1, 2]], [[3, 4]])).toEqual([
      [1, 2],
      [3, 4],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.union(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [6, 7],
          [19, 40],
        ]
      )
    ).toEqual([
      [1, 2],
      [3, 4],
      [6, 7],
      [19, 40],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.union(
        [[1, 4]],
        [
          [1, 1],
          [3, 4],
        ]
      )
    ).toEqual([[1, 4]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.union([[3, 3]], [[4, 4]])).toEqual([
      [3, 3],
      [4, 4],
    ]);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("intersection", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("empty range", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([], [])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([], [[1, 2]])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 2]], [])).toEqual([]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("simple", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 2]], [[2, 3]])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[2, 3]], [[1, 2]])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 10]], [[1, 10]])).toEqual([
      [1, 10],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 10]], [[2, 8]])).toEqual([
      [2, 8],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[2, 8]], [[1, 10]])).toEqual([
      [2, 8],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 10]], [[2, 12]])).toEqual([
      [2, 10],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[2, 12]], [[1, 10]])).toEqual([
      [2, 10],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 10]], [[1, 8]])).toEqual([
      [1, 8],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 8]], [[1, 10]])).toEqual([
      [1, 8],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.intersection(
        [[1, 10]],
        [
          [1, 2],
          [6, 9],
        ]
      )
    ).toEqual([
      [1, 2],
      [6, 9],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.intersection([[0, 2638]], [[1363, 2638]])
    ).toEqual([[1363, 2638]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.intersection([[1, 2]], [[1, 2]])).toEqual([
      [1, 2],
    ]);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("difference", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("empty", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([], [])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([], [[1, 10]])).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([[1, 10]], [])).toEqual([[1, 10]]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("simple", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.difference(
        [
          [1, 2],
          [3, 4],
        ],
        []
      )
    ).toEqual([
      [1, 2],
      [3, 4],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.difference(
        [
          [1, 2],
          [3, 10],
        ],
        [[5, 10]]
      )
    ).toEqual([
      [1, 2],
      [3, 5],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.difference(
        [
          [1, 2],
          [3, 10],
        ],
        [[0, 5]]
      )
    ).toEqual([[5, 10]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.difference(
        [[0, 2638]],
        [
          [0, 1363],
          [2055, 2638],
        ]
      )
    ).toEqual([[1363, 2055]]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      PositiveIntervals.difference(
        [
          [0, 1363],
          [2055, 2638],
        ],
        [[0, 2638]]
      )
    ).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([[0, 10]], [[0, 1]])).toEqual([
      [1, 10],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([[0, 10]], [[1, 2]])).toEqual([
      [0, 1],
      [2, 10],
    ]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(PositiveIntervals.difference([[0, 10]], [[9, 10]])).toEqual([
      [0, 9],
    ]);
  });
});
