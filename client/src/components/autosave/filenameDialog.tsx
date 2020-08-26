// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";

import {
  Button,
  Tooltip,
  InputGroup,
  Dialog,
  Classes,
  Colors,
} from "@blueprintjs/core";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  idhash: state.config?.parameters?.["annotations-user-data-idhash"] ?? null,
  annotations: state.annotations,
  auth: state.config?.authentication,
  userinfo: state.userinfo,
  writableCategoriesEnabled: state.config?.parameters?.annotations ?? false,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class FilenameDialog extends React.Component<{}, State> {
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      filenameText: "",
    };
  }

  dismissFilenameDialog = () => {};

  handleCreateFilename = () => {
    const { dispatch } = this.props;
    const { filenameText } = this.state;

    dispatch({
      type: "set annotations collection name",
      data: filenameText,
    });
  };

  filenameError = () => {
    const legalNames = /^\w+$/;
    const { filenameText } = this.state;
    let err = false;

    if (filenameText === "") {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '"empty_string"' is not assignable to type 'b... Remove this comment to see the full error message
      err = "empty_string";
    } else if (!legalNames.test(filenameText)) {
      /*
      IMPORTANT: this test must ultimately match the test applied by the
      backend, which is designed to ensure a safe file name can be created
      from the data collection name.  If you change this, you will also need
      to change the validation code in the backend, or it will have no effect.
      */
      // @ts-expect-error ts-migrate(2322) FIXME: Type '"characters"' is not assignable to type 'boo... Remove this comment to see the full error message
      err = "characters";
    }

    return err;
  };

  filenameErrorMessage = () => {
    const err = this.filenameError();
    let markup = null;

    // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
    if (err === "empty_string") {
      markup = (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span
          style={{
            fontStyle: "italic",
            fontSize: 12,
            marginTop: 5,
            color: Colors.ORANGE3,
          }}
        >
          Name cannot be blank
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </span>
      );
    // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
    } else if (err === "characters") {
      markup = (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span
          style={{
            fontStyle: "italic",
            fontSize: 12,
            marginTop: 5,
            color: Colors.ORANGE3,
          }}
        >
          Only alphanumeric and underscore allowed
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </span>
      );
    }
    return markup;
  };

  render() {
    const {
      writableCategoriesEnabled,
      annotations,
      idhash,
      userinfo,
    } = this.props;
    const { filenameText } = this.state;

    return writableCategoriesEnabled &&
      annotations.promptForFilename &&
      !annotations.dataCollectionNameIsReadOnly &&
      !annotations.dataCollectionName &&
      userinfo.is_authenticated ? (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Dialog
        icon="tag"
        title="Annotations Collection"
        isOpen={!annotations.dataCollectionName}
        onClose={this.dismissFilenameDialog}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            this.handleCreateFilename();
          }}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className={Classes.DIALOG_BODY} data-testid="annotation-dialog">
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div style={{ marginBottom: 20 }}>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p>Name your annotations collection:</p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <InputGroup
                autoFocus
                value={filenameText}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                intent={this.filenameError(filenameText) ? "warning" : "none"}
                onChange={(e: any) => this.setState({ filenameText: e.target.value })
                }
                leftIcon="tag"
                data-testid="new-annotation-name"
              />
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p
                style={{
                  marginTop: 7,
                  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                  visibility: this.filenameError(filenameText)
                    ? "visible"
                    : "hidden",
                  color: Colors.ORANGE3,
                }}
              >
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1. */}
                {this.filenameErrorMessage(filenameText)}
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </p>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p>
                Your annotations are stored in this file:
                {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <code className="bp3-code">
                  {filenameText}-{idhash}.csv
                {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </code>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </p>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p style={{ fontStyle: "italic" }}>
                (We added a unique ID to your filename)
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </p>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className={Classes.DIALOG_FOOTER}>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Tooltip content="Cancel naming collection">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button onClick={this.dismissFilenameDialog}>Cancel</Button>
              </Tooltip>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
                disabled={!filenameText || this.filenameError(filenameText)}
                onClick={this.handleCreateFilename}
                intent="primary"
                type="submit"
                data-testid="submit-annotation"
              >
                Create annotations collection
              </Button>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </form>
      </Dialog>
    ) : null;
  }
}

export default FilenameDialog;
