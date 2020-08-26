import * as Dataframe from "../../../src/util/dataframe";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Dataframe column histogram", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("categorical by categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("cat").histogram(df.col("name"));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(h1).toMatchObject(
      new Map([
        ["n1", new Map([["c1", 1]])],
        ["n2", new Map([["c2", 1]])],
        ["n3", new Map([["c3", 1]])],
      ])
    );
    // memoized?
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("cat").histogram(df.col("name"))).toMatchObject(h1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("continuous by categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("value").histogram(3, [0, 2], df.col("name"));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(h1).toMatchObject(
      new Map([
        ["n1", [1, 0, 0]],
        ["n2", [0, 1, 0]],
        ["n3", [0, 0, 1]],
      ])
    );
    // memoized?
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("value").histogram(3, [0, 2], df.col("name"))).toMatchObject(
      h1
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("cat").histogram();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(h1).toMatchObject(
      new Map([
        ["c1", 1],
        ["c2", 1],
        ["c3", 1],
      ])
    );
    // memoized?
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("value").histogram(3, [0, 2])).toMatchObject(h1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("continuous", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("value").histogram(3, [0, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(h1).toMatchObject([1, 1, 1]);
    // memoized?
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("value").histogram(3, [0, 2])).toMatchObject(h1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("continuous thesholds correct", () => {
    const vals = [0, 1, 9, 10, 11, 20, 99, 100];
    const df = new Dataframe.Dataframe(
      [8, 2],
      [new Int32Array(vals), new Float32Array(vals)]
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(0).histogram(5, [0, 100])).toEqual([5, 1, 0, 0, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(1).histogram(5, [0, 100])).toEqual([5, 1, 0, 0, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(0).histogram(2, [0, 10])).toEqual([2, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(0).histogram(10, [0, 100])).toEqual([
      3,
      2,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
    ]);
  });
});
