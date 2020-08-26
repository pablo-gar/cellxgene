/*
Row crossfilter proxy for an AnnoMatrix.  This wraps Crossfilter,
providing a number of services, and ensuring that the crossfilter and
AnnoMatrix stay in sync:
	- on-demand index creation as data is loaded
	- transparently mapping between queries and crossfilter index names.
  - for mutation of the matrix by user annotations, maintain synchronization
    between Crossfilter and AnnoMatrix.
*/
import Crossfilter from "../util/typedCrossfilter";
import { _getColumnSchema } from "./schema";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
function _dimensionNameFromDf(field, df) {
  const colNames = df.colIndex.labels();
  return _dimensionName(field, colNames);
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
function _dimensionName(field, colNames) {
  if (!Array.isArray(colNames)) return `${field}/${colNames}`;
  return `${field}/${colNames.join(":")}`;
}

export default class AnnoMatrixObsCrossfilter {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'annoMatrix' implicitly has an 'any' typ... Remove this comment to see the full error message
  constructor(annoMatrix, _obsCrossfilter = null) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    this.annoMatrix = annoMatrix;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    this.obsCrossfilter =
      _obsCrossfilter || new Crossfilter(annoMatrix._cache.obs);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    this.obsCrossfilter = this.obsCrossfilter.setData(annoMatrix._cache.obs);
  }

  size() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    return this.obsCrossfilter.size();
  }

  /**
  Managing the associated annoMatrix.  These wrappers are necessary to 
  make coordinated changes to BOTH the crossfilter and annoMatrix, and
  ensure that all state stays synchronized.

  See API documentation in annoMatrix.js.
  **/
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colSchema' implicitly has an 'any' type... Remove this comment to see the full error message
  addObsColumn(colSchema, Ctor, value) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = this.annoMatrix.addObsColumn(colSchema, Ctor, value);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    const obsCrossfilter = this.obsCrossfilter.setData(annoMatrix._cache.obs);
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
  dropObsColumn(col) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = this.annoMatrix.dropObsColumn(col);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    const dimName = _dimensionName("obs", col);
    if (obsCrossfilter.hasDimension(dimName)) {
      obsCrossfilter = obsCrossfilter.delDimension(dimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'oldCol' implicitly has an 'any' type.
  renameObsColumn(oldCol, newCol) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = this.annoMatrix.renameObsColumn(oldCol, newCol);
    const oldDimName = _dimensionName("obs", oldCol);
    const newDimName = _dimensionName("obs", newCol);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    if (obsCrossfilter.hasDimension(oldDimName)) {
      obsCrossfilter = obsCrossfilter.renameDimension(oldDimName, newDimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
  addObsAnnoCategory(col, category) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = this.annoMatrix.addObsAnnoCategory(col, category);
    const dimName = _dimensionName("obs", col);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    if (obsCrossfilter.hasDimension(dimName)) {
      obsCrossfilter = obsCrossfilter.delDimension(dimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
  async removeObsAnnoCategory(col, category, unassignedCategory) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = await this.annoMatrix.removeObsAnnoCategory(
      col,
      category,
      unassignedCategory
    );
    const dimName = _dimensionName("obs", col);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    if (obsCrossfilter.hasDimension(dimName)) {
      obsCrossfilter = obsCrossfilter.delDimension(dimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
  async setObsColumnValues(col, rowLabels, value) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = await this.annoMatrix.setObsColumnValues(
      col,
      rowLabels,
      value
    );
    const dimName = _dimensionName("obs", col);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    if (obsCrossfilter.hasDimension(dimName)) {
      obsCrossfilter = obsCrossfilter.delDimension(dimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
  async resetObsColumnValues(col, oldValue, newValue) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = await this.annoMatrix.resetObsColumnValues(
      col,
      oldValue,
      newValue
    );
    const dimName = _dimensionName("obs", col);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;
    if (obsCrossfilter.hasDimension(dimName)) {
      obsCrossfilter = obsCrossfilter.delDimension(dimName);
    }
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colSchema' implicitly has an 'any' type... Remove this comment to see the full error message
  addEmbedding(colSchema) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const annoMatrix = this.annoMatrix.addEmbedding(colSchema);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    return new AnnoMatrixObsCrossfilter(annoMatrix, this.obsCrossfilter);
  }

  /**
  Selection state - API is identical to ImmutableTypedCrossfilter, as these
  are just wrappers to lazy create indices.
  **/

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
  async select(field, query, spec) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const { annoMatrix } = this;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    let { obsCrossfilter } = this;

    if (!annoMatrix?._cache?.[field]) {
      throw new Error("Unknown field name");
    }
    if (field === "var") {
      throw new Error("unable to obsSelect upon the var dimension");
    }

    // grab the data, so we can grab the index.
    const df = await annoMatrix.fetch(field, query);

    const dimName = _dimensionNameFromDf(field, df);
    if (!obsCrossfilter.hasDimension(dimName)) {
      // lazy index generation - add dimension when first used
      obsCrossfilter = this._addObsCrossfilterDimension(
        annoMatrix,
        obsCrossfilter,
        field,
        df
      );
    }

    // select
    obsCrossfilter = obsCrossfilter.select(dimName, spec);
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  selectAll() {
    /*
		Select all on any dimension in this field.
		*/
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const { annoMatrix } = this;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    const currentDims = this.obsCrossfilter.dimensionNames();
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'xfltr' implicitly has an 'any' type.
    const obsCrossfilter = currentDims.reduce((xfltr, dim) => {
      return xfltr.select(dim, { mode: "all" });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    }, this.obsCrossfilter);
    return new AnnoMatrixObsCrossfilter(annoMatrix, obsCrossfilter);
  }

  countSelected() {
    /* if no data yet indexed in the crossfilter, just say everything is selected */
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    if (this.obsCrossfilter.size() === 0) return this.annoMatrix.nObs;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    return this.obsCrossfilter.countSelected();
  }

  allSelectedMask() {
    /* if no data yet indexed in the crossfilter, just say everything is selected */
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.size() === 0 ||
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.dimensionNames().length === 0
    ) {
      /* fake the mask */
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
      return new Uint8Array(this.annoMatrix.nObs).fill(1);
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    return this.obsCrossfilter.allSelectedMask();
  }

  allSelectedLabels() {
    /* if no data yet indexed in the crossfilter, just say everything is selected */
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.size() === 0 ||
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.dimensionNames().length === 0
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
      return this.annoMatrix.rowIndex.labels();
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    const mask = this.obsCrossfilter.allSelectedMask();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const index = this.annoMatrix.rowIndex.isubsetMask(mask);
    return index.labels();
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'array' implicitly has an 'any' type.
  fillByIsSelected(array, selectedValue, deselectedValue) {
    /* if no data yet indexed in the crossfilter, just say everything is selected */
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.size() === 0 ||
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
      this.obsCrossfilter.dimensionNames().length === 0
    ) {
      return array.fill(selectedValue);
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'obsCrossfilter' does not exist on type '... Remove this comment to see the full error message
    return this.obsCrossfilter.fillByIsSelected(
      array,
      selectedValue,
      deselectedValue
    );
  }

  /**
   ** Private below
   **/

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'annoMatrix' implicitly has an 'any' typ... Remove this comment to see the full error message
  _addObsCrossfilterDimension(annoMatrix, obsCrossfilter, field, df) {
    if (field === "var") return obsCrossfilter;
    const dimName = _dimensionNameFromDf(field, df);
    const dimParams = this._getObsDimensionParams(field, df);
    obsCrossfilter = obsCrossfilter.setData(annoMatrix._cache.obs);
    // @ts-expect-error ts-migrate(2569) FIXME: Type 'any[] | undefined' is not an array type or a... Remove this comment to see the full error message
    obsCrossfilter = obsCrossfilter.addDimension(dimName, ...dimParams);
    return obsCrossfilter;
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
  _getColumnBaseType(field, col) {
    /* Look up the primitive type for this field/col */
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'annoMatrix' does not exist on type 'Anno... Remove this comment to see the full error message
    const colSchema = _getColumnSchema(this.annoMatrix.schema, field, col);
    return colSchema.type;
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
  _getObsDimensionParams(field, df) {
    /* return the crossfilter dimensiontype type and params for this field/dataframe */

    if (field === "emb") {
      /* assumed to be 2D */
      return ["spatial", df.icol(0).asArray(), df.icol(1).asArray()];
    }

    /* assumed to be 1D */
    const col = df.icol(0);
    const colName = df.colIndex.getLabel(0);
    const type = this._getColumnBaseType(field, colName);
    if (type === "string" || type === "categorical" || type === "boolean") {
      return ["enum", col.asArray()];
    }
    if (type === "int32") {
      return ["scalar", col.asArray(), Int32Array];
    }
    if (type === "float32") {
      return ["scalar", col.asArray(), Float32Array];
    }
    // Currently not supporting boolean and categorical types.
    console.error(
      `Warning - unknown metadata schema (${type}) for field ${field} ${colName}.`
    );
    // skip it - we don't know what to do with this type

    return undefined;
  }
}
