// these TWO statements MUST be first in the file, before any other imports
import { enableFetchMocks } from "jest-fetch-mock";
import * as serverMocks from "./serverMocks";
// OK, continue on!

import {
  AnnoMatrixLoader,
  clip,
  isubset,
  isubsetMask,
} from "../../../src/annoMatrix";
import { Dataframe } from "../../../src/util/dataframe";

enableFetchMocks();

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("AnnoMatrix", () => {
  let annoMatrix: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(async () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetMocks' does not exist on type '(inp... Remove this comment to see the full error message
    fetch.resetMocks(); // reset all fetch mocking state
    annoMatrix = new AnnoMatrixLoader(
      serverMocks.baseDataURL,
      serverMocks.schema.schema
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("basics", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("annomatrix static checks", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.schema).toMatchObject(serverMocks.schema.schema);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.nObs).toEqual(serverMocks.schema.schema.dataframe.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.nVar).toEqual(serverMocks.schema.schema.dataframe.nVar);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.isView).toBeFalsy();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.viewOf).toBeUndefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.rowIndex).toBeDefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("simple single column fetch", async () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.annotationsObs(["name_0"]));

      const df = await annoMatrix.fetch("obs", "name_0");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df).toBeInstanceOf(Dataframe);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.colIndex.labels()).toEqual(["name_0"]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(df.dims).toEqual([annoMatrix.nObs, 1]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("simple multi column fetch", async () => {
      fetch
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
        .once(serverMocks.annotationsObs(["name_0"]))
        .once(serverMocks.annotationsObs(["n_genes"]));

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(
        annoMatrix.fetch("obs", ["name_0", "n_genes"])
      ).resolves.toBeInstanceOf(Dataframe);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("fetch from field", () => {
      const getLastTwo = async (field: any) => {
        const columnNames = annoMatrix.getMatrixColumns(field).slice(-2);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockResponses' does not exist on type '(... Remove this comment to see the full error message
        fetch.mockResponses(...columnNames.map(() => serverMocks.responder));
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        await expect(
          annoMatrix.fetch(field, columnNames)
        ).resolves.toBeInstanceOf(Dataframe);
      };

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
      test("obs", async () => getLastTwo("obs"));
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
      test("var", async () => getLastTwo("var"));
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
      test("emb", async () => getLastTwo("emb"));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("fetch - test all query forms", async () => {
      // single string is a column name
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.annotationsObs(["n_genes"]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(annoMatrix.fetch("obs", "n_genes")).resolves.toBeInstanceOf(
        Dataframe
      );

      // array of column names, expecting n_genes to be cached.
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.annotationsObs(["percent_mito"]));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(
        annoMatrix.fetch("obs", ["n_genes", "percent_mito"])
      ).resolves.toBeInstanceOf(Dataframe);

      // more complex value filter query, enumerated
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
      fetch.once(serverMocks.responder);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(
        annoMatrix.fetch("X", {
          field: "var",
          column: annoMatrix.schema.annotations.var.index,
          value: "TYMP",
        })
      ).resolves.toBeInstanceOf(Dataframe);

      // more complex value filter query, range
      const varIndex = annoMatrix.schema.annotations.var.index;
      fetch
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
        .once(
          serverMocks.withExpected("/data/var", [[`var:${varIndex}`, "SUMO3"]])
        )
        .once(
          serverMocks.withExpected("/data/var", [[`var:${varIndex}`, "TYMP"]])
        );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(
        annoMatrix.fetch("X", [
          {
            field: "var",
            column: varIndex,
            value: "SUMO3",
          },
          {
            field: "var",
            column: varIndex,
            value: "TYMP",
          },
        ])
      ).resolves.toBeInstanceOf(Dataframe);
      // XXX inspect the wherecache?
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("push and pop views", async () => {
      const am1 = clip(annoMatrix, 0.1, 0.9);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.viewOf).toBe(annoMatrix);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.nObs).toEqual(annoMatrix.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.nVar).toEqual(annoMatrix.nVar);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.rowIndex).toBe(annoMatrix.rowIndex);

      const am2 = clip(annoMatrix, 0.1, 0.9);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am2.viewOf).toBe(annoMatrix);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am2).not.toBe(am1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am2.rowIndex).toBe(annoMatrix.rowIndex);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("schema accessors", () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.getMatrixFields()).toEqual(
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect.arrayContaining(["X", "obs", "emb", "var"])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.getMatrixColumns("obs")).toEqual(
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect.arrayContaining(["name_0", "n_genes", "louvain"])
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.getColumnSchema("emb", "umap")).toEqual({
        name: "umap",
        dims: ["umap_0", "umap_1"],
        type: "float32",
      });
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(annoMatrix.getColumnDimensions("emb", "umap")).toEqual([
        "umap_0",
        "umap_1",
      ]);
    });

    /*
  	test the mask & label access to subset via isubset and isubsetMask
  	*/
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("isubset", async () => {
      const rowList = [0, 10];
      const rowMask = new Uint8Array(annoMatrix.nObs);
      for (let i = 0; i < rowList.length; i += 1) {
        rowMask[rowList[i]] = 1;
      }

      const am1 = isubset(annoMatrix, rowList);
      const am2 = isubsetMask(annoMatrix, rowMask);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1).not.toBe(am2);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.nObs).toEqual(2);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.nObs).toEqual(am2.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.nVar).toEqual(am2.nVar);

      fetch
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '(input: Re... Remove this comment to see the full error message
        .once(serverMocks.annotationsObs(["n_genes"]))
        .once(serverMocks.annotationsObs(["n_genes"]));
      const ng1 = await am1.fetch("obs", "n_genes");
      const ng2 = await am2.fetch("obs", "n_genes");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(ng1).toHaveLength(ng2.length);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(ng1.colIndex.labels()).toEqual(ng2.colIndex.labels());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(ng1.col("n_genes").asArray()).toEqual(
        ng2.col("n_genes").asArray()
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("add/drop column", () => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base' implicitly has an 'any' type.
    async function addDrop(base) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(base.getMatrixColumns("obs")).not.toContain("foo");
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(base.fetch("obs", "foo")).rejects.toThrow(
        "unknown column name"
      );

      /* add */
      const am1 = base.addObsColumn(
        { name: "foo", type: "float32", writable: true },
        Float32Array,
        0
      );
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(base.getMatrixColumns("obs")).not.toContain("foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.getMatrixColumns("obs")).toContain("foo");
      const foo = await am1.fetch("obs", "foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo).toBeInstanceOf(Dataframe);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo).toHaveLength(am1.nObs);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.col("foo").asArray()).toEqual(
        new Float32Array(am1.nObs).fill(0)
      );

      /* drop */
      const am2 = am1.dropObsColumn("foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(base.getMatrixColumns("obs")).not.toContain("foo");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am2.getMatrixColumns("obs")).not.toContain("foo");
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(am2.fetch("obs", "foo")).rejects.toThrow(
        "unknown column name"
      );
    }

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("add/drop column, without view", async () => {
      await addDrop(annoMatrix);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("add/drop column, with view", async () => {
      const am1 = clip(annoMatrix, 0.1, 0.9);
      await addDrop(am1);

      const am2 = isubset(am1, [0, 1, 2, 20, 30, 400]);
      await addDrop(am2);

      const am3 = isubset(annoMatrix, [10, 0, 7, 3]);
      await addDrop(am3);

      const am4 = clip(am3, 0, 1);
      await addDrop(am4);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockResponse' does not exist on type '(i... Remove this comment to see the full error message
      fetch.mockResponse(serverMocks.responder);

      await am1.fetch("obs", am1.getMatrixColumns("obs"));
      await am2.fetch("obs", am2.getMatrixColumns("obs"));
      await am3.fetch("obs", am3.getMatrixColumns("obs"));
      await am4.fetch("obs", am4.getMatrixColumns("obs"));

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetMocks' does not exist on type '(inp... Remove this comment to see the full error message
      fetch.resetMocks();

      await addDrop(am1);
      await addDrop(am2);
      await addDrop(am3);
      await addDrop(am4);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("setObsColumnValues", () => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'base' implicitly has an 'any' type.
    async function addSetDrop(base) {
      /* add column */
      let am = base.addObsColumn(
        {
          name: "test",
          type: "categorical",
          categories: ["unassigned", "red", "green"],
          writable: true,
        },
        Array,
        "unassigned"
      );

      const testVal = await am.fetch("obs", "test");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(testVal.col("test").asArray()).toEqual(
        new Array(am.nObs).fill("unassigned")
      );

      /* set values in column */
      const whichRows = [1, 2, 10];
      const am1 = await am.setObsColumnValues("test", whichRows, "yo");
      const testVal1 = await am1.fetch("obs", "test");
      const expt = new Array(am1.nObs).fill("unassigned");
      for (let i = 0; i < whichRows.length; i += 1) {
        const offset = am1.rowIndex.getOffset(whichRows[i]);
        expt[offset] = "yo";
      }
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(testVal1).not.toBe(testVal);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(testVal1.col("test").asArray()).toEqual(expt);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.getColumnSchema("obs", "test").type).toBe("categorical");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(am1.getColumnSchema("obs", "test").categories).toEqual(
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect.arrayContaining(["unassigned", "red", "green", "yo"])
      );

      /* drop column */
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRejectOnce' does not exist on type '... Remove this comment to see the full error message
      fetch.mockRejectOnce(new Error("unknown column name"));
      am = am1.dropObsColumn("test");
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      await expect(am.fetch("obs", "test")).rejects.toThrow(
        "unknown column name"
      );
    }

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("set, without a view", async () => {
      await addSetDrop(annoMatrix);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("set, with a view", async () => {
      const am1 = clip(annoMatrix, 0.1, 0.9);
      await addSetDrop(am1);

      const am2 = isubset(am1, [0, 1, 2, 10, 20, 30, 400]);
      await addSetDrop(am2);

      const am3 = isubset(annoMatrix, [10, 1, 0, 30, 2]);
      await addSetDrop(am3);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockResponse' does not exist on type '(i... Remove this comment to see the full error message
      fetch.mockResponse(serverMocks.responder);

      await am1.fetch("obs", am1.getMatrixColumns("obs"));
      await am2.fetch("obs", am2.getMatrixColumns("obs"));
      await am3.fetch("obs", am3.getMatrixColumns("obs"));

      await addSetDrop(am1);
      await addSetDrop(am2);
      await addSetDrop(am3);
    });
  });
});
