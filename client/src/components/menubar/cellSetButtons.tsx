// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { AnchorButton, Tooltip } from "@blueprintjs/core";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import { tooltipHoverOpenDelay } from "../../globals";
import actions from "../../actions";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  differential: state.differential,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class CellSetButton extends React.PureComponent {
  props: any;
  set() {
    const { differential, dispatch, eitherCellSetOneOrTwo } = this.props;

    if (!differential.diffExp) {
      // disallow this action if the user has active differential expression results
      dispatch(actions.setCellSetFromSelection(eitherCellSetOneOrTwo));
    }
  }

  render() {
    const { differential, eitherCellSetOneOrTwo } = this.props;
    const cellListName = `celllist${eitherCellSetOneOrTwo}`;
    const cellsSelected = differential[cellListName]
      ? differential[cellListName].length
      : 0;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Tooltip
        content="Save current selection for differential expression computation"
        position="bottom"
        hoverOpenDelay={tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          disabled={differential.diffExp}
          onClick={() => {
            this.set();
          }}
          data-testid={`cellset-button-${eitherCellSetOneOrTwo}`}
        >
          {eitherCellSetOneOrTwo}
          {": "}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span data-testid={`cellset-count-${eitherCellSetOneOrTwo}`}>
            {cellsSelected}
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
          {" cells"}
        </AnchorButton>
      </Tooltip>
    );
  }
}

export default CellSetButton;
