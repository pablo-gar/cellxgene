// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";

import Crossfilter from "../../../src/util/typedCrossfilter";

const someData = [
  {
    date: "2011-11-14T16:17:54Z",
    quantity: 2,
    total: 190,
    tip: 100,
    type: "tab",
    productIDs: ["001"],
    coords: [0, 0],
    nonFinite: 0.0,
  },
  {
    date: "2011-11-14T16:20:19Z",
    quantity: 2,
    total: 190,
    tip: 100,
    type: "tab",
    productIDs: ["001", "005"],
    coords: [0.4, 0.4],
    nonFinite: Number.NaN,
  },
  {
    date: "2011-11-14T16:28:54Z",
    quantity: 1,
    total: 300,
    tip: 200,
    type: "visa",
    productIDs: ["004", "005"],
    coords: [0.3, 0.1],
    nonFinite: Number.POSITIVE_INFINITY,
  },
  {
    date: "2011-11-14T16:30:43Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["001", "002"],
    coords: [0.392, 0.1],
    nonFinite: Number.NEGATIVE_INFINITY,
  },
  {
    date: "2011-11-14T16:48:46Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["005"],
    coords: [0.7, 0.0482],
    nonFinite: 1.0,
  },
  {
    date: "2011-11-14T16:53:41Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["001", "004", "005"],
    coords: [0.9999, 1.0],
    nonFinite: Number.NaN,
  },
  {
    date: "2011-11-14T16:54:06Z",
    quantity: 1,
    total: 100,
    tip: 0,
    type: "cash",
    productIDs: ["001", "002", "003", "004", "005"],
    coords: [0.384, 0.6938],
    nonFinite: 99.0,
  },
  {
    date: "2011-11-14T16:58:03Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["001"],
    coords: [0.4822, 0.482],
    nonFinite: Number.NaN,
  },
  {
    date: "2011-11-14T17:07:21Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["004", "005"],
    coords: [0.2234, 0],
    nonFinite: Number.NaN,
  },
  {
    date: "2011-11-14T17:22:59Z",
    quantity: 2,
    total: 90,
    tip: 0,
    type: "tab",
    productIDs: ["001", "002", "004", "005"],
    coords: [0.382, 0.38485],
    nonFinite: -1,
  },
  {
    date: "2011-11-14T17:25:45Z",
    quantity: 2,
    total: 200,
    tip: 0,
    type: "cash",
    productIDs: ["002"],
    coords: [0.998, 0.8472],
    nonFinite: 0.0,
  },
  {
    date: "2011-11-14T17:29:52Z",
    quantity: 1,
    total: 200,
    tip: 100,
    type: "visa",
    productIDs: ["004"],
    coords: [0.8273, 0.3384],
    nonFinite: 0.0,
  },
];

