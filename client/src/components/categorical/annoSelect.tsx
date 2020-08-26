// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

type State = any;

class DuplicateCategorySelect extends React.PureComponent<{}, State> {
  props: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      allCategoryNames,
      categoryToDuplicate,
      handleModalDuplicateCategorySelection,
    } = this.props;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <p>
          Optionally duplicate all labels & cell assignments from existing
          category into new category:
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </p>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Select
          items={
            allCategoryNames ||
            [] /* this is a placeholder, could be  a subcomponent to avoid this */
          }
          filterable={false}
          itemRenderer={(d: any, {
            handleClick
          }: any) => {
            return (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <MenuItem
                data-testclass="duplicate-category-dropdown-option"
                onClick={handleClick}
                key={d}
                text={d}
              />
            );
          }}
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          noResults={<MenuItem disabled text="No results." />}
          onItemSelect={(d: any) => {
            handleModalDuplicateCategorySelection(d);
          }}
        >
          {/* children become the popover target; render value here */}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            data-testid="duplicate-category-dropdown"
            text={categoryToDuplicate || "None (all cells 'unassigned')"}
            rightIcon="double-caret-vertical"
          />
        </Select>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default DuplicateCategorySelect;
