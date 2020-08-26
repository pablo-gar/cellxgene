// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import { Button, ButtonGroup, AnchorButton, Tooltip } from "@blueprintjs/core";
import * as globals from "../../globals";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";
import actions from "../../actions";
// @ts-expect-error ts-migrate(6142) FIXME: Module './cellSetButtons' was resolved to '/Users/... Remove this comment to see the full error message
import CellSetButton from "./cellSetButtons";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  differential: state.differential,
  celllist1: state.differential?.celllist1,
  celllist2: state.differential?.celllist2,
  diffexpMayBeSlow: state.config?.parameters?.["diffexp-may-be-slow"] ?? false,
  diffexpCellcountMax: state.config?.limits?.["diffexp_cellcount_max"],
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class DiffexpButtons extends React.PureComponent {
  props: any;
  computeDiffExp = () => {
    const { dispatch, differential } = this.props;
    if (differential.celllist1 && differential.celllist2) {
      dispatch(
        actions.requestDifferentialExpression(
          differential.celllist1,
          differential.celllist2
        )
      );
    }
  };

  clearDifferentialExpression = () => {
    const { dispatch, differential } = this.props;
    dispatch({
      type: "clear differential expression",
      diffExp: differential.diffExp,
    });
    dispatch({
      type: "clear scatterplot",
    });
  };

  render() {
    /* diffexp-related buttons may be disabled */
    const { differential, diffexpMayBeSlow, diffexpCellcountMax } = this.props;

    const haveBothCellSets =
      !!differential.celllist1 && !!differential.celllist2;

    const haveEitherCellSet =
      !!differential.celllist1 || !!differential.celllist2;

    const slowMsg = diffexpMayBeSlow
      ? " (CAUTION: large dataset - may take longer or fail)"
      : "";
    const tipMessage = `See top 10 differentially expressed genes${slowMsg}`;
    const tipMessageWarn = `The total number of cells for differential expression computation
                            may not exceed ${diffexpCellcountMax}. Try reselecting new cell sets.`;

    const warnMaxSizeExceeded =
      haveEitherCellSet &&
      !!diffexpCellcountMax &&
      (differential.celllist1?.length ?? 0) +
        (differential.celllist2?.length ?? 0) >
        diffexpCellcountMax;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ButtonGroup className={styles.menubarButton}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CellSetButton eitherCellSetOneOrTwo={1} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CellSetButton eitherCellSetOneOrTwo={2} />
        {!differential.diffExp ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip
            content={warnMaxSizeExceeded ? tipMessageWarn : tipMessage}
            position="bottom"
            hoverOpenDelay={globals.tooltipHoverOpenDelayQuick}
            intent={warnMaxSizeExceeded ? "danger" : "none"}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AnchorButton
              disabled={!haveBothCellSets || warnMaxSizeExceeded}
              intent={warnMaxSizeExceeded ? "danger" : "primary"}
              data-testid="diffexp-button"
              loading={differential.loading}
              icon="left-join"
              fill
              onClick={this.computeDiffExp}
            />
          </Tooltip>
        ) : null}

        {differential.diffExp ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip
            content="Remove differentially expressed gene list and clear cell selections"
            position="bottom"
            hoverOpenDelay={globals.tooltipHoverOpenDelayQuick}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              type="button"
              fill
              intent="warning"
              onClick={this.clearDifferentialExpression}
            >
              Clear Differential Expression
            </Button>
          </Tooltip>
        ) : null}
      </ButtonGroup>
    );
  }
}

export default DiffexpButtons;
