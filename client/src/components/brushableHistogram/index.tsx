/*
https://bl.ocks.org/mbostock/4341954
https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
https://bl.ocks.org/SpaceActuary/2f004899ea1b2bd78d6f1dbb2febf771
https://bl.ocks.org/mbostock/3019563
*/
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, ButtonGroup, Tooltip } from "@blueprintjs/core";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/d3` if it exists or add a ... Remove this comment to see the full error message
import * as d3 from "d3";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/d3-scale-chromatic` if it ... Remove this comment to see the full error message
import { interpolateCool } from "d3-scale-chromatic";
import Async from "react-async";
import memoize from "memoize-one";
import * as globals from "../../globals";
import actions from "../../actions";
import { histogramContinuous } from "../../util/dataframe/histogram";
import { makeContinuousDimensionName } from "../../util/nameCreators";
import significantDigits from "../../util/significantDigits";

function clamp(val: any, rng: any) {
  return Math.max(Math.min(val, rng[1]), rng[0]);
}

function maybeScientific(x: any) {
  let format = ",";
  const _ticks = x.ticks(4);

  if (x.domain().some((n: any) => Math.abs(n) >= 10000)) {
    /* 
      heuristic: if the last tick d3 wants to render has one significant
      digit ie., 2000, render 2e+3, but if it's anything else ie., 42000000 render
      4.20e+n
    */
    format = significantDigits(_ticks[_ticks.length - 1]) === 1 ? ".0e" : ".2e";
  }

  return format;
}

const StillLoading = ({
  zebra,
  displayName
}: any) => {
  /*
  Render a loading indicator for the field.
  */
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div
      style={{
        padding: globals.leftSidebarSectionPadding,
        backgroundColor: zebra ? globals.lightestGrey : "white",
      }}
    >
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div style={{ minWidth: 30 }} />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div style={{ display: "flex", alignSelf: "center" }}>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span style={{ fontStyle: "italic" }}>{displayName}</span>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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
  displayName,
  error,
  zebra
}: any) => {
  console.log(error); // log to console as this is unexpected
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div
      style={{
        padding: globals.leftSidebarSectionPadding,
        backgroundColor: zebra ? globals.lightestGrey : "white",
      }}
    >
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <span>{`Failure loading ${displayName}`}</span>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
};

const HistogramFooter = React.memo(
  ({
    displayName,
    hideRanges,
    rangeMin,
    rangeMax,
    rangeColorMin,
    rangeColorMax,
    logFoldChange,
    pvalAdj
  }: any) => {
    /*
  Footer of each histogram.  Will render range, title, and optionally 
  differential expression info.

  Required props:
    * displayName - the displayName, aka "n_genes", "FOXP2", etc.
    * hideRanges - true/false, enables/disable rendering of ranges
    * range - length two array, [min, max], containing the range values to display
    * rangeColor - length two array, [mincolor, maxcolor], each a CSS color
    * logFoldChange - lfc to display, optional.
    * pValue - pValue to display, optional.
  */
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            display: "flex",
            justifyContent: hideRanges ? "center" : "space-between",
          }}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span
            style={{
              color: rangeColorMin,
              display: hideRanges ? "none" : "block",
            }}
          >
            min {rangeMin.toPrecision(4)}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span
            data-testclass="brushable-histogram-field-name"
            style={{ fontStyle: "italic" }}
          >
            {displayName}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div style={{ display: hideRanges ? "block" : "none" }}>
            : {rangeMin}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span
            style={{
              color: rangeColorMax,
              display: hideRanges ? "none" : "block",
            }}
          >
            max {rangeMax.toPrecision(4)}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>

        {logFoldChange && pvalAdj ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <strong>log fold change:</strong>
              {` ${logFoldChange.toPrecision(4)}`}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </span>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span
              style={{
                marginLeft: 7,
                padding: 2,
              }}
            >
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <strong>p-value (adj):</strong>
              {pvalAdj < 0.0001 ? " < 0.0001" : ` ${pvalAdj.toFixed(4)}`}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </span>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        ) : null}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
);

