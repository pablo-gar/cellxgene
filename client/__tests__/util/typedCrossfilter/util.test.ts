import {
  sliceByIndex,
  makeSortIndex,
} from "../../../src/util/typedCrossfilter/util";
import { rangeFill as fillRange } from "../../../src/util/range";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("fillRange", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange(new Array(6))).toMatchObject([0, 1, 2, 3, 4, 5]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange(new Array(4), 1)).toMatchObject([1, 2, 3, 4]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange([])).toMatchObject([]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Uint32Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange(new Uint32Array(6))).toMatchObject(
      new Uint32Array([0, 1, 2, 3, 4, 5])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange(new Array(4), 1)).toMatchObject(
      new Uint32Array([1, 2, 3, 4])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(fillRange([])).toMatchObject(new Uint32Array([]));
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("sliceByIndex", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([0, 1, 2, 3, 4], [0, 1, 2])).toMatchObject([0, 1, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([0, 1, 2, 3, 4], [2, 1, 0])).toMatchObject([2, 1, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([0, 1, 2, 3, 4], [])).toMatchObject([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([], [])).toMatchObject([]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Uint32Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex([0, 1, 2, 3, 4], new Uint32Array([0, 1, 2]))
    ).toMatchObject([0, 1, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex([0, 1, 2, 3, 4], new Uint32Array([2, 1, 0]))
    ).toMatchObject([2, 1, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([0, 1, 2, 3, 4], new Uint32Array([]))).toMatchObject(
      []
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex([], new Uint32Array([]))).toMatchObject([]);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(new Uint32Array([0, 1, 2, 3, 4]), new Uint32Array([0, 1, 2]))
    ).toMatchObject(new Uint32Array([0, 1, 2]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(new Uint32Array([0, 1, 2, 3, 4]), new Uint32Array([2, 1, 0]))
    ).toMatchObject(new Uint32Array([2, 1, 0]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(
        new Uint32Array([0, 1, 2, 3, 4]),
        new Uint32Array(new Uint32Array([]))
      )
    ).toMatchObject(new Uint32Array([]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(new Uint32Array([]), new Uint32Array([]))
    ).toMatchObject(new Uint32Array([]));
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Float32Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(new Float32Array([0, 1, 2, 3, 4]), [0, 1, 2])
    ).toMatchObject(new Float32Array([0, 1, 2]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      sliceByIndex(new Float32Array([0, 1, 2, 3, 4]), [2, 1, 0])
    ).toMatchObject(new Float32Array([2, 1, 0]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex(new Float32Array([0, 1, 2, 3, 4]), [])).toMatchObject(
      new Float32Array([])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(sliceByIndex(new Float32Array([]), [])).toMatchObject(
      new Float32Array([])
    );
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("makeSortIndex", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex([3, 2, 1, 0])).toMatchObject(
      new Uint32Array([3, 2, 1, 0])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex([3, 2, 1, 0, 4])).toMatchObject(
      new Uint32Array([3, 2, 1, 0, 4])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex([])).toMatchObject(new Uint32Array([]));
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Float32Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Float32Array([3, 2, 1, 0]))).toMatchObject(
      new Uint32Array([3, 2, 1, 0])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Float32Array([3, 2, 1, 0, 4]))).toMatchObject(
      new Uint32Array([3, 2, 1, 0, 4])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Float32Array([]))).toMatchObject(
      new Uint32Array([])
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Int32Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Int32Array([3, 2, 1, 0]))).toMatchObject(
      new Uint32Array([3, 2, 1, 0])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Int32Array([3, 2, 1, 0, 4]))).toMatchObject(
      new Uint32Array([3, 2, 1, 0, 4])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(makeSortIndex(new Int32Array([]))).toMatchObject(
      new Uint32Array([])
    );
  });
});
