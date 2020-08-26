/*
Private support functions.

Support for a "where" query, eg,

	{ where: { field: "var", column: "gene", value: "FOXP2" }}

These evaluate to a given column label.

The "where cache" is a map that saves evaluated queries and points 
to the column label they resolve to.

Data structure, using X as the example field being queried, and var as
the index.

{ 
	X: {
		var: Map(
			column_label_in_var => Map(value_in_var_column => [column_label_in_X, ...])
		)
	}
}
*/
import { _getColumnDimensionNames } from "./schema";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'whereCache' implicitly has an 'any' typ... Remove this comment to see the full error message
export function _whereCacheGet(whereCache, schema, field, query) {
  /* 
	query will either be an where query (object) or a column name (string).

	Return array of column labels or undefined.
	*/

  if (typeof query === "object") {
    const { field: queryField, column: queryColumn, value: queryValue } = query;

    const columnMap = whereCache?.[field]?.[queryField];
    if (columnMap === undefined) return [undefined];

    const valueMap = columnMap.get(queryColumn);
    if (valueMap === undefined) return [undefined];

    const columnLabels = valueMap.get(queryValue);
    return columnLabels === undefined ? [undefined] : columnLabels;
  }

  const colDims = _getColumnDimensionNames(schema, field, query);
  return colDims === undefined ? [undefined] : colDims;
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
export function _whereCacheCreate(field, query, columnLabels) {
  /*
	Create a new whereCache
	*/
  if (typeof query !== "object") return null;

  const { field: queryField, column: queryColumn, value: queryValue } = query;
  const whereCache = {
    [field]: {
      [queryField]: new Map([
        [queryColumn, new Map([[queryValue, columnLabels]])],
      ]),
    },
  };
  return whereCache;
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dst' implicitly has an 'any' type.
function __whereCacheMerge(dst, src) {
  /*
	merge src into dst (modifies dst)
	*/
  if (!dst) dst = {};
  if (!src || typeof src !== "object") return dst;
  Object.entries(src).forEach(([field, query]) => {
    if (!Object.prototype.hasOwnProperty.call(dst, field)) dst[field] = {};
    // @ts-expect-error ts-migrate(2769) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    Object.entries(query).forEach(([queryField, columnMap]) => {
      if (!Object.prototype.hasOwnProperty.call(dst[field], queryField))
        dst[field][queryField] = new Map();
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      columnMap.forEach((valueMap, queryColumn) => {
        if (!dst[field][queryField].has(queryColumn))
          dst[field][queryField].set(queryColumn, new Map());
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnLabels' implicitly has an 'any' t... Remove this comment to see the full error message
        valueMap.forEach((columnLabels, queryValue) => {
          dst[field][queryField].get(queryColumn).set(queryValue, columnLabels);
        });
      });
    });
  });
  return dst;
}

// @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'caches' implicitly has an 'any[]' ... Remove this comment to see the full error message
export function _whereCacheMerge(...caches) {
  return caches.reduce((dst, src) => __whereCacheMerge(dst, src), {});
}
