// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import {
  Position,
  Button,
  Popover,
  NumericInput,
  Icon,
  Tooltip,
} from "@blueprintjs/core";
import { tooltipHoverOpenDelay } from "../../globals";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";

const Clip = React.memo((props: any) => {
  const {
    pendingClipPercentiles,
    clipPercentileMin,
    clipPercentileMax,
    handleClipOpening,
    handleClipClosing,
    handleClipCommit,
    isClipDisabled,
    handleClipOnKeyPress,
    handleClipPercentileMaxValueChange,
    handleClipPercentileMinValueChange,
  } = props;

  const clipMin =
    pendingClipPercentiles?.clipPercentileMin ?? clipPercentileMin;
  const clipMax =
    pendingClipPercentiles?.clipPercentileMax ?? clipPercentileMax;
  const activeClipClass =
    clipPercentileMin > 0 || clipPercentileMax < 100
      ? " bp3-intent-warning"
      : "";

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={`bp3-button-group ${styles.menubarButton}`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Popover
        target={
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip
            content="Clip all continuous values to a percentile range"
            position="bottom"
            hoverOpenDelay={tooltipHoverOpenDelay}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              type="button"
              data-testid="visualization-settings"
              className={`bp3-button bp3-icon-timeline-bar-chart ${activeClipClass}`}
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        }
        position={Position.BOTTOM_RIGHT}
        onOpening={handleClipOpening}
        onClosing={handleClipClosing}
        content={
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              padding: 10,
            }}
          >
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div>Clip all continuous values to percentile range</div>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <NumericInput
                style={{ width: 50 }}
                data-testid="clip-min-input"
                onValueChange={handleClipPercentileMinValueChange}
                onKeyPress={handleClipOnKeyPress}
                value={clipMin}
                min={0}
                max={100}
                fill={false}
                minorStepSize={null}
                rightElement={
                  // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                  <div style={{ padding: "4px 2px" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Icon icon="percentage" intent="primary" iconSize={14} />
                  {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </div>
                }
              />
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <span style={{ marginRight: 5, marginLeft: 5 }}> - </span>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <NumericInput
                style={{ width: 50 }}
                data-testid="clip-max-input"
                onValueChange={handleClipPercentileMaxValueChange}
                onKeyPress={handleClipOnKeyPress}
                value={clipMax}
                min={0}
                max={100}
                fill={false}
                minorStepSize={null}
                rightElement={
                  // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                  <div style={{ padding: "4px 2px" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Icon icon="percentage" intent="primary" iconSize={14} />
                  {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                  </div>
                }
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                type="button"
                data-testid="clip-commit"
                intent="primary"
                disabled={isClipDisabled()}
                style={{
                  cursor: "pointer",
                  marginRight: 5,
                  marginLeft: 5,
                }}
                onClick={handleClipCommit}
              >
                Clip
              </Button>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        }
      />
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
});

export default Clip;
