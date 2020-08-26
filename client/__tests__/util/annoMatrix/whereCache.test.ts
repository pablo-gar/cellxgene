import {
  _whereCacheGet,
  _whereCacheCreate,
  _whereCacheMerge,
} from "../../../src/annoMatrix/whereCache";

const schema = {};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("whereCache", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("whereCacheGet - missing cache values", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet({}, schema, "X", {
        field: "var",
        column: "foo",
        value: "bar",
      })
    ).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet({ X: {} }, schema, "X", {
        field: "var",
        column: "foo",
        value: "bar",
      })
    ).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet({ X: { var: new Map() } }, schema, "X", {
        field: "var",
        column: "foo",
        value: "bar",
      })
    ).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(
        { X: { var: new Map([["foo", new Map()]]) } },
        schema,
        "X",
        {
          field: "var",
          column: "foo",
          value: "bar",
        }
      )
    ).toEqual([undefined]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("whereCacheGet - varied lookups", () => {
    const whereCache = {
      X: {
        var: new Map([
          [
            "foo",
            new Map([
              ["bar", [0]],
              ["baz", [1, 2]],
            ]),
          ],
        ]),
      },
    };

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(whereCache, schema, "X", {
        field: "var",
        column: "foo",
        value: "bar",
      })
    ).toEqual([0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(whereCache, schema, "X", {
        field: "var",
        column: "foo",
        value: "baz",
      })
    ).toEqual([1, 2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(_whereCacheGet(whereCache, schema, "Y", {})).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(whereCache, schema, "X", {
        field: "whoknows",
        column: "whatever",
        value: "snork",
      })
    ).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(whereCache, schema, "X", {
        field: "var",
        column: "whatever",
        value: "snork",
      })
    ).toEqual([undefined]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(whereCache, schema, "X", {
        field: "var",
        column: "foo",
        value: "snork",
      })
    ).toEqual([undefined]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("whereCacheCreate", () => {
    const query = {
      field: "queryField",
      column: "queryColumn",
      value: "queryValue",
    };
    const wc = _whereCacheCreate(
      "field",
      { field: "queryField", column: "queryColumn", value: "queryValue" },
      [0, 1, 2]
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc).toEqual(
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect.objectContaining({
        field: {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          queryField: expect.any(Map),
        },
      })
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc.field.queryField.has("queryColumn")).toEqual(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc.field.queryField.get("queryColumn")).toBeInstanceOf(Map);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc.field.queryField.get("queryColumn").has("queryValue")).toEqual(
      true
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(_whereCacheGet(wc, schema, "field", query)).toEqual([0, 1, 2]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("whereCacheMerge", () => {
    let wc;

    // remember, will mutate dst
    const src = _whereCacheCreate(
      "field",
      { field: "queryField", column: "queryColumn", value: "foo" },
      ["foo"]
    );

    const dst1 = _whereCacheCreate(
      "field",
      { field: "queryField", column: "queryColumn", value: "bar" },
      ["dst1"]
    );
    wc = _whereCacheMerge(dst1, src);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(wc, schema, "field", {
        field: "queryField",
        column: "queryColumn",
        value: "foo",
      })
    ).toEqual(["foo"]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(wc, schema, "field", {
        field: "queryField",
        column: "queryColumn",
        value: "bar",
      })
    ).toEqual(["dst1"]);

    const dst2 = _whereCacheCreate(
      "field",
      { field: "queryField", column: "queryColumn", value: "bar" },
      ["dst2"]
    );
    wc = _whereCacheMerge(dst2, dst1, src);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(wc, schema, "field", {
        field: "queryField",
        column: "queryColumn",
        value: "foo",
      })
    ).toEqual(["foo"]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      _whereCacheGet(wc, schema, "field", {
        field: "queryField",
        column: "queryColumn",
        value: "bar",
      })
    ).toEqual(["dst1"]);

    wc = _whereCacheMerge({}, src);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc).toEqual(src);

    wc = _whereCacheMerge({ field: { queryField: new Map() } }, src);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wc).toEqual(src);
  });
});
