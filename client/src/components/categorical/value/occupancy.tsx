// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/d3` if it exists or add a ... Remove this comment to see the full error message
import * as d3 from "d3";
import {
  Popover,
  PopoverInteractionKind,
  Position,
  Classes,
} from "@blueprintjs/core";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  schema: state.annoMatrix?.schema,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Occupancy extends React.PureComponent {
  canvas: any;
  props: any;
  _WIDTH = 100;

  _HEIGHT = 11;

  createHistogram = () => {
    /* 
      Knowing that colorScale is based off continous data, 
      createHistogram fetches the continous data in relation to the cells releveant to the catagory value.
      It then seperates that data into 50 bins for drawing the mini-histogram
    */
    const {
      metadataField,
      categoryData,
      colorData,
      categoryValue,
    } = this.props;

    if (!this.canvas) return;

    const groupBy = categoryData.col(metadataField);
    const col = colorData.icol(0);
    const range = col.summarize();

    const histogramMap = col.histogram(
      50,
      [range.min, range.max],
      groupBy
    ); /* Because the signature changes we really need different names for histogram to differentiate signatures  */

    const bins = histogramMap.has(categoryValue)
      ? histogramMap.get(categoryValue)
      : new Array(50).fill(0);

    const xScale = d3
      .scaleLinear()
      .domain([0, bins.length])
      .range([0, this._WIDTH]);

    const largestBin = Math.max(...bins);

    const yScale = d3
      .scaleLinear()
      .domain([0, largestBin])
      .range([0, this._HEIGHT]);

    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "#000";

    let x;
    let y;

    const rectWidth = this._WIDTH / bins.length;

    for (let i = 0, { length } = bins; i < length; i += 1) {
      x = xScale(i);
      y = yScale(bins[i]);
      ctx.fillRect(x, this._HEIGHT - y, rectWidth, y);
    }
  };

  createOccupancyStack = () => {
    /* 
      Knowing that the color scale is based off of catagorical data, 
      createOccupancyStack obtains a map showing the number if cells per colored value
      Using the colorScale a stack of colored bars is drawn representing the map
     */
    const {
      metadataField,
      categoryData,
      colorAccessor,
      categoryValue,
      colorTable,
      schema,
      colorData,
    } = this.props;
    const { scale: colorScale } = colorTable;

    const ctx = this.canvas?.getContext("2d");

    if (!ctx) return;

    const groupBy = categoryData.col(metadataField);
    const occupancyMap = colorData
      .col(colorAccessor)
      .histogramCategorical(groupBy);

    const occupancy = occupancyMap.get(categoryValue);

    if (occupancy && occupancy.size > 0) {
      // not all categories have occupancy, so occupancy may be undefined.
      const x = d3
        .scaleLinear()
        /* get all the keys d[1] as an array, then find the sum */
        .domain([0, d3.sum(Array.from(occupancy.values()))])
        .range([0, this._WIDTH]);
      const categories =
        schema.annotations.obsByName[colorAccessor]?.categories;

      let currentOffset = 0;
      const dfColumn = colorData.col(colorAccessor);
      const categoryValues = dfColumn.summarizeCategorical().categories;

      let o;
      let scaledValue;
      let value;

      for (let i = 0, { length } = categoryValues; i < length; i += 1) {
        value = categoryValues[i];
        o = occupancy.get(value);
        scaledValue = x(o);
        ctx.fillStyle = o
          ? colorScale(categories.indexOf(value))
          : "rgb(255,255,255)";
        ctx.fillRect(currentOffset, 0, o ? scaledValue : 0, this._HEIGHT);
        currentOffset += o ? scaledValue : 0;
      }
    }
  };

  render() {
    const { colorAccessor, categoryValue, colorByIsCategorical } = this.props;
    const { canvas } = this;
    if (canvas)
      canvas.getContext("2d").clearRect(0, 0, this._WIDTH, this._HEIGHT);

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Popover
        interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
        hoverOpenDelay={1500}
        hoverCloseDelay={200}
        position={Position.LEFT}
        modifiers={{
          preventOverflow: { enabled: false },
          hide: { enabled: false },
        }}
        lazy
        usePortal
        disabled={colorByIsCategorical}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <canvas
          className="bp3-popover-targer"
          style={{
            marginRight: 5,
            width: this._WIDTH,
            height: this._HEIGHT,
            borderBottom: colorByIsCategorical
              ? ""
              : "solid rgb(230, 230, 230) 0.25px",
          }}
          width={this._WIDTH}
          height={this._HEIGHT}
          ref={(ref: any) => {
            this.canvas = ref;
            if (colorByIsCategorical) this.createOccupancyStack();
            else this.createHistogram();
          }}
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div key="text" style={{ fontSize: "14px" }}>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <p style={{ margin: "0" }}>
            This histograms shows the distribution of{" "}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <strong>{colorAccessor}</strong> within{" "}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <strong>{categoryValue}</strong>.
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <br />
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <br />
            The x axis is the same for each histogram, while the y axis is
            scaled to the largest bin within this histogram instead of the
            largest bin within the whole category.
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </p>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      </Popover>
    );
  }
}

export default Occupancy;
