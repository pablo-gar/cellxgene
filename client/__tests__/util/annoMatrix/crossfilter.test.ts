// these TWO statements MUST be first in the file, before any other imports
import { enableFetchMocks } from "jest-fetch-mock";
import * as serverMocks from "./serverMocks";
// OK, continue on!

// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './louvain.json'. Consider usin... Remove this comment to see the full error message
import obsLouvain from "./louvain.json";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './n_genes.json'. Consider usin... Remove this comment to see the full error message
import obsNGenes from "./n_genes.json";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './umap.json'. Consider using '... Remove this comment to see the full error message
import embUmap from "./umap.json";

import {
  AnnoMatrixLoader,
  AnnoMatrixObsCrossfilter,
  isubsetMask,
} from "../../../src/annoMatrix";
import { rangeFill } from "../../../src/util/range";

enableFetchMocks();

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("AnnoMatrixCrossfilter", () => {
  let annoMatrix: any;
  let crossfilter: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(async () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetMocks' does not exist on type '(inp... Remove this comment to see the full error message
    fetch.resetMocks(); // reset all fetch mocking state
    annoMatrix = new AnnoMatrixLoader(
      serverMocks.baseDataURL,
      serverMocks.schema.schema
    );
    crossfilter = new AnnoMatrixObsCrossfilter(annoMatrix);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("initial state of crossfilter", () => {
    const { nObs } = annoMatrix;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter).toBeDefined();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.size()).toEqual(nObs);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.annoMatrix).toBe(annoMatrix);

    /* by default, everything should be selected, even if no data in cache */
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.countSelected()).toEqual(nObs);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.allSelectedLabels()).toEqual(
      rangeFill(new Int32Array(nObs))
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.allSelectedMask()).toEqual(new Uint8Array(nObs).fill(1));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(crossfilter.fillByIsSelected(new Uint8Array(nObs), 2, 1)).toEqual(
      new Uint8Array(nObs).fill(2)
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("select", () => {
    /*
    test the selection state via crossfilter proxy
    */

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("select loads index", async () => {
      /*
      Select should transparently load/create dimension index.

      Internal dimension names are field/col:col:col..., eg,

        obs:louvain
        emb:umap_0:umap_1

      */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(crossfilter.obsCrossfilter.dimensionNames()).toEqual([]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        crossfilter.obsCrossfilter.hasDimension("obs/louvain")
      ).toBeFalsy();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.dataframeResponse(["louvain"], [obsLouvain]));
      let newCrossfilter = await crossfilter.select("obs", "louvain", {
        mode: "none",
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(newCrossfilter.countSelected()).toEqual(0);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        newCrossfilter.obsCrossfilter.hasDimension("obs/louvain")
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(fetch.mock.calls).toHaveLength(1);

      newCrossfilter = await crossfilter.select("obs", "louvain", {
        mode: "all",
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(newCrossfilter.countSelected()).toEqual(annoMatrix.nObs);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("simple column select", async () => {
      let xfltr;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.dataframeResponse(["louvain"], [obsLouvain]));
      xfltr = await crossfilter.select("obs", "louvain", {
        mode: "exact",
        values: ["NK cells", "B cells"],
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(496);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.allSelectedMask()).toEqual(
        Uint8Array.from(
          obsLouvain.map((val: any) => val === "NK cells" || val === "B cells" ? 1 : 0
          )
        )
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.allSelectedLabels()).toEqual(
        Int32Array.from(
          obsLouvain.reduce((acc: any, val: any, idx: any) => {
            if (val === "NK cells" || val === "B cells") acc.push(idx);
            return acc;
          }, [])
        )
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        xfltr.fillByIsSelected(new Uint8Array(annoMatrix.nObs), 3, 1)
      ).toEqual(
        Uint8Array.from(
          obsLouvain.map((val: any) => val === "NK cells" || val === "B cells" ? 3 : 1
          )
        )
      );

      const df = await annoMatrix.fetch("obs", "louvain");
      const values = df.col("louvain").asArray();
      const selected = xfltr.allSelectedMask();
      values.every(
        (val: any, idx: any) => !["NK cells", "B cells"].includes(val) !== !selected[idx]
      );

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(
        serverMocks.dataframeResponse(["n_genes"], [new Int32Array(obsNGenes)])
      );
      xfltr = await xfltr.select("obs", "n_genes", {
        mode: "range",
        lo: 0,
        hi: 500,
        inclusive: false,
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(33);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.allSelectedLabels()).toEqual(
        Int32Array.from(
          obsNGenes.reduce((acc: any, val: any, idx: any) => {
            const louvain = obsLouvain[idx];
            if (
              val >= 0 &&
              val < 500 &&
              (louvain === "NK cells" || louvain === "B cells")
            )
              acc.push(idx);
            return acc;
          }, [])
        )
      );

      xfltr = await xfltr.selectAll();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(annoMatrix.nObs);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("join column select", async () => {
      const varIndex = annoMatrix.schema.annotations.var.index;

      const { nObs } = annoMatrix.schema.dataframe;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(
        serverMocks.dataframeResponse(
          ["TEST"],
          [rangeFill(new Float32Array(nObs), 0, 0.1)]
        )
      );

      const xfltr = await crossfilter.select(
        "X",
        {
          field: "var",
          column: varIndex,
          value: "TYMP",
        },
        {
          mode: "range",
          lo: 0,
          hi: 50,
          inclusive: true,
        }
      );

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(501);

      const df = await annoMatrix.fetch("X", {
        field: "var",
        column: varIndex,
        value: "TYMP",
      });
      const values = df.icol(0).asArray();
      const selected = xfltr.allSelectedMask();
      values.every((val: any, idx: any) => !(val >= 0 && val <= 50) !== !selected[idx]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(selected.reduce((acc: any, val: any) => (val ? acc + 1 : acc), 0)).toEqual(
        xfltr.countSelected()
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("spatial column select", async () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(
        serverMocks.dataframeResponse(
          ["umap_0", "umap_1"],
          [Float32Array.from(embUmap[0]), Float32Array.from(embUmap[1])]
        )
      );
      const xfltr = await crossfilter.select("emb", "umap", {
        mode: "within-rect",
        minX: 0,
        minY: 0,
        maxX: 0.5,
        maxY: 0.5,
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(16);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("select on subset", async () => {
      const mask = new Uint8Array(annoMatrix.nObs).fill(0);
      for (let i = 0; i < mask.length; i += 2) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'true' is not assignable to type 'number'.
        mask[i] = true;
      }
      const annoMatrixSubset = isubsetMask(annoMatrix, mask);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrixSubset.nObs).toEqual(Math.floor(annoMatrix.nObs / 2));

      let xfltr = new AnnoMatrixObsCrossfilter(annoMatrixSubset);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(annoMatrixSubset.nObs);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.dataframeResponse(["louvain"], [obsLouvain]));
      xfltr = await xfltr.select("obs", "louvain", {
        mode: "exact",
        values: ["NK cells", "B cells"],
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(240);

      const df = await annoMatrixSubset.fetch("obs", "louvain");
      const values = df.col("louvain").asArray();
      const selected = xfltr.allSelectedMask();
      values.every(
        (val: any, idx: any) => !["NK cells", "B cells"].includes(val) !== !selected[idx]
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("select catches errors", async () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(crossfilter.select("NADA", "foo")).rejects.toThrow(
        "Unknown field name"
      );

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(crossfilter.select("var", "foo")).rejects.toThrow(
        "unable to obsSelect upon the var dimension"
      );

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(crossfilter.select("obs", "foo")).rejects.toThrow(
        "unknown column name"
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("mutate matrix", () => {
    /*
    test the matrix mutators via crossfilter proxy
    */
    async function helperAddTestCol(cf: any, colName: any, colSchema = null) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        cf.annoMatrix.getMatrixColumns("obs").includes(colName)
      ).toBeFalsy();

      if (colSchema === null) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; type: string; categories: strin... Remove this comment to see the full error message
        colSchema = {
          name: colName,
          type: "categorical",
          categories: ["toasty"],
        };
      }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      colSchema.name = colName;
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      const initValue = colSchema.categories[0];
      const xfltr = cf.addObsColumn(colSchema, Array, initValue);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        xfltr.annoMatrix.schema.annotations.obs.columns.filter(
          (v: any) => v.name === colName
        )
      ).toHaveLength(1);
      const df = await xfltr.annoMatrix.fetch("obs", colName);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.hasCol(colName)).toBeTruthy();
      return xfltr;
    }

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("addObsColumn", async () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(crossfilter.countSelected()).toBe(annoMatrix.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        crossfilter.annoMatrix.getMatrixColumns("obs").includes("foo")
      ).toBeFalsy();
      const xfltr = crossfilter.addObsColumn(
        { name: "foo", type: "categorical", categories: ["A"] },
        Array,
        "A"
      );

      // check schema updates correctly.
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toBe(annoMatrix.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        xfltr.annoMatrix.getMatrixColumns("obs").includes("foo")
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.schema.annotations.obsByName.foo).toMatchObject({
        name: "foo",
        type: "categorical",
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        xfltr.annoMatrix.schema.annotations.obs.columns.filter(
          (v: any) => v.name === "foo"
        )
      ).toHaveLength(1);

      // check data update.
      const df = await xfltr.annoMatrix.fetch("obs", "foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        df
          .col("foo")
          .asArray()
          .every((v: any) => v === "A")
      ).toBeTruthy();

      // check that we catch dups
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        xfltr.addObsColumn(
          { name: "foo", type: "categorical" },
          Array,
          "toasty"
        )
      ).toThrow("column already exists");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        xfltr.addObsColumn(
          { name: "louvain", type: "categorical" },
          Array,
          "toasty"
        )
      ).toThrow("column already exists");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("dropObsColumn", async () => {
      let xfltr;

      /* check that we catch attempt to drop readonly dimension */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => crossfilter.dropObsColumn("louvain")).toThrow(
        "Unknown or readonly obs column"
      );
      /* non-existent column */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => crossfilter.dropObsColumn("does-not-exist")).toThrow(
        "Unknown or readonly obs column"
      );

      // add a column, then drop it.
      xfltr = await helperAddTestCol(crossfilter, "foo");
      xfltr = xfltr.dropObsColumn("foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        xfltr.annoMatrix.schema.annotations.obs.columns.filter(
          (v: any) => v.name === "foo"
        )
      ).toHaveLength(0);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.schema.annotations.obsByName.foo).toBeUndefined();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(xfltr.annoMatrix.fetch("obs", "foo")).rejects.toThrow(
        "unknown column name"
      );

      // now same, but ensure we have built an index before doing the drop
      xfltr = await helperAddTestCol(crossfilter, "bar");
      xfltr = await xfltr.select("obs", "bar", {
        mode: "exact",
        values: "whatever",
      });
      xfltr = xfltr.dropObsColumn("bar");

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(xfltr.select("obs", "bar", { mode: "all" })).rejects.toThrow(
        "unknown column name"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("renameObsColumn", async () => {
      let xfltr;

      /* catch attempts to rename non-existent or readonly columns */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        crossfilter.renameObsColumn("does-not-exist", "foo")
      ).toThrow("Unknown or readonly obs column");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => crossfilter.renameObsColumn("louvain", "foo")).toThrow(
        "Unknown or readonly obs column"
      );

      // add a column, then rename it.
      xfltr = await helperAddTestCol(crossfilter, "foo");
      xfltr = xfltr.renameObsColumn("foo", "bar");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.getColumnSchema("obs", "foo")).toBeUndefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.getColumnSchema("obs", "bar")).toMatchObject({
        name: "bar",
        type: "categorical",
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(xfltr.annoMatrix.fetch("obs", "foo")).rejects.toThrow(
        "unknown column name"
      );
      const df = await xfltr.annoMatrix.fetch("obs", "bar");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.hasCol("bar")).toBeTruthy();

      // now same, but ensure we have built an index before doing the rename
      xfltr = await helperAddTestCol(crossfilter, "bar");
      xfltr = await xfltr.select("obs", "bar", {
        mode: "exact",
        values: "whatever",
      });
      xfltr = xfltr.renameObsColumn("bar", "xyz");

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(xfltr.select("obs", "bar", { mode: "all" })).rejects.toThrow(
        "unknown column name"
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(
        xfltr.select("obs", "xyz", { mode: "none" })
      ).resolves.toBeInstanceOf(AnnoMatrixObsCrossfilter);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("addObsAnnoCategory", async () => {
      let xfltr: any;

      // catch unknown or readonly columns
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => crossfilter.addObsAnnoCategory("louvain", "mumble")).toThrow(
        "Unknown or readonly obs column"
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() =>
        crossfilter.addObsAnnoCategory("undefined-name", "mumble")
      ).toThrow("Unknown or readonly obs column");

      // add a column and then add category to it
      // @ts-expect-error ts-migrate(2345) FIXME: Type '{ name: string; type: string; categories: st... Remove this comment to see the full error message
      xfltr = await helperAddTestCol(crossfilter, "foo", {
        name: "foo",
        type: "categorical",
        categories: ["unassigned"],
      });
      xfltr = xfltr.addObsAnnoCategory("foo", "a-new-label");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining(["a-new-label", "unassigned"]),
      });

      // do it again, dup; should throw
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => xfltr.addObsAnnoCategory("foo", "a-new-label")).toThrow(
        "category already exists"
      );

      // now same, but ensure we have built an index before doing the operation
      // @ts-expect-error ts-migrate(2345) FIXME: Type '{ name: string; type: string; categories: st... Remove this comment to see the full error message
      xfltr = await helperAddTestCol(crossfilter, "bar", {
        name: "bar",
        type: "categorical",
        categories: ["unassigned"],
      });
      xfltr = await xfltr.select("obs", "bar", {
        mode: "exact",
        values: "something",
      });
      xfltr = xfltr.addObsAnnoCategory("bar", "a-new-label");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.getColumnSchema("obs", "bar")).toMatchObject({
        name: "bar",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining(["a-new-label", "unassigned"]),
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("removeObsAnnoCategory", async () => {
      let xfltr;

      // catch unknown or readonly categories
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.removeObsAnnoCategory("louvain", "mumble", "unassigned")
      ).rejects.toThrow("Unknown or readonly obs column");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.removeObsAnnoCategory("undefined-name", "mumble")
      ).rejects.toThrow("Unknown or readonly obs column");

      // @ts-expect-error ts-migrate(2345) FIXME: Type '{ name: string; type: string; categories: st... Remove this comment to see the full error message
      xfltr = await helperAddTestCol(crossfilter, "foo", {
        name: "foo",
        type: "categorical",
        categories: ["unassigned", "red", "green", "blue"],
      });
      xfltr = await xfltr.select("obs", "foo", { mode: "all" });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .every((v: any) => v === "unassigned")
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining([
          "unassigned",
          "red",
          "green",
          "blue",
        ]),
      });

      // remove an unused category
      const xfltr1 = await xfltr.removeObsAnnoCategory("foo", "red", "mumble");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr1.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .every((v: any) => v === "unassigned")
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr1.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining([
          "unassigned",
          "green",
          "blue",
          "mumble",
        ]),
      });

      // remove a used category
      const xfltr2 = await xfltr.removeObsAnnoCategory(
        "foo",
        "unassigned",
        "red"
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr2.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .every((v: any) => v === "red")
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr2.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining(["green", "blue", "red"]),
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("setObsColumnValues", async () => {
      // catch unknown or readonly categories
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.setObsColumnValues("louvain", [0, 1], "unassigned")
      ).rejects.toThrow("Unknown or readonly obs column");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.setObsColumnValues("undefined-name", [0], "mumble")
      ).rejects.toThrow("Unknown or readonly obs column");

      // @ts-expect-error ts-migrate(2345) FIXME: Type '{ name: string; type: string; categories: st... Remove this comment to see the full error message
      let xfltr = await helperAddTestCol(crossfilter, "foo", {
        name: "foo",
        type: "categorical",
        categories: ["unassigned", "red", "green", "blue"],
      });
      xfltr = await xfltr.select("obs", "foo", { mode: "all" });

      // catch unknown row label
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        xfltr.setObsColumnValues("foo", [-1], "red")
      ).rejects.toThrow("Unknown row label");

      // set a few rows
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .every((v: any) => v === "unassigned")
      ).toBeTruthy();
      const xfltr1 = await xfltr.setObsColumnValues("foo", [0, 10], "purple");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr1.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .every(
            (v: any, i: any) =>
              v === "unassigned" || (v === "purple" && (i === 0 || i === 10))
          )
      ).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr1.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining([
          "unassigned",
          "red",
          "green",
          "blue",
          "purple",
        ]),
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr1.countSelected()).toEqual(xfltr1.annoMatrix.nObs);
      const xfltr2 = await xfltr1.select("obs", "foo", {
        mode: "exact",
        values: ["purple"],
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr2.countSelected()).toEqual(2);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr2.allSelectedLabels()).toEqual(Int32Array.from([0, 10]));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("resetObsColumnValues", async () => {
      // catch unknown or readonly categories
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.resetObsColumnValues("louvain", "red", "blue")
      ).rejects.toThrow("Unknown or readonly obs column");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        crossfilter.resetObsColumnValues("undefined-name", "red", "blue")
      ).rejects.toThrow("Unknown or readonly obs column");

      // @ts-expect-error ts-migrate(2345) FIXME: Type '{ name: string; type: string; categories: st... Remove this comment to see the full error message
      let xfltr = await helperAddTestCol(crossfilter, "foo", {
        name: "foo",
        type: "categorical",
        categories: ["unassigned", "red", "green", "blue"],
      });
      xfltr = await xfltr.select("obs", "foo", {
        mode: "exact",
        values: "red",
      });

      // catch unknown category name label
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(() =>
        xfltr.resetObsColumnValues("foo", "unknown-label", "red")
      ).rejects.toThrow("unknown category");

      let xfltr1 = await xfltr.setObsColumnValues("foo", [0, 10], "purple");
      xfltr1 = await xfltr1.select("obs", "foo", {
        mode: "exact",
        values: "purple",
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr1.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .filter((v: any) => v === "purple")
      ).toHaveLength(2);

      xfltr1 = await xfltr1.resetObsColumnValues("foo", "purple", "magenta");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr1.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .filter((v: any) => v === "magenta")
      ).toHaveLength(2);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(
        (await xfltr1.annoMatrix.fetch("obs", "foo"))
          .col("foo")
          .asArray()
          .filter((v: any) => v === "purple")
      ).toHaveLength(0);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr1.annoMatrix.getColumnSchema("obs", "foo")).toMatchObject({
        name: "foo",
        type: "categorical",
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        categories: expect.arrayContaining([
          "unassigned",
          "red",
          "green",
          "blue",
          "purple",
          "magenta",
        ]),
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("edge cases", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("transition from empty annoMatrix", async () => {
      // select before fetch needs to work
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.dataframeResponse(["louvain"], [obsLouvain]));
      const xfltr = await crossfilter.select("obs", "louvain", {
        mode: "exact",
        values: "B cells",
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(fetch.mock.calls).toHaveLength(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.obsCrossfilter.hasDimension("obs/louvain")).toBeTruthy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.obsCrossfilter.all()).toBe(xfltr.annoMatrix._cache.obs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(xfltr.countSelected()).toEqual(
        obsLouvain.reduce(
          (count: any, v: any) => (v === "B cells" ? count + 1 : count),
          0
        )
      );
    });
  });
});
