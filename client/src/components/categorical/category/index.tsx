// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React, { useRef, useEffect } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect, shallowEqual } from "react-redux";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { AnchorButton, Button, Tooltip, Position } from "@blueprintjs/core";
import { Flipper, Flipped } from "react-flip-toolkit";
import Async from "react-async";
import memoize from "memoize-one";

// @ts-expect-error ts-migrate(6142) FIXME: Module '../value' was resolved to '/Users/sbadajoz... Remove this comment to see the full error message
import Value from "../value";
// @ts-expect-error ts-migrate(6142) FIXME: Module './annoMenuCategory' was resolved to '/User... Remove this comment to see the full error message
import AnnoMenu from "./annoMenuCategory";
// @ts-expect-error ts-migrate(6142) FIXME: Module './annoDialogEditCategoryName' was resolved... Remove this comment to see the full error message
import AnnoDialogEditCategoryName from "./annoDialogEditCategoryName";
// @ts-expect-error ts-migrate(6142) FIXME: Module './annoDialogAddLabel' was resolved to '/Us... Remove this comment to see the full error message
import AnnoDialogAddLabel from "./annoDialogAddLabel";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../util/truncate' was resolved to '/Use... Remove this comment to see the full error message
import Truncate from "../../util/truncate";
import { CategoryCrossfilterContext } from "../categoryContext";

import * as globals from "../../../globals";
import { createCategorySummaryFromDfCol } from "../../../util/stateManager/controlsHelpers";
import {
  createColorTable,
  createColorQuery,
} from "../../../util/stateManager/colorHelpers";
import actions from "../../../actions";

