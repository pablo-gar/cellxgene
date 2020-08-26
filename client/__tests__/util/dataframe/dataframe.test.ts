import * as Dataframe from "../../../src/util/dataframe";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("dataframe constructor", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("empty dataframe", () => {
    const df = new Dataframe.Dataframe([0, 0], []);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.dims).toEqual([0, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toHaveLength(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(0)).not.toBeDefined();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create with default indices", () => {
    const df = new Dataframe.Dataframe(
      [3, 2],
      [new Int32Array(3).fill(0), new Int32Array(3).fill(1)]
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.dims).toEqual([3, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.rowIndex).toBeInstanceOf(Dataframe.IdentityInt32Index);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.colIndex).toBeInstanceOf(Dataframe.IdentityInt32Index);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(0, 0)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(2, 1)).toEqual(1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 0)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 1)).toEqual(1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create with labelled indices", () => {
    const df = new Dataframe.Dataframe(
      [3, 2],
      [new Int32Array([0, 1, 2]), new Int32Array([3, 4, 5])],
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
      new Dataframe.DenseInt32Index([2, 1, 0]),
      new Dataframe.KeyIndex(["A", "B"])
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.dims).toEqual([3, 2]);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.rowIndex).toBeInstanceOf(Dataframe.DenseInt32Index);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.colIndex).toBeInstanceOf(Dataframe.KeyIndex);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.rowIndex.labels()).toEqual(new Int32Array([2, 1, 0]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.colIndex.labels()).toEqual(["A", "B"]);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(0, "A")).toEqual(2);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(2, "B")).toEqual(3);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 0)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 1)).toEqual(5);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("simple data access", () => {
  const df = new Dataframe.Dataframe(
    [4, 2],
    [
      new Float64Array([0.0, Number.NaN, Number.POSITIVE_INFINITY, 3.14159]),
      ["red", "blue", "green", "nan"],
    ],
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
    new Dataframe.DenseInt32Index([3, 2, 1, 0]),
    new Dataframe.KeyIndex(["numbers", "colors"])
  );

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("iat", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();

    // present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 0)).toEqual(0.0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 1)).toEqual("red");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(1, 0)).toEqual(Number.NaN);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(1, 1)).toEqual("blue");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 0)).toEqual(Number.POSITIVE_INFINITY);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 1)).toEqual("green");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(3, 0)).toEqual(3.14159);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(3, 1)).toEqual("nan");

    // labels out of range have no defined behavior
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("at", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();

    // present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(3, "numbers")).toEqual(0.0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(3, "colors")).toEqual("red");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(2, "numbers")).toEqual(Number.NaN);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(2, "colors")).toEqual("blue");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(1, "numbers")).toEqual(Number.POSITIVE_INFINITY);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(1, "colors")).toEqual("green");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(0, "numbers")).toEqual(3.14159);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.at(0, "colors")).toEqual("nan");

    // labels out of range have no defined behavior
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("ihas", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();

    // present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, 0)).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(1, 1)).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(3, 1)).toBeTruthy();

    // not present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(-1, -1)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, 99)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(99, 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(99, 99)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(-1, 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, -1)).toBeFalsy();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("has", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();

    // present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(3, "numbers")).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, "numbers")).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(3, "colors")).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, "colors")).toBeTruthy();

    // not present
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(3, "foo")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(-1, "numbers")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(-1, -1)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(null, null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, "foo")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(99, "numbers")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(99, "foo")).toBeFalsy();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("dataframe subsetting", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("subset", () => {
    const sourceDf = new Dataframe.Dataframe(
      [3, 4],
      [
        new Int32Array([0, 1, 2]),
        ["A", "B", "C"],
        new Float32Array([4.4, 5.5, 6.6]),
        ["red", "green", "blue"],
      ],
      null, // identity index
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["int32", "string", "float32", "colors"])
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all rows, one column", () => {
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
      const dfA = sourceDf.subset(null, ["colors"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([3, 1]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.iat(0, 0)).toEqual("red");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.at(2, "colors")).toEqual("blue");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("colors").asArray()).toEqual(["red", "green", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "green", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("colors").asArray()).toEqual(
        sourceDf.col("colors").asArray()
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.rowIndex.labels()).toEqual(sourceDf.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(["colors"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all rows, two columns", () => {
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
      const dfB = sourceDf.subset(null, ["float32", "colors"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.dims).toEqual([3, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.iat(0, 0)).toBeCloseTo(4.4);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.iat(0, 1)).toEqual("red");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.at(2, "colors")).toEqual("blue");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.at(2, "float32")).toBeCloseTo(6.6);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.col("colors").asArray()).toEqual(["red", "green", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.col("float32").asArray()).toEqual(
        new Float32Array([4.4, 5.5, 6.6])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.icol(0).asArray()).toEqual(dfB.col("float32").asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.icol(1).asArray()).toEqual(dfB.col("colors").asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.col("colors").asArray()).toEqual(
        sourceDf.col("colors").asArray()
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.col("float32").asArray()).toEqual(
        sourceDf.col("float32").asArray()
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.rowIndex.labels()).toEqual(sourceDf.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.colIndex.labels()).toEqual(["float32", "colors"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("one row, all columns", () => {
      const dfC = sourceDf.subset([1], null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.dims).toEqual([1, 4]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.iat(0, 0)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.iat(0, 1)).toEqual("B");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.iat(0, 2)).toBeCloseTo(5.5);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.iat(0, 3)).toEqual("green");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.rowIndex.labels()).toEqual(new Int32Array([1]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.colIndex.labels()).toEqual(sourceDf.colIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("two rows, all columns", () => {
      const dfD = sourceDf.subset([0, 2], null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.dims).toEqual([2, 4]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.icol(0).asArray()).toEqual(new Int32Array([0, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.icol(1).asArray()).toEqual(["A", "C"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.icol(2).asArray()).toEqual(new Float32Array([4.4, 6.6]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.icol(3).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.rowIndex.labels()).toEqual(new Int32Array([0, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfD.colIndex.labels()).toEqual(sourceDf.colIndex.labels());

      // reverse the row order
      const dfDr = sourceDf.subset([2, 0], null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.icol(0).asArray()).toEqual(new Int32Array([2, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.icol(1).asArray()).toEqual(["C", "A"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.icol(2).asArray()).toEqual(new Float32Array([6.6, 4.4]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.icol(3).asArray()).toEqual(["blue", "red"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.rowIndex.labels()).toEqual(new Int32Array([2, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfDr.colIndex.labels()).toEqual(sourceDf.colIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all rows, all columns", () => {
      const dfE = sourceDf.subset(null, null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.dims).toEqual([3, 4]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.icol(0).asArray()).toEqual(sourceDf.icol(0).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.icol(1).asArray()).toEqual(sourceDf.icol(1).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.icol(2).asArray()).toEqual(sourceDf.icol(2).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.icol(3).asArray()).toEqual(sourceDf.icol(3).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.rowIndex.labels()).toEqual(sourceDf.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfE.colIndex.labels()).toEqual(sourceDf.colIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("two rows, two colums", () => {
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
      const dfF = sourceDf.subset([0, 2], ["int32", "float32"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF.icol(0).asArray()).toEqual(new Int32Array([0, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF.icol(1).asArray()).toEqual(new Float32Array([4.4, 6.6]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF.rowIndex.labels()).toEqual(new Int32Array([0, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfF.colIndex.labels()).toEqual(["int32", "float32"]);

      // reverse the row and column order
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
      const dfFr = sourceDf.subset([2, 0], ["float32", "int32"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr.icol(0).asArray()).toEqual(new Float32Array([6.6, 4.4]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr.icol(1).asArray()).toEqual(new Int32Array([2, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr.rowIndex.labels()).toEqual(new Int32Array([2, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfFr.colIndex.labels()).toEqual(["float32", "int32"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("withRowIndex", () => {
      const df = sourceDf.subset(
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
        ["int32", "float32"],
        new Dataframe.DenseInt32Index([3, 2, 1])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex).toBeInstanceOf(Dataframe.KeyIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex).toBeInstanceOf(Dataframe.DenseInt32Index);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.at(3, "int32")).toEqual(df.iat(0, 0));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("withRowIndex error checks", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
        sourceDf.subset(null, ["red"], new Dataframe.IdentityInt32Index(1))
      ).toThrow(RangeError);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
        sourceDf.subset(null, ["red"], new Dataframe.DenseInt32Index([0, 1]))
      ).toThrow(RangeError);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'string[]' is not assignable to type 'null'.
        sourceDf.subset(null, ["red"], new Dataframe.KeyIndex([0, 1, 2, 3]))
      ).toThrow(RangeError);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("isubsetMask", () => {
    const sourceDf = new Dataframe.Dataframe(
      [3, 4],
      [
        new Int32Array([0, 1, 2]),
        ["A", "B", "C"],
        new Float32Array([4.4, 5.5, 6.6]),
        ["red", "green", "blue"],
      ],
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
      new Dataframe.DenseInt32Index([2, 4, 6]),
      new Dataframe.KeyIndex(["int32", "string", "float32", "colors"])
    );

    const dfA = sourceDf.isubsetMask(
      new Uint8Array([0, 1, 1]),
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'Uint8Array' is not assignable to type 'null'... Remove this comment to see the full error message
      new Uint8Array([1, 0, 0, 1])
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.dims).toEqual([2, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.icol(0).asArray()).toEqual(new Int32Array([1, 2]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.icol(1).asArray()).toEqual(["green", "blue"]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.rowIndex.labels()).toEqual(new Int32Array([4, 6]));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.colIndex.labels()).toEqual(["int32", "colors"]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("isubset", () => {
    const sourceDf = new Dataframe.Dataframe(
      [3, 4],
      [
        new Int32Array([0, 1, 2]),
        ["A", "B", "C"],
        new Float32Array([4.4, 5.5, 6.6]),
        ["red", "green", "blue"],
      ],
      null, // identity index
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["int32", "string", "float32", "colors"])
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("one row, all cols", () => {
      const dfA = sourceDf.isubset([1], null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([1, 4]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(new Int32Array([1]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual(["B"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual(new Float32Array([5.5]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(3).asArray()).toEqual(["green"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all rows, two cols", () => {
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'number[]' is not assignable to type 'null'.
      const dfA = sourceDf.isubset(null, [1, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([3, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["A", "B", "C"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual(new Float32Array([4.4, 5.5, 6.6]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("string")).toBe(dfA.icol(0));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("float32")).toBe(dfA.icol(1));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("out of order rows", () => {
      const dfA = sourceDf.isubset([2, 0], null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 4]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(new Int32Array([2, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual(["C", "A"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual(new Float32Array([6.6, 4.4]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(3).asArray()).toEqual(["blue", "red"]);
    });
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("dataframe factories", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create", () => {
    const df = Dataframe.Dataframe.create(
      [3, 3],
      [
        new Array(3).fill(0),
        new Int16Array(3).fill(99),
        new Float64Array(3).fill(1.1),
      ]
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.dims).toEqual([3, 3]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toHaveLength(3);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 0)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(1, 1)).toEqual(99);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 2)).toBeCloseTo(1.1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(0, 0)).toEqual(df.at(0, 0));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(1, 1)).toEqual(df.at(1, 1));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.iat(2, 2)).toEqual(df.at(2, 2));
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("clone", () => {
    const dfA = new Dataframe.Dataframe(
      [3, 2],
      [new Int32Array([0, 1, 2]), new Int32Array([3, 4, 5])],
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
      new Dataframe.DenseInt32Index([2, 1, 0]),
      new Dataframe.KeyIndex(["A", "B"])
    );

    const dfB = dfA.clone();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB).not.toBe(dfA);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.dims).toEqual(dfA.dims);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB).toHaveLength(dfA.length);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.colIndex.labels()).toEqual(dfA.colIndex.labels());
    for (let i = 0, l = dfB.dims[1]; i < l; i += 1) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.icol(i).asArray()).toEqual(dfA.icol(i).asArray());
    }
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("withCol", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("KeyIndex", () => {
      const df = new Dataframe.Dataframe(
        [2, 2],
        [
          ["red", "blue"],
          [true, false],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors", "bools"])
      );
      const dfA = df.withCol("numbers", [1, 0]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("numbers").asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(["colors", "bools", "numbers"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(["colors", "bools"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("DenseInt32Index", () => {
      const df = new Dataframe.Dataframe(
        [2, 2],
        [
          ["red", "blue"],
          [true, false],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
        new Dataframe.DenseInt32Index([74, 75])
      );
      const dfA = df.withCol(72, [1, 0]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(74).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(75).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(72).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([74, 75, 72]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([74, 75]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("DenseInt32Index promote", () => {
      const df = new Dataframe.Dataframe(
        [2, 2],
        [
          ["red", "blue"],
          [true, false],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
        new Dataframe.DenseInt32Index([74, 75])
      );
      const dfA = df.withCol(999, [1, 0]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(74).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(75).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(999).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([74, 75, 999]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([74, 75]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("IdentityInt32Index with last", () => {
      const df = new Dataframe.Dataframe(
        [2, 2],
        [
          ["red", "blue"],
          [true, false],
        ],
        null,
        null
      );
      const dfA = df.withCol(2, [1, 0]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([0, 1, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([0, 1]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("IdentityInt32Index promote", () => {
      const df = new Dataframe.Dataframe(
        [2, 2],
        [
          ["red", "blue"],
          [true, false],
        ],
        null,
        null
      );
      const dfA = df.withCol(99, [1, 0]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(2).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(99).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([0, 1, 99]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([0, 1]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("handle column dimensions correctly", () => {
      /*
      there are two conditions:
      - empty dataframe - will accept an add of any dimensionality
      - non-empty dataframe - added column must match row-count dimension
      */
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
      test("empty.withCol", () => {
        const edf = Dataframe.Dataframe.empty();
        const df = edf.withCol("foo", [1, 2, 3]);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(edf).toBeDefined();
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(df).toBeDefined();
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(edf).not.toEqual(df);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(df.dims).toEqual([3, 1]);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(df.icol(0).asArray()).toEqual([1, 2, 3]);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
      test("withCol dimension check", () => {
        const dfA = new Dataframe.Dataframe([1, 1], [["a"]]);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(() => {
          dfA.withCol(1, []);
        }).toThrow(RangeError);
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("withColsFrom", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("error conditions", () => {
      /*
      make sure we catch common errors:
      - duplicate column names
      - dimensionality difference
      */
      const dfA = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors", "bools", "numbers"])
      );

      /* different dimensionality should throw error */
      const dfB = new Dataframe.Dataframe(
        [3, 1],
        [["red", "blue", "green"]],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colorsA"])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => dfA.withColsFrom(dfB)).toThrow(RangeError);

      /* duplicate labels should throw an error */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => dfA.withColsFrom(dfA)).toThrow(Error);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("simple", () => {
      /* simple test that it works as expected in common case */
      const dfEmpty = Dataframe.Dataframe.empty();
      const dfA = new Dataframe.Dataframe(
        [2, 1],
        [["red", "blue"]],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors"])
      );
      const dfB = new Dataframe.Dataframe(
        [2, 1],
        [[true, false]],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["bools"])
      );

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const dfLikeA = dfEmpty.withColsFrom(dfA);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA.dims).toEqual(dfA.dims);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA.colIndex.labels()).toEqual(dfA.colIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfLikeA.icol(0).asArray()).toEqual(dfA.icol(0).asArray());

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const dfAlsoLikeA = dfA.withColsFrom(dfEmpty);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA.dims).toEqual(dfA.dims);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA.colIndex.labels()).toEqual(dfA.colIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfAlsoLikeA.icol(0).asArray()).toEqual(dfA.icol(0).asArray());

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const dfC = dfA.withColsFrom(dfB);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.colIndex.labels()).toEqual(["colors", "bools"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.col("colors").asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfC.col("bools").asArray()).toEqual([true, false]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("column picking", () => {
      const dfEmpty = Dataframe.Dataframe.empty();
      const dfA = new Dataframe.Dataframe(
        [2, 1],
        [["red", "blue"]],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors"])
      );
      const dfB = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors", "bools", "numbers"])
      );

      const dfX = dfEmpty.withColsFrom(dfB, ["colors", "bools"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.colIndex.labels()).toEqual(["colors", "bools"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.rowIndex).toEqual(dfB.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.icol(0).asArray()).toEqual(dfB.icol(0).asArray());

      const dfY = dfA.withColsFrom(dfB, ["numbers"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfY).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfY.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfY.colIndex.labels()).toEqual(["colors", "numbers"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfY.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfY.icol(0).asArray()).toEqual(dfA.icol(0).asArray());

      const dfZ = dfA.withColsFrom(dfEmpty, []);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfZ).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfZ.dims).toEqual(dfA.dims);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfZ.colIndex.labels()).toEqual(dfA.colIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfZ.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfZ.icol(0).asArray()).toEqual(dfA.icol(0).asArray());

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => dfA.withColsFrom(dfB, ["bools", "colors"])).toThrow();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("column aliasing", () => {
      const dfA = new Dataframe.Dataframe(
        [2, 1],
        [["red", "blue"]],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors"])
      );
      const dfB = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors", "bools", "numbers"])
      );

      const dfX = dfA.withColsFrom(dfB, { colors: "_colors", bools: "_bools" });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.dims).toEqual([2, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.colIndex.labels()).toEqual(["colors", "_colors", "_bools"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.rowIndex).toEqual(dfA.rowIndex);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.icol(0).asArray()).toEqual(dfA.icol(0).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfX.col("_colors").asArray()).toBe(dfB.col("colors").asArray());
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("dropCol", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("KeyIndex", () => {
      const df = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["colors", "bools", "numbers"])
      );
      const dfA = df.dropCol("colors");

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col("numbers").asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(["bools", "numbers"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(["colors", "bools", "numbers"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("IdentityInt32Index drop first", () => {
      const df = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        null
      );
      const dfA = df.dropCol(0);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.col(1).asArray()).toEqual(dfA.col(1).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.col(2).asArray()).toEqual(dfA.col(2).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([1, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([0, 1, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("IdentityInt32Index drop last", () => {
      const df = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        null
      );
      const dfA = df.dropCol(2);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([true, false]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.col(0).asArray()).toEqual(dfA.col(0).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.col(1).asArray()).toEqual(dfA.col(1).asArray());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([0, 1]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([0, 1, 2]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("DenseInt32Index", () => {
      const df = new Dataframe.Dataframe(
        [2, 3],
        [
          ["red", "blue"],
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'DenseInt32Index' is not assignable to type '... Remove this comment to see the full error message
        new Dataframe.DenseInt32Index([102, 101, 100])
      );
      const dfA = df.dropCol(101);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual([2, 2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(0).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.icol(1).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(100).asArray()).toEqual([1, 0]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.col(102).asArray()).toEqual(["red", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(new Int32Array([102, 100]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(new Int32Array([102, 101, 100]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.rowIndex.labels()).toEqual(dfA.rowIndex.labels());
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("mapColumns", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("identity", () => {
      const dfA = Dataframe.Dataframe.create(
        [3, 3],
        [
          new Array(3).fill(0),
          new Int16Array(3).fill(99),
          new Float64Array(3).fill(1.1),
        ]
      );
      const dfB = dfA.mapColumns((col: any, idx: any) => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(dfA.icol(idx).asArray()).toBe(col);
        return col;
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).not.toBe(dfB);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toEqual(dfB.dims);
      for (let c = 0; c < dfA.dims[1]; c += 1) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(dfA.icol(c).asArray()).toBe(dfB.icol(c).asArray());
      }
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("transform", () => {
      const dfA = Dataframe.Dataframe.create(
        [3, 3],
        [new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0)]
      );
      const dfB = dfA.mapColumns(() => {
        return new Array(3).fill(1);
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA).not.toBe(dfB);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.iat(0, 0)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.iat(0, 1)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.iat(0, 2)).toEqual(1);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("columns", () => {
      const df = Dataframe.Dataframe.create(
        [3, 3],
        [new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0)]
      );

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.columns()).toHaveLength(3);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.columns()[0]).toEqual(df.icol(0));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.columns()[2]).toEqual(df.icol(2));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("renameCol", () => {
      const dfA = new Dataframe.Dataframe(
        [2, 2],
        [
          [true, false],
          [1, 0],
        ],
        null,
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
        new Dataframe.KeyIndex(["A", "B"])
      );
      const dfB = dfA.renameCol("B", "C");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.colIndex.labels()).toEqual(["A", "B"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfB.colIndex.labels()).toEqual(["A", "C"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.dims).toMatchObject(dfB.dims);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(dfA.columns()).toMatchObject(dfB.columns());
    });
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("dataframe col", () => {
  let df: any = null;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    df = new Dataframe.Dataframe(
      [2, 2],
      [
        [true, false],
        [1, 0],
      ],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["A", "B"])
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A")).toBe(df.icol(0));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B")).toBe(df.icol(1));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("undefined")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol("undefined")).toBeUndefined();

    const colA = df.col("A");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA.asArray).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA.has).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA.ihas).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA.indexOf).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(colA.iget).toBeInstanceOf(Function);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col.asArray", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").asArray()).toEqual([true, false]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(0).asArray()).toEqual([true, false]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").asArray()).toEqual([1, 0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(1).asArray()).toEqual([1, 0]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col.has", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").has(-1)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").has(0)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").has(1)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").has(2)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").has(-1)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").has(0)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").has(1)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").has(2)).toBe(false);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col.ihas", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").ihas(-1)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").ihas(0)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").ihas(1)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").ihas(2)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").ihas(-1)).toBe(false);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").ihas(0)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").ihas(1)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").ihas(2)).toBe(false);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col.iget", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").iget(0)).toEqual(df.iat(0, 0));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").iget(1)).toEqual(df.iat(1, 1));
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("col.indexOf", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").indexOf(true)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").indexOf(false)).toEqual(1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").indexOf(99)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").indexOf(undefined)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("A").indexOf(1)).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").indexOf(1)).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").indexOf(0)).toEqual(1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").indexOf(99)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").indexOf(undefined)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("B").indexOf(true)).toBeUndefined();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("label indexing", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("isLabelIndex", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      Dataframe.isLabelIndex(new Dataframe.IdentityInt32Index(4))
    ).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      Dataframe.isLabelIndex(new Dataframe.DenseInt32Index([2, 4, 99]))
    ).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      Dataframe.isLabelIndex(new Dataframe.KeyIndex(["a", 4, "toasty"]))
    ).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex(false)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex(undefined)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex(null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex(true)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex([])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex({})).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Dataframe.isLabelIndex(Dataframe.IdentityInt32Index)).toBeFalsy();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("IdentityInt32Index", () => {
    const idx = new Dataframe.IdentityInt32Index(12); // [0, 12)

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("create", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Dataframe.isLabelIndex(idx)).toBeTruthy();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("labels", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabel(1)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabels([1, 3])).toEqual([1, 3]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.size()).toEqual(12);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("offsets", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffset(1)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffsets([1, 3])).toEqual([1, 3]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("subset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([2]).labels()).toEqual([2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([2, 3, 4]).labels()).toEqual(new Int32Array([2, 3, 4]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([0, 1, 2, 3]).labels()).toEqual(
        new Int32Array([0, 1, 2, 3])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([0, 1, 2, 3, 4])).toBeInstanceOf(
        Dataframe.IdentityInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([2, 1, 0])).toBeInstanceOf(
        Dataframe.IdentityInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([1, 2, 3, 4])).toBeInstanceOf(
        Dataframe.DenseInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([0, 1, 3, 4])).toBeInstanceOf(
        Dataframe.DenseInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([0, 1, 2, 3, 10])).toBeInstanceOf(
        Dataframe.DenseInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([4, 3, 2, 1])).toBeInstanceOf(
        Dataframe.DenseInt32Index
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([4])).toBeInstanceOf(Dataframe.KeyIndex);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubset([2]).labels()).toEqual([2]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubset([2, 3, 4]).labels()).toEqual(
        new Int32Array([2, 3, 4])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubset([0, 1, 2, 3]).labels()).toEqual(
        new Int32Array([0, 1, 2, 3])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([-1001])).toThrow(RangeError);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([1001])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubsetMask", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx
          .isubsetMask([
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
          ])
          .labels()
      ).toEqual(new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx
          .isubsetMask([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ])
          .labels()
      ).toEqual(new Int32Array([]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx
          .isubsetMask([
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
          ])
          .labels()
      ).toEqual(new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx
          .isubsetMask([
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
            true,
          ])
          .labels()
      ).toEqual(new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 11]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx
          .isubsetMask([
            false,
            true,
            true,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
          ])
          .labels()
      ).toEqual(new Int32Array([1, 2, 4, 5, 6, 7, 8, 9, 10]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubsetMask([])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("withLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel(99).labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 99])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel(12).labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabels([12, 13]).labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("dropLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.dropLabel(0).labels()).toEqual(
        new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.dropLabel(11).labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.dropLabel(5).labels()).toEqual(
        new Int32Array([0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11])
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("DenseInt32Index", () => {
    const idx = new Dataframe.DenseInt32Index([99, 1002, 48, 0, 22]);

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("create", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Dataframe.isLabelIndex(idx)).toBeTruthy();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("labels", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.labels()).toEqual(new Int32Array([99, 1002, 48, 0, 22]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.size()).toEqual(5);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabel(0)).toEqual(99);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabels(new Int32Array([2, 4]))).toEqual(
        new Int32Array([48, 22])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabels([2, 4])).toEqual([48, 22]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("offsets", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffset(1002)).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffset(0)).toEqual(3);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffsets([0, 48])).toEqual([3, 2]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("subset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset([1002, 0, 99]).labels()).toEqual(
        new Int32Array([1002, 0, 99])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffsets(idx.subset([1002, 0, 99]).labels())).toEqual(
        new Int32Array([1, 3, 0])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.subset([-1])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubset([4, 1, 2]).labels()).toEqual(
        new Int32Array([22, 1002, 48])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([-1001])).toThrow(RangeError);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([1001])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubsetMask", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubsetMask([true, true, true, true, true]).labels()).toEqual(
        new Int32Array([99, 1002, 48, 0, 22])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx.isubsetMask([false, false, false, false, false]).labels()
      ).toEqual(new Int32Array([]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubsetMask([true, true, false, true, true]).labels()).toEqual(
        new Int32Array([99, 1002, 0, 22])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        idx.isubsetMask([false, true, true, true, false]).labels()
      ).toEqual(new Int32Array([1002, 48, 0]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubsetMask([])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("withLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel(88).labels()).toEqual(
        new Int32Array([99, 1002, 48, 0, 22, 88])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel(88).getOffset(88)).toEqual(5);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabels([88, 99]).labels()).toEqual(
        new Int32Array([99, 1002, 48, 0, 22, 88, 99])
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("dropLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.dropLabel(48).labels()).toEqual(
        new Int32Array([99, 1002, 0, 22])
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("KeyIndex", () => {
    const idx = new Dataframe.KeyIndex(["red", "green", "blue"]);

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("create", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Dataframe.isLabelIndex(idx)).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => new Dataframe.KeyIndex(["dup", "dup"])).toThrow(Error);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(new Dataframe.KeyIndex().size()).toEqual(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("labels", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.labels()).toEqual(["red", "green", "blue"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.size()).toEqual(3);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabel(1)).toEqual("green");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getLabels([2, 0])).toEqual(["blue", "red"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("offsets", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.getOffset("blue")).toEqual(2);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("subset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset(["green"]).labels()).toEqual(["green"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.subset(["green", "red"]).labels()).toEqual(["green", "red"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubset", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubset([2, 1, 0]).labels()).toEqual(["blue", "green", "red"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([-1001])).toThrow(RangeError);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubset([1001])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubsetMask", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubsetMask([true, true, true]).labels()).toEqual([
        "red",
        "green",
        "blue",
      ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubsetMask([false, false, false]).labels()).toEqual([]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.isubsetMask([true, false, true]).labels()).toEqual([
        "red",
        "blue",
      ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => idx.isubsetMask([])).toThrow(RangeError);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("withLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel("yo").labels()).toEqual([
        "red",
        "green",
        "blue",
        "yo",
      ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabel("yo").getOffset("yo")).toEqual(3);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.withLabels(["hey", "there"]).labels()).toEqual([
        "red",
        "green",
        "blue",
        "hey",
        "there",
      ]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("dropLabel", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(idx.dropLabel("blue").labels()).toEqual(["red", "green"]);
    });
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("corner cases", () => {
  /* error/corner cases */

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("identity integer index rejects non-integer labels", () => {
    const idx = new Dataframe.IdentityInt32Index(10);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(0)).toBe(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(9)).toBe(9);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(10)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(-1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("length")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(0.001)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(new Float32Array())).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("__proto__")).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(0)).toBe(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(9)).toBe(9);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(10)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(-1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("length")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(0.001)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(new Float32Array())).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("__proto__")).toBeUndefined();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("dense integer index rejects non-integer labels", () => {
    const idx = new Dataframe.DenseInt32Index([-10, 0, 3, 9, 10]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(0)).toBe(1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(9)).toBe(3);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(11)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(-1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("length")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(0.001)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset(new Float32Array())).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getOffset("__proto__")).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(0)).toBe(-10);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(4)).toBe(10);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(10)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(-1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("length")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(0.001)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel(new Float32Array())).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(idx.getLabel("__proto__")).toBeUndefined();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Empty dataframe rejects bogus labels", () => {
    const df = Dataframe.Dataframe.empty();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol("sort")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(true)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(false)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol([])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol({})).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(undefined)).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(0)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(false)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(null)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(undefined)).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(0)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(false)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(null)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(undefined)).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("sort", "length")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("0", "0")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("", "")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(null, null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(undefined, undefined)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(true, true)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas([], [])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas({}, {})).toBeFalsy();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("Dataframe rejects bogus labels", () => {
    const df = new Dataframe.Dataframe(
      [2, 2],
      [
        [true, false],
        [1, 0],
      ],
      null,
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
      new Dataframe.KeyIndex(["A", "B"])
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol("sort")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol("__proto__")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(true)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(false)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol([])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol({})).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.hasCol(undefined)).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col("__proto__")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(0)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(false)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(null)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.col(undefined)).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol("sort")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol("__proto__")).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(-1)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(true)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(false)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol([])).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol({})).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(null)).toBeUndefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.icol(undefined)).toBeUndefined();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("sort", "length")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("__proto__", "__proto__")).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(-1, 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("0", 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas("", 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(null, 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(undefined, 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas([], 0)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas({}, 0)).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, -1)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, "0")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, "")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, undefined)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, [])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.ihas(0, {})).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has("sort", "length")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has("length", "sort")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has("__proto__", "__proto__")).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(-1, "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has("0", "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has("", "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(null, "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(undefined, "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has([], "A")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has({}, "A")).toBeFalsy();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, -1)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, "0")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, "")).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, null)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, undefined)).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, [])).toBeFalsy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(df.has(0, {})).toBeFalsy();
  });
});