let payments: any = null;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
beforeEach(() => {
  payments = new Crossfilter(someData);
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("ImmutableTypedCrossfilter", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create crossfilter", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(payments).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(payments.size()).toEqual(someData.length);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(payments.all()).toEqual(someData);

    const p = payments
      .addDimension("quantity", "scalar", (i: any, d: any) => d[i].quantity, Int32Array)
      .select("quantity", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.all()).toEqual(someData);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.size()).toEqual(someData.length);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.isElementSelected(0)).toBeTruthy();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.countSelected()).toEqual(someData.length);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual(someData);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("immutability", () => {
    /*
    the following should return a new crossfilter:
    - addDimension()
    - delDimension()
    - select
    */
    const p2 = payments.addDimension(
      "quantity",
      "scalar",
      (i: any, data: any) => data[i].quantity,
      Int32Array
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(payments).not.toBe(p2);
    const p3 = p2.select("quantity", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p3).not.toBe(p2);

    const p4 = p3.delDimension("quantity");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p4).not.toBe(p3);

    const p5 = p2.renameDimension("quantity", "Quantity");
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p5).not.toBe(p2);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("select all and none", () => {
    let p = payments
      .addDimension("quantity", "scalar", (i: any, d: any) => d[i].quantity, Int32Array)
      .addDimension("tip", "scalar", (i: any, d: any) => d[i].tip, Float32Array)
      .addDimension("total", "scalar", (i: any, d: any) => d[i].total, Float32Array)
      .addDimension("type", "enum", (i: any, d: any) => d[i].type);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p).toBeDefined();

    /* expect all records to be selected - default init state */
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual(someData);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.countSelected()).toEqual(someData.length);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelectedMask()).toEqual(
      new Uint8Array(someData.length).fill(1)
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.fillByIsSelected(new Uint8Array(someData.length), 99, 0)).toEqual(
      new Uint8Array(someData.length).fill(99)
    );
    for (let i = 0; i < someData.length; i += 1) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.isElementSelected(i)).toBeTruthy();
    }

    /* expect a selectAll on one dimension to change nothing */
    p = p.select("tip", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual(someData);

    /* ditto */
    p = p.select("quantity", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual(someData);

    /* select none on one dimension */
    p = p.select("type", { mode: "none" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual([]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.countSelected()).toEqual(0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelectedMask()).toEqual(
      new Uint8Array(someData.length).fill(0)
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.fillByIsSelected(new Uint8Array(someData.length), 99, 0)).toEqual(
      new Uint8Array(someData.length).fill(0)
    );
    for (let i = 0; i < someData.length; i += 1) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.isElementSelected(i)).toBeFalsy();
    }

    p = p.select("quantity", { mode: "none" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual([]);

    // invert the first none; should have no effect because type is
    // still not filtered.
    p = p.select("quantity", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual([]);

    /* select all of type; should select all records */
    p = p.select("type", { mode: "all" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(p.allSelected()).toEqual(someData);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("scalar dimension", () => {
    let p: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      p = payments
        .addDimension("quantity", "scalar", (i: any, d: any) => d[i].quantity, Int32Array)
        .addDimension("tip", "scalar", (i: any, d: any) => d[i].tip, Float32Array)
        .select("tip", { mode: "all" });
    });

    /*
    select modes:  all, none, exact, range
    */
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("quantity", { mode: "all" }).countSelected()).toEqual(
        someData.length
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("none", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("quantity", { mode: "none" }).countSelected()).toEqual(0);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test.each([[[]], [[2]], [[2, 1]], [[9, 82]], [[0, 1]]])("exact: %p", (v: any) => expect(
      p.select("quantity", { mode: "exact", values: v }).countSelected()
    ).toEqual(_.filter(someData, (d: any) => v.includes(d.quantity)).length)
    );
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("single value exact", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("quantity", { mode: "exact", values: 2 }).countSelected()
      ).toEqual(_.filter(someData, (d: any) => d.quantity === 2).length);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test.each([
      [0, 1],
      [1, 2],
      [0, 99],
      [99, 100000],
    ])("range %p", (lo: any, hi: any) =>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("quantity", { mode: "range", lo, hi }).countSelected()
      ).toEqual(
        _.filter(someData, (d: any) => d.quantity >= lo && d.quantity < hi).length
      )
    );
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("bad mode", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => p.select("type", { mode: "bad mode" })).toThrow(Error);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("enum dimension", () => {
    let p: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      p = payments.addDimension("type", "enum", (i: any, d: any) => d[i].type);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("type", { mode: "all" }).countSelected()).toEqual(
        someData.length
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("none", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("type", { mode: "none" }).countSelected()).toEqual(0);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test.each([
      [[]],
      [["tab"]],
      [["visa"]],
      [["visa", "tab"]],
      [["cash", "tab", "visa"]],
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    ])("exact: %p", (v: any) => expect(
      p.select("type", { mode: "exact", values: v }).countSelected()
    ).toEqual(_.filter(someData, (d: any) => v.includes(d.type)).length)
    );
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("single value exact", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("type", { mode: "exact", values: "tab" }).countSelected()
      ).toEqual(_.filter(someData, (d: any) => d.type === "tab").length);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("range", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => p.select("type", { mode: "range", lo: 0, hi: 9 })).toThrow(
        Error
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("bad mode", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => p.select("type", { mode: "bad mode" })).toThrow(Error);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("spatial dimension", () => {
    let p: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      const X = someData.map((r) => r.coords[0]);
      const Y = someData.map((r) => r.coords[1]);
      p = payments.addDimension("coords", "spatial", X, Y);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("coords", { mode: "all" }).countSelected()).toEqual(
        someData.length
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("none", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("coords", { mode: "none" }).countSelected()).toEqual(0);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test.each([
      [0, 0, 1, 1],
      [0, 0, 0.5, 0.5],
      [0.5, 0.5, 1, 1],
    ])("within-rect %d %d %d %d", (minX: any, minY: any, maxX: any, maxY: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("coords", { mode: "within-rect", minX, minY, maxX, maxY })
          .allSelected()
      ).toEqual(
        _.filter(someData, (d: any) => {
          const [x, y] = d.coords;
          return minX <= x && x < maxX && minY <= y && y < maxY;
        })
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test.each([
      [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        [
          true,
          true,
          true,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      ],
      [
        [
          [0, 0],
          [0, 0.5],
          [0.5, 0.5],
          [0.5, 0],
        ],
        [
          true,
          true,
          true,
          true,
          false,
          false,
          false,
          true,
          true,
          true,
          false,
          false,
        ],
      ],
    ])("within-polygon %p", (polygon: any, expected: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("coords", { mode: "within-polygon", polygon }).allSelected()
      ).toEqual(
        _.zip(someData, expected)
          .filter((x: any) => x[1])
          .map((x: any) => x[0])
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("non-finite scalars", () => {
    let p: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      p = payments
        .addDimension("quantity", "scalar", (i: any, d: any) => d[i].quantity, Int32Array)
        .addDimension(
          "nonFinite",
          "scalar",
          (i: any, d: any) => d[i].nonFinite,
          Float32Array
        )
        .select("quantity", { mode: "all" });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("all or none", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("nonFinite", { mode: "all" }).countSelected()).toEqual(
        someData.length
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(p.select("nonFinite", { mode: "none" }).countSelected()).toEqual(
        0
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("exact", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("nonFinite", { mode: "exact", values: [0] }).countSelected()
      ).toEqual(3);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p.select("nonFinite", { mode: "exact", values: [1] }).countSelected()
      ).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "exact",
            values: [Number.POSITIVE_INFINITY],
          })
          .countSelected()
      ).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "exact",
            values: [Number.NEGATIVE_INFINITY],
          })
          .countSelected()
      ).toEqual(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", { mode: "exact", values: [Number.NaN] })
          .countSelected()
      ).toEqual(4);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "exact",
            values: [Number.POSITIVE_INFINITY, 0, 1, 99],
          })
          .countSelected()
      ).toEqual(6);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("range", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "range",
            lo: 0,
            hi: Number.POSITIVE_INFINITY,
          })
          .countSelected()
      ).toEqual(5);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "range",
            lo: 0,
            hi: Number.NaN,
          })
          .countSelected()
      ).toEqual(6);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        p
          .select("nonFinite", {
            mode: "range",
            lo: Number.NEGATIVE_INFINITY,
            hi: Number.POSITIVE_INFINITY,
          })
          .countSelected()
      ).toEqual(7);
    });
  });
});