const LABEL_WIDTH = globals.leftSidebarWidth - 100;
const ANNO_BUTTON_WIDTH = 50;
const LABEL_WIDTH_ANNO = LABEL_WIDTH - ANNO_BUTTON_WIDTH;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state, ownProps) => {
  const schema = state.annoMatrix?.schema;
  const { metadataField } = ownProps;
  const isUserAnno = schema?.annotations?.obsByName[metadataField]?.writable;
  const categoricalSelection = state.categoricalSelection?.[metadataField];
  return {
    colors: state.colors,
    categoricalSelection,
    annotations: state.annotations,
    annoMatrix: state.annoMatrix,
    schema,
    crossfilter: state.obsCrossfilter,
    isUserAnno,
  };
})
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Category extends React.PureComponent {
  props: any;
  static getSelectionState(
    categoricalSelection: any,
    metadataField: any,
    categorySummary: any
  ) {
    // total number of categories in this dimension
    const totalCatCount = categorySummary.numCategoryValues;
    // number of selected options in this category
    const selectedCatCount = categorySummary.categoryValues.reduce(
      (res: any, label: any) => (categoricalSelection.get(label) ?? true ? res + 1 : res),
      0
    );
    return selectedCatCount === totalCatCount
      ? "all"
      : selectedCatCount === 0
      ? "none"
      : "some";
  }

  static watchAsync(props: any, prevProps: any) {
    return !shallowEqual(props.watchProps, prevProps.watchProps);
  }

  createCategorySummaryFromDfCol = memoize(createCategorySummaryFromDfCol);

  getSelectionState(categorySummary: any) {
    const { categoricalSelection, metadataField } = this.props;
    return Category.getSelectionState(
      categoricalSelection,
      metadataField,
      categorySummary
    );
  }

  handleColorChange = () => {
    const { dispatch, metadataField } = this.props;
    dispatch({
      type: "color by categorical metadata",
      colorAccessor: metadataField,
    });
  };

  handleCategoryClick = () => {
    const { annotations, metadataField, onExpansionChange } = this.props;
    const editingCategory =
      annotations.isEditingCategoryName &&
      annotations.categoryBeingEdited === metadataField;
    if (!editingCategory) {
      onExpansionChange(metadataField);
    }
  };

  handleCategoryKeyPress = (e: any) => {
    if (e.key === "Enter") {
      this.handleCategoryClick();
    }
  };

  handleToggleAllClick = (categorySummary: any) => {
    const isChecked = this.getSelectionState(categorySummary);
    if (isChecked === "all") {
      this.toggleNone(categorySummary);
    } else {
      this.toggleAll(categorySummary);
    }
  };

  fetchAsyncProps = async (props: any) => {
    const { annoMatrix, metadataField, colors } = props.watchProps;
    const { crossfilter } = this.props;

    const [categoryData, categorySummary, colorData] = await this.fetchData(
      annoMatrix,
      metadataField,
      colors
    );

    return {
      categoryData,
      categorySummary,
      colorData,
      crossfilter,
      ...this.updateColorTable(colorData),
      handleCategoryToggleAllClick: () =>
        this.handleToggleAllClick(categorySummary),
    };
  };

  async fetchData(annoMatrix: any, metadataField: any, colors: any) {
    /*
    fetch our data and the color-by data if appropriate, and then build a summary
    of our category and a color table for the color-by annotation.
    */
    const { schema } = annoMatrix;
    const { colorAccessor, colorMode } = colors;
    let colorDataPromise = Promise.resolve(null);
    if (colorAccessor) {
      const query = createColorQuery(colorMode, colorAccessor, schema);
      if (query) colorDataPromise = annoMatrix.fetch(...query);
    }
    const [categoryData, colorData] = await Promise.all([
      annoMatrix.fetch("obs", metadataField),
      colorDataPromise,
    ]);

    // our data
    const column = categoryData.icol(0);
    const colSchema = schema.annotations.obsByName[metadataField];
    const categorySummary = this.createCategorySummaryFromDfCol(
      column,
      colSchema
    );
    return [categoryData, categorySummary, colorData];
  }

  updateColorTable(colorData: any) {
    // color table, which may be null
    const { schema, colors, metadataField } = this.props;
    const { colorAccessor, userColors, colorMode } = colors;
    return {
      isColorAccessor: colorAccessor === metadataField,
      colorAccessor,
      colorMode,
      colorTable: createColorTable(
        colorMode,
        colorAccessor,
        colorData,
        schema,
        userColors
      ),
    };
  }

  toggleNone(categorySummary: any) {
    const { dispatch, metadataField } = this.props;
    dispatch(
      actions.selectCategoricalAllMetadataAction(
        "categorical metadata filter none of these",
        metadataField,
        categorySummary.allCategoryValues,
        false
      )
    );
  }

  toggleAll(categorySummary: any) {
    const { dispatch, metadataField } = this.props;
    dispatch(
      actions.selectCategoricalAllMetadataAction(
        "categorical metadata filter all of these",
        metadataField,
        categorySummary.allCategoryValues,
        true
      )
    );
  }

  render() {
    const {
      metadataField,
      isExpanded,
      categoricalSelection,
      crossfilter,
      colors,
      annoMatrix,
      isUserAnno,
    } = this.props;

    const checkboxID = `category-select-${metadataField}`;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <CategoryCrossfilterContext.Provider value={crossfilter}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Async
          watchFn={Category.watchAsync}
          promiseFn={this.fetchAsyncProps}
          watchProps={{
            metadataField,
            annoMatrix,
            categoricalSelection,
            colors,
          }}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Async.Pending initial>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StillLoading
              metadataField={metadataField}
              checkboxID={checkboxID}
            />
          </Async.Pending>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Async.Rejected>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {(error: any) => <ErrorLoading metadataField={metadataField} error={error} />}
          </Async.Rejected>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Async.Fulfilled persist>
            {(asyncProps: any) => {
              const {
                colorAccessor,
                colorTable,
                colorData,
                categoryData,
                categorySummary,
                isColorAccessor,
                handleCategoryToggleAllClick,
              } = asyncProps;
              const isTruncated = !!categorySummary?.isTruncated;
              const selectionState = this.getSelectionState(categorySummary);
              return (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <CategoryRender
                  metadataField={metadataField}
                  checkboxID={checkboxID}
                  isUserAnno={isUserAnno}
                  isTruncated={isTruncated}
                  isExpanded={isExpanded}
                  isColorAccessor={isColorAccessor}
                  selectionState={selectionState}
                  categoryData={categoryData}
                  categorySummary={categorySummary}
                  colorAccessor={colorAccessor}
                  colorData={colorData}
                  colorTable={colorTable}
                  onColorChangeClick={this.handleColorChange}
                  onCategoryToggleAllClick={handleCategoryToggleAllClick}
                  onCategoryMenuClick={this.handleCategoryClick}
                  onCategoryMenuKeyPress={this.handleCategoryKeyPress}
                />
              );
            }}
          </Async.Fulfilled>
        </Async>
      </CategoryCrossfilterContext.Provider>
    );
  }
}

