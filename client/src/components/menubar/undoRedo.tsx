// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { AnchorButton, Tooltip } from "@blueprintjs/core";
import { tooltipHoverOpenDelay } from "../../globals";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";

const UndoRedo = React.memo((props: any) => {
  const { undoDisabled, redoDisabled, dispatch } = props;
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={`bp3-button-group ${styles.menubarButton}`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tooltip
        content="Undo"
        position="bottom"
        hoverOpenDelay={tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          className="bp3-button bp3-icon-undo"
          disabled={undoDisabled}
          onClick={() => {
            dispatch({ type: "@@undoable/undo" });
          }}
          style={{
            cursor: "pointer",
          }}
          data-testid="undo"
        />
      </Tooltip>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tooltip
        content="Redo"
        position="bottom"
        hoverOpenDelay={tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          className="bp3-button bp3-icon-redo"
          disabled={redoDisabled}
          onClick={() => {
            dispatch({ type: "@@undoable/redo" });
          }}
          style={{
            cursor: "pointer",
          }}
          data-testid="redo"
        />
      </Tooltip>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
});

export default UndoRedo;