const HistogramHeader = React.memo(
  ({
    fieldId,
    isColorBy,
    onColorByClick,
    onRemoveClick,
    isScatterPlotX,
    isScatterPlotY,
    onScatterPlotXClick,
    onScatterPlotYClick,
    isObs
  }: any) => {
    /*
      Render the toolbar for the histogram.  Props:
        * fieldId - field identifier, used for various IDs
        * isColorBy - true/false, is this the current color-by
        * onColorByClick - color-by click handler
        * onRemoveClick - optional handler for remove.  Button will not render if not defined.
        * isScatterPlotX - optional, true/false if currently the X scatterplot field
        * isScatterPlotY - optional, true/false if currently the Y scatterplot field
        * onScatterPlotXClick - optional, handler for scatterPlot X button.
        * onScatterPlotYClick - optional, handler for scatterPlot X button.

      Scatterplot controls will not render if either handler unspecified.
    */

    const memoizedColorByCallback = useCallback(
      () => onColorByClick(fieldId, isObs),
      [fieldId, isObs]
    );

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "8px",
        }}
      >
        {onScatterPlotXClick && onScatterPlotYClick ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <span
              style={{ marginRight: 7 }}
              className="bp3-icon-standard bp3-icon-scatter-plot"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ButtonGroup style={{ marginRight: 7 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                data-testid={`plot-x-${fieldId}`}
                onClick={onScatterPlotXClick}
                active={isScatterPlotX}
                intent={isScatterPlotX ? "primary" : "none"}
              >
                plot x
              </Button>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                data-testid={`plot-y-${fieldId}`}
                onClick={onScatterPlotYClick}
                active={isScatterPlotY}
                intent={isScatterPlotY ? "primary" : "none"}
              >
                plot y
              </Button>
            </ButtonGroup>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
        ) : null}
        {onRemoveClick ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button
            minimal
            onClick={onRemoveClick}
            style={{
              color: globals.blue,
              cursor: "pointer",
              marginLeft: 7,
            }}
          >
            remove
          </Button>
        ) : null}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Tooltip
          content="Use as color scale"
          position="bottom"
          hoverOpenDelay={globals.tooltipHoverOpenDelay}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            onClick={memoizedColorByCallback}
            active={isColorBy}
            intent={isColorBy ? "primary" : "none"}
            data-testclass="colorby"
            data-testid={`colorby-${fieldId}`}
            icon="tint"
          />
        </Tooltip>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
);