export default Category;

const StillLoading = ({
  metadataField,
  checkboxID
}: any) => {
  /*
  We are still loading this category, so render a "busy" signal.
  */
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div
      style={{
        maxWidth: globals.maxControlsWidth,
      }}
    >
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <label htmlFor={checkboxID} className="bp3-control bp3-checkbox">
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <input disabled id={checkboxID} checked type="checkbox" />
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span className="bp3-control-indicator" />
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </label>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Truncate>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span
              style={{
                cursor: "pointer",
                display: "inline-block",
                width: LABEL_WIDTH,
              }}
            >
              {metadataField}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </span>
          </Truncate>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button minimal loading intent="primary" />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
};

const ErrorLoading = ({
  metadataField,
  error
}: any) => {
  console.error(error); // log error to console as it is unexpected.
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div style={{ marginBottom: 10, marginTop: 4 }}>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <span
        style={{
          cursor: "pointer",
          display: "inline-block",
          width: LABEL_WIDTH,
          fontStyle: "italic",
        }}
      >
        {`Failure loading ${metadataField}`}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </span>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
};

const CategoryHeader = React.memo(
  ({
    metadataField,
    checkboxID,
    isUserAnno,
    isTruncated,
    isColorAccessor,
    isExpanded,
    selectionState,
    onColorChangeClick,
    onCategoryMenuClick,
    onCategoryMenuKeyPress,
    onCategoryToggleAllClick
  }: any) => {
    /*
    Render category name and controls (eg, color-by button).
    */
    const checkboxRef = useRef(null);

    useEffect(() => {
      checkboxRef.current.indeterminate = selectionState === "some";
    }, [checkboxRef.current, selectionState]);

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <label className="bp3-control bp3-checkbox" htmlFor={checkboxID}>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <input
              id={checkboxID}
              data-testclass="category-select"
              data-testid={`${metadataField}:category-select`}
              onChange={onCategoryToggleAllClick}
              ref={checkboxRef}
              checked={selectionState === "all"}
              type="checkbox"
            />
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span className="bp3-control-indicator" />
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </label>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span
            role="menuitem"
            tabIndex="0"
            data-testclass="category-expand"
            data-testid={`${metadataField}:category-expand`}
            onKeyPress={onCategoryMenuKeyPress}
            style={{
              cursor: "pointer",
            }}
            onClick={onCategoryMenuClick}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Truncate>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <span
                style={{
                  maxWidth: isUserAnno ? LABEL_WIDTH_ANNO : LABEL_WIDTH,
                }}
                data-testid={`${metadataField}:category-label`}
              >
                {metadataField}
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </span>
            </Truncate>
            {isExpanded ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <FaChevronDown
                data-testclass="category-expand-is-expanded"
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'style' does not exist on type 'IconBaseP... Remove this comment to see the full error message
                style={{ fontSize: 10, marginLeft: 5 }}
              />
            ) : (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <FaChevronRight
                data-testclass="category-expand-is-not-expanded"
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'style' does not exist on type 'IconBaseP... Remove this comment to see the full error message
                style={{ fontSize: 10, marginLeft: 5 }}
              />
            )}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {<AnnoDialogEditCategoryName metadataField={metadataField} />}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {<AnnoDialogAddLabel metadataField={metadataField} />}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AnnoMenu
            metadataField={metadataField}
            isUserAnno={isUserAnno}
            createText="Add a new label to this category"
            editText="Edit this category's name"
            deleteText="Delete this category, all associated labels, and remove all cell assignments"
          />

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Tooltip
            content={
              isTruncated
                ? `Coloring by ${metadataField} is disabled, as it exceeds the limit of ${globals.maxCategoricalOptionsToDisplay} labels`
                : "Use as color scale"
            }
            position={Position.LEFT}
            usePortal
            hoverOpenDelay={globals.tooltipHoverOpenDelay}
            modifiers={{
              preventOverflow: { enabled: false },
              hide: { enabled: false },
            }}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AnchorButton
              data-testclass="colorby"
              data-testid={`colorby-${metadataField}`}
              onClick={onColorChangeClick}
              active={isColorAccessor}
              intent={isColorAccessor ? "primary" : "none"}
              disabled={isTruncated}
              icon="tint"
            />
          </Tooltip>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      </>
    );
  }
);

