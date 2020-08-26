// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";

import calcCentroid from "../../src/util/centroid";
import quantile from "../../src/util/quantile";
import { matrixFBSToDataframe } from "../../src/util/stateManager/matrix";
import * as REST from "./stateManager/sampleResponses";
import { indexEntireSchema } from "../../src/util/stateManager/schemaHelpers";
import { _normalizeCategoricalSchema } from "../../src/annoMatrix/schema";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("centroid", () => {
  let schema: any;
  let obsAnnotations: any;
  let obsLayout: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeAll'.
  beforeAll(() => {
    schema = indexEntireSchema(_.cloneDeep(REST.schema.schema));
    obsAnnotations = matrixFBSToDataframe(REST.annotationsObs);
    obsLayout = matrixFBSToDataframe(REST.layoutObs);

    _normalizeCategoricalSchema(
      schema.annotations.obsByName.field3,
      obsAnnotations.col("field3")
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("field4 (categorical obsAnnotation)", () => {
    const centroidResult = calcCentroid(
      schema,
      "field4",
      obsAnnotations,
      { current: "umap", currentDimNames: ["umap_0", "umap_1"] },
      obsLayout
    );

    // Check to see that a centroid has been calculated for every categorical value
    const keysAsArray = Array.from(centroidResult.keys());
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(keysAsArray).toEqual(
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect.arrayContaining([83, true, "foo", 2.222222])
    );

    // This expected result assumes that all cells belong in all categorical values inside of sample response
    const expectedResult = [
      quantile([0.5], obsLayout.col("umap_0").asArray())[0],
      quantile([0.5], obsLayout.col("umap_1").asArray())[0],
    ];

    centroidResult.forEach((coordinate: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(coordinate).toEqual(expectedResult);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("field3 (boolean obsAnnotation)", () => {
    const centroidResult = calcCentroid(
      schema,
      "field3",
      obsAnnotations,
      { current: "umap", currentDimNames: ["umap_0", "umap_1"] },
      obsLayout
    );

    // Check to see that a centroid has been calculated for every categorical value
    const keysAsArray = Array.from(centroidResult.keys());
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(keysAsArray).toEqual(expect.arrayContaining([false, true]));

    // This expected result assumes that all cells belong in all categorical values inside of sample response
    const expectedResult = [
      quantile([0.5], obsLayout.col("umap_0").asArray())[0],
      quantile([0.5], obsLayout.col("umap_1").asArray())[0],
    ];

    centroidResult.forEach((coordinate: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(coordinate).toEqual(expectedResult);
    });
  });
});