const Histogram = ({
  field,
  fieldForId,
  display,
  histogram,
  width,
  height,
  onBrush,
  onBrushEnd,
  margin,
  isColorBy,
  selectionRange
}: any) => {
  const svgRef = useRef(null);
  const [brush, setBrush] = useState(null);

  useEffect(() => {
    /*
    Create the d3 histogram
    */
    const { marginLeft, marginRight, marginBottom, marginTop } = margin;
    const { x, y, bins, binStart, binEnd, binWidth } = histogram;
    const svg = d3.select(svgRef.current);

    /* Remove everything */
    svg.selectAll("*").remove();

    /* Set margins within the SVG */
    const container = svg
      .attr("width", width + marginLeft + marginRight)
      .attr("height", height + marginTop + marginBottom)
      .append("g")
      .attr("class", "histogram-container")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    const colorScale = d3
      .scaleSequential(interpolateCool)
      .domain([0, bins.length]);

    const histogramScale = d3
      .scaleLinear()
      .domain(x.domain())
      .range([
        colorScale.domain()[1],
        colorScale.domain()[0],
      ]); /* we flip this to make colors dark if high in the color scale */

    if (binWidth > 0) {
      /* BINS */
      container
        .insert("g", "*")
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", (d: any, i: any) => x(binStart(i)) + 1)
        .attr("y", (d: any) => y(d))
        .attr("width", (d: any, i: any) => x(binEnd(i)) - x(binStart(i)) - 1)
        .attr("height", (d: any) => y(0) - y(d))
        .style(
          "fill",
          isColorBy ? (d: any, i: any) => colorScale(histogramScale(binStart(i))) : "#bbb"
        );
    }

    // BRUSH
    // Note the brushable area is bounded by the data on three sides, but goes down to cover the x-axis
    const brushX = d3
      .brushX()
      .extent([
        [x.range()[0], y.range()[1]],
        [x.range()[1], marginTop + height + marginBottom],
      ])
      /*
      emit start so that the Undoable history can save an undo point
      upon drag start, and ignore the subsequent intermediate drag events.
      */
      .on("start", onBrush(field, x.invert, "start"))
      .on("brush", onBrush(field, x.invert, "brush"))
      .on("end", onBrushEnd(field, x.invert));

    const brushXselection = container
      .insert("g")
      .attr("class", "brush")
      .attr("data-testid", `${svgRef.current.dataset.testid}-brushable-area`)
      .call(brushX);

    /* X AXIS */
    container
      .insert("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${marginTop + height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(4)
          .tickFormat(d3.format(maybeScientific(x)))
      );

    /* Y AXIS */
    container
      .insert("g")
      .attr("class", "axis axis--y")
      .attr("transform", `translate(${marginLeft + width},0)`)
      .call(
        d3
          .axisRight(y)
          .ticks(3)
          .tickFormat(
            d3.format(
              y.domain().some((n: any) => Math.abs(n) >= 10000) ? ".0e" : ","
            )
          )
      );

    /* axis style */
    svg.selectAll(".axis text").style("fill", "rgb(80,80,80)");
    svg.selectAll(".axis path").style("stroke", "rgb(230,230,230)");
    svg.selectAll(".axis line").style("stroke", "rgb(230,230,230)");

    setBrush({ brushX, brushXselection });
  }, [histogram, isColorBy]);

  useEffect(() => {
    /*
    paint/update selection brush
    */
    if (!brush) return;
    const { brushX, brushXselection } = brush;
    const selection = d3.brushSelection(brushXselection.node());
    if (!selectionRange && selection) {
      /* no active selection - clear brush */
      brushXselection.call(brushX.move, null);
    } else if (selectionRange) {
      const { x, domain } = histogram;
      const [min, max] = domain;
      const x0 = x(clamp(selectionRange[0], [min, max]));
      const x1 = x(clamp(selectionRange[1], [min, max]));
      if (!selection) {
        /* there is an active selection, but no brush - set the brush */
        brushXselection.call(brushX.move, [x0, x1]);
      } else {
        /* there is an active selection and a brush - make sure they match */
        const moveDeltaThreshold = 1;
        const dX0 = Math.abs(x0 - selection[0]);
        const dX1 = Math.abs(x1 - selection[1]);
        /*
        only update the brush if it is grossly incorrect,
        as defined by the moveDeltaThreshold
        */
        if (dX0 > moveDeltaThreshold || dX1 > moveDeltaThreshold) {
          brushXselection.call(brushX.move, [x0, x1]);
        }
      }
    }
  }, [brush, selectionRange]);

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <svg
      style={{ display }}
      width={width}
      height={height}
      id={`histogram_${fieldForId}_svg`}
      data-testclass="histogram-plot"
      data-testid={`histogram-${field}-plot`}
      ref={svgRef}
    />
  );
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state, ownProps) => {
  const { isObs, isUserDefined, isDiffExp, field } = ownProps;
  const myName = makeContinuousDimensionName(
    { isObs, isUserDefined, isDiffExp },
    field
  );
  return {
    annoMatrix: state.annoMatrix,
    isScatterplotXXaccessor: state.controls.scatterplotXXaccessor === field,
    isScatterplotYYaccessor: state.controls.scatterplotYYaccessor === field,
    continuousSelectionRange: state.continuousSelection[myName],
    isColorAccessor: state.colors.colorAccessor === field,
  };
})
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class HistogramBrush extends React.PureComponent {
  height: any;
  margin: any;
  props: any;
  width: any;
  /* memoized closure to prevent HistogramHeader unecessary repaint */
  handleColorAction = memoize((dispatch) => (field: any, isObs: any) => {
    if (isObs) {
      dispatch({
        type: "color by continuous metadata",
        colorAccessor: field,
      });
    } else {
      dispatch(actions.requestSingleGeneExpressionCountsForColoringPOST(field));
    }
  });

  constructor(props: any) {
    super(props);

    const marginLeft = 10; // Space for 0 tick label on X axis
    const marginRight = 54; // space for Y axis & labels
    const marginBottom = 25; // space for X axis & labels
    const marginTop = 3;
    this.margin = {
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
    };
    this.width = 340 - marginLeft - marginRight;
    this.height = 135 - marginTop - marginBottom;
  }

  onBrush = (selection: any, x: any, eventType: any) => {
    const type = `continuous metadata histogram ${eventType}`;
    return () => {
      const { dispatch, field, isObs, isUserDefined, isDiffExp } = this.props;

      // ignore programmatically generated events
      if (!d3.event.sourceEvent) return;
      // ignore cascading events, which are programmatically generated
      if (d3.event.sourceEvent.sourceEvent) return;

      const query = this.createQuery();
      const range = d3.event.selection
        ? [x(d3.event.selection[0]), x(d3.event.selection[1])]
        : null;
      const otherProps = {
        selection: field,
        continuousNamespace: {
          isObs,
          isUserDefined,
          isDiffExp,
        },
      };
      dispatch(
        actions.selectContinuousMetadataAction(type, query, range, otherProps)
      );
    };
  };

  onBrushEnd = (selection: any, x: any) => {
    return () => {
      const { dispatch, field, isObs, isUserDefined, isDiffExp } = this.props;
      const minAllowedBrushSize = 10;
      const smallAmountToAvoidInfiniteLoop = 0.1;

      // ignore programmatically generated events
      if (!d3.event.sourceEvent) return;
      // ignore cascading events, which are programmatically generated
      if (d3.event.sourceEvent.sourceEvent) return;

      let type;
      let range = null;
      if (d3.event.selection) {
        type = "continuous metadata histogram end";
        if (
          d3.event.selection[1] - d3.event.selection[0] >
          minAllowedBrushSize
        ) {
          range = [x(d3.event.selection[0]), x(d3.event.selection[1])];
        } else {
          /* the user selected range is too small and will be hidden #587, so take control of it procedurally */
          /* https://stackoverflow.com/questions/12354729/d3-js-limit-size-of-brush */

          const procedurallyResizedBrushWidth =
            d3.event.selection[0] +
            minAllowedBrushSize +
            smallAmountToAvoidInfiniteLoop; //

          range = [x(d3.event.selection[0]), x(procedurallyResizedBrushWidth)];
        }
      } else {
        type = "continuous metadata histogram cancel";
      }

      const query = this.createQuery();
      const otherProps = {
        selection: field,
        continuousNamespace: {
          isObs,
          isUserDefined,
          isDiffExp,
        },
      };
      dispatch(
        actions.selectContinuousMetadataAction(type, query, range, otherProps)
      );
    };
  };

  handleSetGeneAsScatterplotX = () => {
    const { dispatch, field } = this.props;
    dispatch({
      type: "set scatterplot x",
      data: field,
    });
  };

  handleSetGeneAsScatterplotY = () => {
    const { dispatch, field } = this.props;
    dispatch({
      type: "set scatterplot y",
      data: field,
    });
  };

  removeHistogram = () => {
    const {
      dispatch,
      field,
      isColorAccessor,
      isScatterplotXXaccessor,
      isScatterplotYYaccessor,
    } = this.props;
    dispatch({
      type: "clear user defined gene",
      data: field,
    });
    if (isColorAccessor) {
      dispatch({
        type: "reset colorscale",
      });
    }
    if (isScatterplotXXaccessor) {
      dispatch({
        type: "set scatterplot x",
        data: null,
      });
    }
    if (isScatterplotYYaccessor) {
      dispatch({
        type: "set scatterplot y",
        data: null,
      });
    }
  };

  fetchAsyncProps = async () => {
    const { annoMatrix } = this.props;
    const { isClipped } = annoMatrix;

    const query = this.createQuery();
    // @ts-expect-error ts-migrate(2569) FIXME: Type 'any[] | null' is not an array type or a stri... Remove this comment to see the full error message
    const df = await annoMatrix.fetch(...query);
    const column = df.icol(0);

    // if we are clipped, fetch both our value and our unclipped value,
    // as we need the absolute min/max range, not just the clipped min/max.
    const summary = column.summarize();
    const range = [summary.min, summary.max];

    let unclippedRange = [...range];
    if (isClipped) {
      // @ts-expect-error ts-migrate(2569) FIXME: Type 'any[] | null' is not an array type or a stri... Remove this comment to see the full error message
      const parent = await annoMatrix.viewOf.fetch(...query);
      const { min, max } = parent.icol(0).summarize();
      unclippedRange = [min, max];
    }

    const unclippedRangeColor = [
      !annoMatrix.isClipped || annoMatrix.clipRange[0] === 0
        ? "#bbb"
        : globals.blue,
      !annoMatrix.isClipped || annoMatrix.clipRange[1] === 1
        ? "#bbb"
        : globals.blue,
    ];

    const histogram = this.calcHistogramCache(
      column,
      this.margin,
      this.width,
      this.height
    );

    const isSingleValue = summary.min === summary.max;
    const nonFiniteExtent =
      summary.min === undefined ||
      summary.max === undefined ||
      Number.isNaN(summary.min) ||
      Number.isNaN(summary.max);

    const OK2Render = !summary.categorical && !nonFiniteExtent;

    return {
      histogram,
      range,
      unclippedRange,
      unclippedRangeColor,
      isSingleValue,
      OK2Render,
    };
  };

  // eslint-disable-next-line class-methods-use-this -- instance method allows for memoization per annotation
  calcHistogramCache(col: any, margin: any, width: any, height: any) {
    /*
     recalculate expensive stuff, notably bins, summaries, etc.
    */
    const histogramCache = {};
    const summary = col.summarize();
    const { min: domainMin, max: domainMax } = summary;
    const numBins = 40;
    const { marginTop, marginLeft } = margin;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'domain' does not exist on type '{}'.
    histogramCache.domain = [domainMin, domainMax];

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'x' does not exist on type '{}'.
    histogramCache.x = d3
      .scaleLinear()
      .domain([domainMin, domainMax])
      .range([marginLeft, marginLeft + width]);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bins' does not exist on type '{}'.
    histogramCache.bins = histogramContinuous(col, numBins, [
      domainMin,
      domainMax,
    ]);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'binWidth' does not exist on type '{}'.
    histogramCache.binWidth = (domainMax - domainMin) / numBins;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'binStart' does not exist on type '{}'.
    histogramCache.binStart = (i: any) => domainMin + i * histogramCache.binWidth;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'binEnd' does not exist on type '{}'.
    histogramCache.binEnd = (i: any) => domainMin + (i + 1) * histogramCache.binWidth;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bins' does not exist on type '{}'.
    const yMax = histogramCache.bins.reduce((l: any, r: any) => (l > r ? l : r));

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'y' does not exist on type '{}'.
    histogramCache.y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([marginTop + height, marginTop]);

    return histogramCache;
  }

  createQuery() {
    const { isObs, field, annoMatrix } = this.props;
    const { schema } = annoMatrix;
    if (isObs) {
      return ["obs", field];
    }
    const varIndex = schema?.annotations?.var?.index;
    if (!varIndex) return null;
    return [
      "X",
      {
        field: "var",
        column: varIndex,
        value: field,
      },
    ];
  }

  render() {
    const {
      dispatch,
      annoMatrix,
      field,
      isColorAccessor,
      isUserDefined,
      isDiffExp,
      logFoldChange,
      pvalAdj,
      isScatterplotXXaccessor,
      isScatterplotYYaccessor,
      zebra,
      continuousSelectionRange,
      isObs,
    } = this.props;
    const fieldForId = field.replace(/\s/g, "_");
    const showScatterPlot = isDiffExp || isUserDefined;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Async watch={annoMatrix} promiseFn={this.fetchAsyncProps}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Async.Pending initial>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <StillLoading displayName={field} zebra={zebra} />
        </Async.Pending>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Async.Rejected>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {(error: any) => <ErrorLoading zebra={zebra} error={error} displayName={field} />}
        </Async.Rejected>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Async.Fulfilled>
          {(asyncProps: any) => asyncProps.OK2Render ? (
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div
              id={`histogram_${fieldForId}`}
              data-testid={`histogram-${field}`}
              data-testclass={
                isDiffExp
                  ? "histogram-diffexp"
                  : isUserDefined
                  ? "histogram-user-gene"
                  : "histogram-continuous-metadata"
              }
              style={{
                padding: globals.leftSidebarSectionPadding,
                backgroundColor: zebra ? globals.lightestGrey : "white",
              }}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <HistogramHeader
                fieldId={field}
                isColorBy={isColorAccessor}
                isObs={isObs}
                onColorByClick={this.handleColorAction(dispatch)}
                onRemoveClick={isUserDefined ? this.removeHistogram : null}
                isScatterPlotX={isScatterplotXXaccessor}
                isScatterPlotY={isScatterplotYYaccessor}
                onScatterPlotXClick={
                  showScatterPlot ? this.handleSetGeneAsScatterplotX : null
                }
                onScatterPlotYClick={
                  showScatterPlot ? this.handleSetGeneAsScatterplotY : null
                }
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Histogram
                field={field}
                fieldForId={fieldForId}
                display={asyncProps.isSingleValue ? "none" : "block"}
                histogram={asyncProps.histogram}
                width={this.width}
                height={this.height}
                onBrush={this.onBrush}
                onBrushEnd={this.onBrushEnd}
                margin={this.margin}
                isColorBy={isColorAccessor}
                selectionRange={continuousSelectionRange}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <HistogramFooter
                displayName={field}
                hideRanges={asyncProps.isSingleValue}
                rangeMin={asyncProps.unclippedRange[0]}
                rangeMax={asyncProps.unclippedRange[1]}
                rangeColorMin={asyncProps.unclippedRangeColor[0]}
                rangeColorMax={asyncProps.unclippedRangeColor[1]}
                logFoldChange={logFoldChange}
                pvalAdj={pvalAdj}
              />
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          ) : null
          }
        </Async.Fulfilled>
      </Async>
    );
  }
}

export default HistogramBrush;
