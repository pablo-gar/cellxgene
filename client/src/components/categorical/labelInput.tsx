// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { InputGroup, MenuItem, Keys } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import fuzzysort from "fuzzysort";

type State = any;

export default class LabelInput extends React.PureComponent<{}, State> {
  /*
  Input widget for text labels, which acts like an InputGroup, but will also 
  accept a suggestion list (of labels), with sublime-like suggest search.

  Properties:

  * labelSuggestions -- array of suggested lables. May be array of string or
    other objects. If array of objects, specify `labelKey`. If null, suggestion
    mode is disabled.
  * onSelect -- optional, callback upon selection of item from labelSuggestions.
    (label) => void
  * onChange -- optional, callback upon change in text input.  (label) => void
  * label -- component value, for controlled use
  * newLabelMessage -- text to display when user enters a label not in labelSuggestions
    (not used if suggestion mode disabled)
  * inputProps -- will be passed to InputGroup
  * popoverProps -- will be passed to <Suggest>
  */

  /* maxinum number of suggestions */
  static QueryResultLimit = 100;

  props: any;
  setState: any;
  state: any;

  constructor(props: {}) {
    super(props);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{}'.
    const { label } = props;
    const query = label || "";
    const queryResults = this.filterLabels(query);
    this.state = {
      query,
      queryResults,
    };
  }

  handleQueryChange = (query: any, event: any) => {
    // https://github.com/palantir/blueprint/issues/2983
    if (!event) return;

    const queryResults = this.filterLabels(query);
    this.setState({
      query,
      queryResults,
    });

    const { onChange } = this.props;
    if (onChange) onChange(query, event);
  };

  handleItemSelect = (item: any, event: any) => {
    /* only report the select if not already reported via onChange() */
    const { target } = item;
    const { query } = this.state;
    const { onSelect } = this.props;
    if (target !== query && onSelect) onSelect(target, event);
  };

  handleKeyDown = (e: any) => {
    /* 
    prevent these events from propagating to containing form/dialog
    and causing further side effects (eg, closing dialog, submitting
    form, etc).
    */
    const { keyCode } = e;
    if (keyCode === Keys.ENTER || keyCode === Keys.ESCAPE) {
      e.preventDefault();
    }
    if (keyCode === Keys.ESCAPE) {
      e.stopPropagation();
    }
  };

  handleChange = (e: any) => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  };

  renderLabelSuggestion = (queryResult: any, {
    handleClick,
    modifiers
  }: any) => {
    if (queryResult.newLabel) {
      const { newLabelMessage } = this.props;
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MenuItem
          icon="flag"
          active={modifiers.active}
          disabled={modifiers.disabled}
          key={queryResult.target}
          onClick={handleClick}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          text={<em>{queryResult.target}</em>}
          label={newLabelMessage || "New label"}
        />
      );
    }
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={queryResult.target}
        onClick={handleClick}
        text={queryResult.target}
      />
    );
  };

  filterLabels(query: any) {
    const { labelSuggestions } = this.props;
    if (!labelSuggestions) return [];

    /* empty query is wildcard */
    if (query === "") {
      return labelSuggestions
        .slice(0, LabelInput.QueryResultLimit)
        .map((l: any) => ({
        target: l,
        score: -10000
      }));
    }

    /* else, do a fuzzy query */
    const options = {
      limit: LabelInput.QueryResultLimit,
      threshold: -10000, // don't return bad results
    };
    let queryResults = fuzzysort.go(query, labelSuggestions, options);
    /* exact match will always be first in list */
    if (query !== "" && queryResults[0]?.target !== query)
      // @ts-expect-error ts-migrate(2322) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
      queryResults = [{ target: query, newLabel: true }, ...queryResults];

    return queryResults;
  }

  render() {
    const { props } = this;
    const { labelSuggestions, label, autoFocus = true } = props;
    const suggestEnabled = !!labelSuggestions && labelSuggestions.length > 0;

    if (!suggestEnabled) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputGroup
          autoFocus={autoFocus}
          {...props.inputProps} // eslint-disable-line react/jsx-props-no-spreading --- Allows for modularity
          value={label}
          onChange={this.handleChange}
        />
      );
    }

    const popoverProps = {
      minimal: true,
      ...props.popoverProps,
    };
    const inputProps = {
      ...props.inputProps,
      autoFocus: false,
    };
    const { queryResults } = this.state;
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Suggest
        fill
        inputValueRenderer={(i: any) => i.target}
        items={queryResults}
        itemRenderer={this.renderLabelSuggestion}
        onItemSelect={this.handleItemSelect}
        query={label}
        onQueryChange={this.handleQueryChange}
        popoverProps={popoverProps}
        inputProps={inputProps}
        onKeyDown={this.handleKeyDown}
      />
    </>;
  }
}