const CategoryRender = React.memo(
  ({
    metadataField,
    checkboxID,
    isUserAnno,
    isTruncated,
    isColorAccessor,
    isExpanded,
    selectionState,
    categoryData,
    categorySummary,
    colorAccessor,
    colorData,
    colorTable,
    onColorChangeClick,
    onCategoryMenuClick,
    onCategoryMenuKeyPress,
    onCategoryToggleAllClick
  }: any) => {
    /*
    Render the core of the category, including checkboxes, controls, etc.
    */
    const { numCategoryValues } = categorySummary;
    const isSingularValue = !isUserAnno && numCategoryValues === 1;

    if (isSingularValue) {
      /*
      Entire category has a single value, special case.
      */
      const theOneValue = categorySummary.categoryValues[0];
      return (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div style={{ marginBottom: 10, marginTop: 4 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Truncate>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span style={{ maxWidth: 150, fontWeight: 700 }}>
              {metadataField}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </span>
          </Truncate>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Truncate>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span style={{ maxWidth: 150 }}>{`: ${theOneValue}`}</span>
          </Truncate>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      );
    }

    /*
    Otherwise, our normal multi-layout layout
    */
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        style={{
          maxWidth: globals.maxControlsWidth,
        }}
        data-testclass="category"
        data-testid={`category-${metadataField}`}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <CategoryHeader
            metadataField={metadataField}
            checkboxID={checkboxID}
            isUserAnno={isUserAnno}
            isTruncated={isTruncated}
            isExpanded={isExpanded}
            isColorAccessor={isColorAccessor}
            selectionState={selectionState}
            onColorChangeClick={onColorChangeClick}
            onCategoryToggleAllClick={onCategoryToggleAllClick}
            onCategoryMenuClick={onCategoryMenuClick}
            onCategoryMenuKeyPress={onCategoryMenuKeyPress}
          />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div style={{ marginLeft: 26 }}>
          {
            /* values*/
            isExpanded ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <CategoryValueList
                isUserAnno={isUserAnno}
                metadataField={metadataField}
                categoryData={categoryData}
                categorySummary={categorySummary}
                colorAccessor={colorAccessor}
                colorData={colorData}
                colorTable={colorTable}
              />
            ) : null
          }
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div>
          {isExpanded && isTruncated ? (
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <p style={{ paddingLeft: 15 }}>... truncated list ...</p>
          ) : null}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
);

const CategoryValueList = React.memo(
  ({
    isUserAnno,
    metadataField,
    categoryData,
    categorySummary,
    colorAccessor,
    colorData,
    colorTable
  }: any) => {
    const tuples = [...categorySummary.categoryValueIndices];

    /*
    Render the value list.  If this is a user annotation, we use a flipper
    animation, if read-only, we don't bother and save a few bits of perf.
    */
    if (!isUserAnno) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          {tuples.map(([value, index]) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Value
              key={value}
              isUserAnno={isUserAnno}
              metadataField={metadataField}
              categoryIndex={index}
              categoryData={categoryData}
              categorySummary={categorySummary}
              colorAccessor={colorAccessor}
              colorData={colorData}
              colorTable={colorTable}
            />
          ))}
        </>
      );
    }

    /* User annotation */
    const flipKey = tuples.map((t) => t[0]).join("");
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Flipper flipKey={flipKey}>
        {tuples.map(([value, index]) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Flipped key={value} flipId={value}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Value
              isUserAnno={isUserAnno}
              metadataField={metadataField}
              categoryIndex={index}
              categoryData={categoryData}
              categorySummary={categorySummary}
              colorAccessor={colorAccessor}
              colorData={colorData}
              colorTable={colorTable}
            />
          </Flipped>
        ))}
      </Flipper>
    );
  }
);
