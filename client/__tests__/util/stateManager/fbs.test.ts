/*
test FBS encode/decode API
*/
import { Dataframe, KeyIndex } from "../../../src/util/dataframe";
import {
  decodeMatrixFBS,
  encodeMatrixFBS,
} from "../../../src/util/stateManager/matrix";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("encode/decode", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("round trip", () => {
    const columns = [
      ["red", "green", "blue"],
      new Int32Array(3).fill(0),
      new Uint32Array(3).fill(1),
      new Float32Array(3).fill(2),
    ];

    const dfNoColIdx = new Dataframe([3, 4], columns);
    const dfA = decodeMatrixFBS(encodeMatrixFBS(dfNoColIdx));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect([dfA.nRows, dfA.nCols]).toEqual(dfNoColIdx.dims);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.colIdx).toBeNull();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.rowIdx).toBeNull();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfA.columns).toEqual(columns);

    const colIndex = new KeyIndex(["a", "b", "c", "d"]);
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'KeyIndex' is not assignable to type 'null'.
    const dfWithColIdx = new Dataframe([3, 4], columns, null, colIndex);
    const dfB = decodeMatrixFBS(encodeMatrixFBS(dfWithColIdx));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect([dfB.nRows, dfB.nCols]).toEqual(dfWithColIdx.dims);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.colIdx).toEqual(colIndex.labels());
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.rowIdx).toBeNull();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(dfB.columns).toEqual(columns);
  });
});
