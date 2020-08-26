// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { AnchorButton, Tooltip, Position } from "@blueprintjs/core";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import * as globals from "../../globals";
// @ts-expect-error ts-migrate(6142) FIXME: Module './category' was resolved to '/Users/sbadaj... Remove this comment to see the full error message
import Category from "./category";
import { AnnotationsHelpers, ControlsHelpers } from "../../util/stateManager";
// @ts-expect-error ts-migrate(6142) FIXME: Module './annoDialog' was resolved to '/Users/sbad... Remove this comment to see the full error message
import AnnoDialog from "./annoDialog";
// @ts-expect-error ts-migrate(6142) FIXME: Module './annoSelect' was resolved to '/Users/sbad... Remove this comment to see the full error message
import AnnoSelect from "./annoSelect";
// @ts-expect-error ts-migrate(6142) FIXME: Module './labelInput' was resolved to '/Users/sbad... Remove this comment to see the full error message
import LabelInput from "./labelInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module './labelUtil' was resolved to '/Users/sbada... Remove this comment to see the full error message
import { labelPrompt } from "./labelUtil";
import actions from "../../actions";

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  writableCategoriesEnabled: state.config?.parameters?.annotations ?? false,
  schema: state.annoMatrix?.schema,
  ontology: state.ontology,
  userinfo: state.userinfo,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Categories extends React.Component<{}, State> {
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      createAnnoModeActive: false,
      newCategoryText: "",
      categoryToDuplicate: null,
      expandedCats: new Set(),
    };
  }

  handleCreateUserAnno = (e: any) => {
    const { dispatch } = this.props;
    const { newCategoryText, categoryToDuplicate } = this.state;
    dispatch(
      actions.annotationCreateCategoryAction(
        newCategoryText,
        categoryToDuplicate
      )
    );
    this.setState({
      createAnnoModeActive: false,
      categoryToDuplicate: null,
      newCategoryText: "",
    });
    e.preventDefault();
  };

  handleEnableAnnoMode = () => {
    this.setState({ createAnnoModeActive: true });
  };

  handleDisableAnnoMode = () => {
    this.setState({
      createAnnoModeActive: false,
      categoryToDuplicate: null,
      newCategoryText: "",
    });
  };

  handleModalDuplicateCategorySelection = (d: any) => {
    this.setState({ categoryToDuplicate: d });
  };

  categoryNameError = (name: any) => {
    /*
    return false if this is a LEGAL/acceptable category name or NULL/empty string,
    or return an error type.
    */

    /* allow empty string */
    if (name === "") return false;

    /*
    test for uniqueness against *all* annotation names, not just the subset
    we render as categorical.
    */
    const { schema } = this.props;
    const allCategoryNames = schema.annotations.obs.columns.map((c: any) => c.name);

    /* check category name syntax */
    const error = AnnotationsHelpers.annotationNameIsErroneous(name);
    if (error) {
      return error;
    }

    /* disallow duplicates */
    if (allCategoryNames.indexOf(name) !== -1) {
      return "duplicate";
    }

    /* otherwise, no error */
    return false;
  };

  handleChange = (name: any) => {
    this.setState({ newCategoryText: name });
  };

  handleSelect = (name: any) => {
    this.setState({ newCategoryText: name });
  };

  instruction = (name: any) => {
    return labelPrompt(
      this.categoryNameError(name),
      "New, unique category name",
      ":"
    );
  };

  onExpansionChange = (catName: any) => {
    const { expandedCats } = this.state;
    if (expandedCats.has(catName)) {
      const _expandedCats = new Set(expandedCats);
      _expandedCats.delete(catName);
      this.setState({ expandedCats: _expandedCats });
    } else {
      const _expandedCats = new Set(expandedCats);
      _expandedCats.add(catName);
      this.setState({ expandedCats: _expandedCats });
    }
  };

  render() {
    const {
      createAnnoModeActive,
      categoryToDuplicate,
      newCategoryText,
      expandedCats,
    } = this.state;
    const {
      writableCategoriesEnabled,
      schema,
      ontology,
      userinfo,
    } = this.props;
    const ontologyEnabled = ontology?.enabled ?? false;
    /* all names, sorted in display order.  Will be rendered in this order */
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const allCategoryNames = ControlsHelpers.selectableCategoryNames(
      schema
    ).sort();

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        style={{
          padding: globals.leftSidebarSectionPadding,
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnnoDialog
          isActive={createAnnoModeActive}
          title="Create new category"
          instruction={this.instruction(newCategoryText)}
          cancelTooltipContent="Close this dialog without creating a category."
          primaryButtonText="Create new category"
          primaryButtonProps={{ "data-testid": "submit-category" }}
          text={newCategoryText}
          validationError={this.categoryNameError(newCategoryText)}
          handleSubmit={this.handleCreateUserAnno}
          handleCancel={this.handleDisableAnnoMode}
          annoInput={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LabelInput
              labelSuggestions={ontologyEnabled ? ontology.terms : null}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              inputProps={{
                "data-testid": "new-category-name",
                leftIcon: "tag",
                intent: "none",
                autoFocus: true,
              }}
              newLabelMessage="New category"
            />
          }
          annoSelect={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <AnnoSelect
              handleModalDuplicateCategorySelection={
                this.handleModalDuplicateCategorySelection
              }
              categoryToDuplicate={categoryToDuplicate}
              allCategoryNames={allCategoryNames}
            />
          }
        />

        {/* READ ONLY CATEGORICAL FIELDS */}
        {/* this is duplicative but flat, could be abstracted */}
        {allCategoryNames.map((catName: any) => !schema.annotations.obsByName[catName].writable ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Category
            key={catName}
            metadataField={catName}
            onExpansionChange={this.onExpansionChange}
            isExpanded={expandedCats.has(catName)}
            createAnnoModeActive={createAnnoModeActive}
          />
        ) : null
        )}
        {/* WRITEABLE FIELDS */}
        {allCategoryNames.map((catName: any) => schema.annotations.obsByName[catName].writable ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Category
            key={catName}
            metadataField={catName}
            onExpansionChange={this.onExpansionChange}
            isExpanded={expandedCats.has(catName)}
            createAnnoModeActive={createAnnoModeActive}
          />
        ) : null
        )}

        {writableCategoriesEnabled ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip
            content={
              userinfo.is_authenticated
                ? "Create a new category"
                : "You must be logged in to create new categorical fields"
            }
            position={Position.RIGHT}
            boundary="viewport"
            hoverOpenDelay={globals.tooltipHoverOpenDelay}
            modifiers={{
              preventOverflow: { enabled: false },
              hide: { enabled: false },
            }}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AnchorButton
              type="button"
              data-testid="open-annotation-dialog"
              onClick={this.handleEnableAnnoMode}
              intent="primary"
              disabled={!userinfo.is_authenticated}
            >
              Create new category
            </AnchorButton>
          </Tooltip>
        ) : null}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default Categories;
