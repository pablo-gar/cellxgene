// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../annoDialog' was resolved to '/Users/sba... Remove this comment to see the full error message
import AnnoDialog from "../annoDialog";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../labelInput' was resolved to '/Users/sba... Remove this comment to see the full error message
import LabelInput from "../labelInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../labelUtil' was resolved to '/Users/sbad... Remove this comment to see the full error message
import { labelPrompt, isLabelErroneous } from "../labelUtil";
import actions from "../../../actions";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  annotations: state.annotations,
  schema: state.annoMatrix?.schema,
  ontology: state.ontology,
  obsCrossfilter: state.obsCrossfilter,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Category extends React.PureComponent<{}, State> {
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      newLabelText: "",
    };
  }

  disableAddNewLabelMode = (e: any) => {
    const { dispatch } = this.props;
    this.setState({
      newLabelText: "",
    });
    dispatch({
      type: "annotation: disable add new label mode",
    });
    if (e) e.preventDefault();
  };

  handleAddNewLabelToCategory = (e: any) => {
    const { dispatch, metadataField } = this.props;
    const { newLabelText } = this.state;

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    this.disableAddNewLabelMode();
    dispatch(
      actions.annotationCreateLabelInCategory(
        metadataField,
        newLabelText,
        false
      )
    );
    e.preventDefault();
  };

  addLabelAndAssignCells = (e: any) => {
    const { dispatch, metadataField } = this.props;
    const { newLabelText } = this.state;

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    this.disableAddNewLabelMode();
    dispatch(
      actions.annotationCreateLabelInCategory(metadataField, newLabelText, true)
    );
    e.preventDefault();
  };

  labelNameError = (name: any) => {
    const { metadataField, ontology, schema } = this.props;
    return isLabelErroneous(name, metadataField, ontology, schema);
  };

  instruction = (label: any) => {
    return labelPrompt(this.labelNameError(label), "New, unique label", ":");
  };

  handleChangeOrSelect = (label: any) => {
    this.setState({ newLabelText: label });
  };

  render() {
    const { newLabelText } = this.state;
    const { metadataField, annotations, ontology, obsCrossfilter } = this.props;
    const ontologyEnabled = ontology?.enabled ?? false;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnnoDialog
          isActive={
            annotations.isAddingNewLabel &&
            annotations.categoryAddingNewLabel === metadataField
          }
          inputProps={{ "data-testid": `${metadataField}:create-label-dialog` }}
          primaryButtonProps={{
            "data-testid": `${metadataField}:submit-label`,
          }}
          title="Add new label to category"
          instruction={this.instruction(newLabelText)}
          cancelTooltipContent="Close this dialog without adding a label."
          primaryButtonText="Add label"
          secondaryButtonText={`Add label & assign ${obsCrossfilter.countSelected()} selected cells`}
          handleSecondaryButtonSubmit={this.addLabelAndAssignCells}
          text={newLabelText}
          validationError={this.labelNameError(newLabelText)}
          handleSubmit={this.handleAddNewLabelToCategory}
          handleCancel={this.disableAddNewLabelMode}
          annoInput={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LabelInput
              labelSuggestions={ontologyEnabled ? ontology.terms : null}
              onChange={this.handleChangeOrSelect}
              onSelect={this.handleChangeOrSelect}
              inputProps={{
                "data-testid": `${metadataField}:new-label-name`,
                leftIcon: "tag",
                intent: "none",
                autoFocus: true,
              }}
            />
          }
        />
      </>
    );
  }
}

export default Category;
