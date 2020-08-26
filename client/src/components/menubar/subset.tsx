// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { AnchorButton, ButtonGroup, Tooltip } from "@blueprintjs/core";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";
import * as globals from "../../globals";

const Subset = React.memo((props: any) => {
  const {
    subsetPossible,
    subsetResetPossible,
    handleSubset,
    handleSubsetReset,
  } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ButtonGroup className={styles.menubarButton}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tooltip
        content="Subset to currently selected cells and associated metadata"
        position="bottom"
        hoverOpenDelay={globals.tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          data-testid="subset-button"
          disabled={!subsetPossible}
          icon="pie-chart"
          onClick={handleSubset}
        />
      </Tooltip>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tooltip
        content="Undo subset and show all cells and associated metadata"
        position="bottom"
        hoverOpenDelay={globals.tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          data-testid="reset-subset-button"
          disabled={!subsetResetPossible}
          icon="full-circle"
          onClick={handleSubsetReset}
        />
      </Tooltip>
    </ButtonGroup>
  );
});

export default Subset;
