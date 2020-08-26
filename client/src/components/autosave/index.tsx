// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import actions from "../../actions";
// @ts-expect-error ts-migrate(6142) FIXME: Module './filenameDialog' was resolved to '/Users/... Remove this comment to see the full error message
import FilenameDialog from "./filenameDialog";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  annotations: state.annotations,
  saveInProgress: state.autosave?.saveInProgress ?? false,
  error: state.autosave?.error,
  writableCategoriesEnabled: state.config?.parameters?.annotations ?? false,
  annoMatrix: state.annoMatrix,
  lastSavedAnnoMatrix: state.autosave?.lastSavedAnnoMatrix,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Autosave extends React.Component<{}, State> {
  clearInterval: any;
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      timer: null,
    };
  }

  componentDidMount() {
    const { writableCategoriesEnabled } = this.props;

    let { timer } = this.state;
    if (timer) clearInterval(timer);
    if (writableCategoriesEnabled) {
      timer = setInterval(this.tick, 2500);
    } else {
      timer = null;
    }
    this.setState({ timer });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) this.clearInterval(timer);
  }

  tick = () => {
    const { dispatch, saveInProgress } = this.props;
    if (this.needToSave() && !saveInProgress) {
      dispatch(actions.saveObsAnnotationsAction());
    }
  };

  needToSave = () => {
    /* return true if we need to save, false if we don't */
    const { annoMatrix, lastSavedAnnoMatrix } = this.props;
    return actions.needToSaveObsAnnotations(annoMatrix, lastSavedAnnoMatrix);
  };

  statusMessage() {
    const { error } = this.props;
    if (error) {
      return `Autosave error: ${error}`;
    }
    return this.needToSave() ? "Unsaved" : "All saved";
  }

  render() {
    const {
      writableCategoriesEnabled,
      saveInProgress,
      lastSavedAnnoMatrix,
    } = this.props;
    const initialDataLoadComplete = lastSavedAnnoMatrix;

    if (!writableCategoriesEnabled) return null;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        id="autosave"
        data-testclass={
          !initialDataLoadComplete
            ? "autosave-init"
            : this.needToSave() || saveInProgress
            ? "autosave-incomplete"
            : "autosave-complete"
        }
        style={{
          position: "absolute",
          display: "inherit",
          right: 8,
          bottom: 8,
          zIndex: 1,
        }}
      >
        {this.statusMessage()}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FilenameDialog />
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default Autosave;
