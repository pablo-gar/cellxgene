// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../annoDialog' was resolved to '/Users/sba... Remove this comment to see the full error message
import AnnoDialog from "../annoDialog";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../labelInput' was resolved to '/Users/sba... Remove this comment to see the full error message
import LabelInput from "../labelInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../labelUtil' was resolved to '/Users/sbad... Remove this comment to see the full error message
import { labelPrompt } from "../labelUtil";

import { AnnotationsHelpers } from "../../../util/stateManager";
import actions from "../../../actions";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  annotations: state.annotations,
  schema: state.annoMatrix?.schema,
  ontology: state.ontology,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class AnnoDialogEditCategoryName extends React.PureComponent<{}, State> {
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'metadataField' does not exist on type '{... Remove this comment to see the full error message
      newCategoryText: props.metadataField,
    };
  }

  handleChangeOrSelect = (name: any) => {
    this.setState({
      newCategoryText: name,
    });
  };

  disableEditCategoryMode = () => {
    const { dispatch, metadataField } = this.props;
    dispatch({
      type: "annotation: disable category edit mode",
    });
    this.setState({ newCategoryText: metadataField });
  };

  handleEditCategory = (e: any) => {
    const { dispatch, metadataField } = this.props;
    const { newCategoryText } = this.state;

    /*
    test for uniqueness against *all* annotation names, not just the subset
    we render as categorical.
    */
    const { schema } = this.props;
    const allCategoryNames = schema.annotations.obs.columns.map((c: any) => c.name);

    if (
      (allCategoryNames.indexOf(newCategoryText) > -1 &&
        newCategoryText !== metadataField) ||
      newCategoryText === ""
    ) {
      return;
    }

    this.disableEditCategoryMode();

    if (metadataField !== newCategoryText)
      dispatch(
        actions.annotationRenameCategoryAction(metadataField, newCategoryText)
      );
    e.preventDefault();
  };

  editedCategoryNameError = (name: any) => {
    const { metadataField } = this.props;

    /* check for syntax errors in category name */
    const error = AnnotationsHelpers.annotationNameIsErroneous(name);
    if (error) {
      return error;
    }

    /* check for duplicative categories */

    /*
    test for uniqueness against *all* annotation names, not just the subset
    we render as categorical.
    */
    const { schema } = this.props;
    const allCategoryNames = schema.annotations.obs.columns.map((c: any) => c.name);

    const categoryNameAlreadyExists = allCategoryNames.indexOf(name) > -1;
    const sameName = name === metadataField;
    if (categoryNameAlreadyExists && !sameName) {
      return "duplicate";
    }

    /* otherwise, no error */
    return false;
  };

  instruction = (name: any) => {
    return labelPrompt(
      this.editedCategoryNameError(name),
      "New, unique category name",
      ":"
    );
  };

  allCategoryNames() {
    const { schema } = this.props;
    return schema.annotations.obs.columns.map((c: any) => c.name);
  }

  render() {
    const { newCategoryText } = this.state;
    const { metadataField, annotations, ontology } = this.props;
    const ontologyEnabled = ontology?.enabled ?? false;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnnoDialog
          isActive={
            annotations.isEditingCategoryName &&
            annotations.categoryBeingEdited === metadataField
          }
          inputProps={{
            "data-testid": `${metadataField}:edit-category-name-dialog`,
          }}
          primaryButtonProps={{
            "data-testid": `${metadataField}:submit-category-edit`,
          }}
          title="Edit category name"
          instruction={this.instruction(newCategoryText)}
          cancelTooltipContent="Close this dialog without editing this category."
          primaryButtonText="Edit category name"
          text={newCategoryText}
          validationError={this.editedCategoryNameError(newCategoryText)}
          handleSubmit={this.handleEditCategory}
          handleCancel={this.disableEditCategoryMode}
          annoInput={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LabelInput
              label={newCategoryText}
              labelSuggestions={ontologyEnabled ? ontology.terms : null}
              onChange={this.handleChangeOrSelect}
              onSelect={this.handleChangeOrSelect}
              inputProps={{
                "data-testid": `${metadataField}:edit-category-name-text`,
                leftIcon: "tag",
                intent: "none",
                autoFocus: true,
              }}
              newLabelMessage="New category"
            />
          }
        />
      </>
    );
  }
}

export default AnnoDialogEditCategoryName;
