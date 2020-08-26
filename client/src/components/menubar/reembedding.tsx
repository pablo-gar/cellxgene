// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import { AnchorButton, ButtonGroup, Tooltip } from "@blueprintjs/core";
import * as globals from "../../globals";
import actions from "../../actions";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  reembedController: state.reembedController,
  annoMatrix: state.annoMatrix,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Reembedding extends React.PureComponent {
  props: any;
  render() {
    const { dispatch, annoMatrix, reembedController } = this.props;
    const loading = !!reembedController?.pendingFetch;
    const disabled = annoMatrix.nObs === annoMatrix.schema.dataframe.nObs;
    const tipContent = disabled
      ? "Subset cells first, then click to recompute UMAP embedding."
      : "Click to recompute UMAP embedding on the current cell subset.";

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ButtonGroup className={styles.menubarButton}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Tooltip
          content={tipContent}
          position="bottom"
          hoverOpenDelay={globals.tooltipHoverOpenDelay}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AnchorButton
            icon="new-object"
            disabled={disabled}
            onClick={() => dispatch(actions.requestReembed())}
            loading={loading}
          />
        </Tooltip>
      </ButtonGroup>
    );
  }
}

export default Reembedding;
