// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import {
  Popover,
  PopoverInteractionKind,
  Position,
  Classes,
} from "@blueprintjs/core";

export default class MiniHistogram extends React.PureComponent {
  canvasRef: any;
  props: any;
  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
  }

  drawHistogram = () => {
    const { xScale, yScale, bins, width, height } = this.props;

    if (!bins) return;

    const ctx = this.canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#000";

    let x;
    let y;

    const rectWidth = width / bins.length;

    for (let i = 0, { length } = bins; i < length; i += 1) {
      x = xScale(i);
      y = yScale(bins[i]);
      ctx.fillRect(x, height - y, rectWidth, y);
    }
  };

  componentDidMount = () => {
    this.drawHistogram();
  };

  componentDidUpdate = (prevProps: any) => {
    const { obsOrVarContinuousFieldDisplayName, bins } = this.props;
    if (
      prevProps.obsOrVarContinuousFieldDisplayName !==
        obsOrVarContinuousFieldDisplayName ||
      prevProps.bins !== bins
    )
      this.drawHistogram();
  };

  render() {
    const {
      domainLabel,
      obsOrVarContinuousFieldDisplayName,
      width,
      height,
    } = this.props;

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
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <canvas
          className="bp3-popover-targer"
          style={{
            marginRight: 5,
            width,
            height,
            borderBottom: "solid rgb(230, 230, 230) 0.25px",
          }}
          width={width}
          height={height}
          ref={this.canvasRef}
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div key="text" style={{ fontSize: "14px" }}>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <p style={{ margin: "0" }}>
            This histograms shows the distribution of{" "}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <strong>{obsOrVarContinuousFieldDisplayName}</strong> within{" "}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <strong>{domainLabel}</strong>.
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
