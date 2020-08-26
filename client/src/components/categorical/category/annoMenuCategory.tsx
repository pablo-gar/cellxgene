// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Position,
  Tooltip,
  Icon,
  PopoverInteractionKind,
} from "@blueprintjs/core";

import * as globals from "../../../globals";
import actions from "../../../actions";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  annotations: state.annotations,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class AnnoMenuCategory extends React.PureComponent<{}, State> {
  props: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  activateAddNewLabelMode = () => {
    const { dispatch, metadataField } = this.props;
    dispatch({
      type: "annotation: activate add new label mode",
      data: metadataField,
    });
  };

  activateEditCategoryMode = () => {
    const { dispatch, metadataField } = this.props;

    dispatch({
      type: "annotation: activate category edit mode",
      data: metadataField,
    });
  };

  handleDeleteCategory = () => {
    const { dispatch, metadataField } = this.props;
    dispatch(actions.annotationDeleteCategoryAction(metadataField));
  };

  render() {
    const {
      metadataField,
      annotations,
      isUserAnno,
      createText,
      editText,
      deleteText,
    } = this.props;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {isUserAnno ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Tooltip
              content={createText}
              position="bottom"
              hoverOpenDelay={globals.tooltipHoverOpenDelay}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                style={{ marginLeft: 0, marginRight: 2 }}
                data-testclass="handleAddNewLabelToCategory"
                data-testid={`${metadataField}:add-new-label-to-category`}
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                icon={<Icon icon="plus" iconSize={10} />}
                onClick={this.activateAddNewLabelMode}
                small
                minimal
              />
            </Tooltip>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Popover
              interactionKind={PopoverInteractionKind.HOVER}
              boundary="window"
              position={Position.RIGHT_TOP}
              content={
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Menu>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MenuItem
                    icon="edit"
                    disabled={annotations.isEditingCategoryName}
                    data-testclass="activateEditCategoryMode"
                    data-testid={`${metadataField}:edit-category-mode`}
                    onClick={this.activateEditCategoryMode}
                    text={editText}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MenuItem
                    icon="delete"
                    intent="danger"
                    data-testclass="handleDeleteCategory"
                    data-testid={`${metadataField}:delete-category`}
                    onClick={this.handleDeleteCategory}
                    text={deleteText}
                  />
                </Menu>
              }
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                style={{ marginLeft: 0, marginRight: 5 }}
                data-testclass="seeActions"
                data-testid={`${metadataField}:see-actions`}
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                icon={<Icon icon="more" iconSize={10} />}
                small
                minimal
              />
            </Popover>
          </>
        ) : null}
      </>
    );
  }
}

export default AnnoMenuCategory;
