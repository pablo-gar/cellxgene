/* rc slider https://www.npmjs.com/package/rc-slider */

// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";
import fuzzysort from "fuzzysort";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import { Suggest } from "@blueprintjs/select";
import {
  MenuItem,
  Button,
  FormGroup,
  InputGroup,
  ControlGroup,
} from "@blueprintjs/core";
import * as globals from "../../globals";
import actions from "../../actions";
import {
  postUserErrorToast,
  keepAroundErrorToast,
} from "../framework/toasters";

import { memoize } from "../../util/dataframe/util";

const renderGene = (fuzzySortResult: any, {
  handleClick,
  modifiers
}: any) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  /* the fuzzysort wraps the object with other properties, like a score */
  const geneName = fuzzySortResult.target;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      data-testid={`suggest-menu-item-${geneName}`}
      key={geneName}
      onClick={(g: any) => /* this fires when user clicks a menu item */
      handleClick(g)
      }
      text={geneName}
    />
  );
};

const filterGenes = (query: any, genes: any) =>
  /* fires on load, once, and then for each character typed into the input */
  fuzzysort.go(query, genes, {
    limit: 5,
    threshold: -10000, // don't return bad results
  });

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => {
  return {
    annoMatrix: state.annoMatrix,
    userDefinedGenes: state.controls.userDefinedGenes,
    userDefinedGenesLoading: state.controls.userDefinedGenesLoading,
    differential: state.differential,
  };
})
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class AddGenes extends React.Component<{}, State> {
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      bulkAdd: "",
      tab: "autosuggest",
      activeItem: null,
      geneNames: [],
      status: "pending",
    };
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    this.updateState();
  }

  componentDidUpdate(prevProps: {}) {
    this.updateState(prevProps);
  }

  _genesToUpper = (listGenes: any) => {
    // Has to be a Map to preserve index
    const upperGenes = new Map();
    for (let i = 0, { length } = listGenes; i < length; i += 1) {
      upperGenes.set(listGenes[i].toUpperCase(), i);
    }

    return upperGenes;
  };

  // eslint-disable-next-line react/sort-comp -- memo requires a defined _genesToUpper
  _memoGenesToUpper = memoize(this._genesToUpper, (arr: any) => arr);

  handleBulkAddClick = () => {
    const { dispatch, userDefinedGenes } = this.props;
    const { bulkAdd, geneNames } = this.state;

    /*
      test:
      Apod,,, Cd74,,    ,,,    Foo,    Bar-2,,
    */
    if (bulkAdd !== "") {
      const genes = _.pull(_.uniq(bulkAdd.split(/[ ,]+/)), "");
      if (genes.length === 0) {
        return keepAroundErrorToast("Must enter a gene name.");
      }
      // These gene lists are unique enough where memoization is useless
      const upperGenes = this._genesToUpper(genes);
      const upperUserDefinedGenes = this._genesToUpper(userDefinedGenes);

      const upperGeneNames = this._memoGenesToUpper(geneNames);

      dispatch({ type: "bulk user defined gene start" });

      Promise.all(
        // @ts-expect-error ts-migrate(2569) FIXME: Type 'IterableIterator<any>' is not an array type ... Remove this comment to see the full error message
        [...upperGenes.keys()].map((upperGene) => {
          if (upperUserDefinedGenes.get(upperGene) !== undefined) {
            return keepAroundErrorToast("That gene already exists");
          }

          const indexOfGene = upperGeneNames.get(upperGene);

          if (indexOfGene === undefined) {
            return keepAroundErrorToast(
              `${
                genes[upperGenes.get(upperGene)]
              } doesn't appear to be a valid gene name.`
            );
          }
          return dispatch(
            actions.requestUserDefinedGene(geneNames[indexOfGene])
          );
        })
      ).then(
        () => dispatch({ type: "bulk user defined gene complete" }),
        () => dispatch({ type: "bulk user defined gene error" })
      );
    }

    this.setState({ bulkAdd: "" });
    return undefined;
  };

  async updateState(prevProps: any) {
    const { annoMatrix } = this.props;
    if (!annoMatrix) return;
    if (annoMatrix !== prevProps?.annoMatrix) {
      const { schema } = annoMatrix;
      const varIndex = schema.annotations.var.index;

      this.setState({ status: "pending" });
      try {
        const df = await annoMatrix.fetch("var", varIndex);
        this.setState({
          status: "success",
          geneNames: df.col(varIndex).asArray(),
        });
      } catch (error) {
        this.setState({ status: "error" });
        throw error;
      }
    }
  }

  placeholderGeneNames() {
    /*
    return a string containing gene name suggestions for use as a user hint.
    Eg.,    Apod, Cd74, ...
    Will return a max of 3 genes, totalling 15 characters in length.
    Randomly selects gene names.

    NOTE: the random selection means it will re-render constantly.
    */
    const { geneNames } = this.state;
    if (geneNames.length > 0) {
      const placeholder = [];
      let len = geneNames.length;
      const maxGeneNameCount = 3;
      const maxStrLength = 15;
      len = len < maxGeneNameCount ? len : maxGeneNameCount;
      for (let i = 0, strLen = 0; i < len && strLen < maxStrLength; i += 1) {
        const deal = Math.floor(Math.random() * geneNames.length);
        const geneName = geneNames[deal];
        placeholder.push(geneName);
        strLen += geneName.length + 2; // '2' is the length of a comma and space
      }
      placeholder.push("...");
      return placeholder.join(", ");
    }
    // default - should never happen.
    return "Apod, Cd74, ...";
  }

  handleClick(g: any) {
    const { dispatch, userDefinedGenes } = this.props;
    const { geneNames } = this.state;
    if (!g) return;
    const gene = g.target;
    if (userDefinedGenes.indexOf(gene) !== -1) {
      postUserErrorToast("That gene already exists");
    } else if (userDefinedGenes.length > globals.maxUserDefinedGenes) {
      postUserErrorToast(
        `That's too many genes, you can have at most ${globals.maxUserDefinedGenes} user defined genes`
      );
    } else if (geneNames.indexOf(gene) === undefined) {
      postUserErrorToast("That doesn't appear to be a valid gene name.");
    } else {
      dispatch({ type: "single user defined gene start" });
      dispatch(actions.requestUserDefinedGene(gene));
      dispatch({ type: "single user defined gene complete" });
    }
  }

  render() {
    const { userDefinedGenesLoading } = this.props;
    const { tab, bulkAdd, activeItem, status, geneNames } = this.state;

    // may still be loading!
    if (status !== "success") return null;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            padding: globals.leftSidebarSectionPadding,
          }}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            active={tab === "autosuggest"}
            style={{ marginRight: 5 }}
            minimal
            small
            data-testid="tab-autosuggest"
            onClick={() => {
              this.setState({ tab: "autosuggest" });
            }}
          >
            Autosuggest genes
          </Button>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button
            active={tab === "bulkadd"}
            minimal
            small
            data-testid="section-bulk-add"
            onClick={() => {
              this.setState({ tab: "bulkadd" });
            }}
          >
            Bulk add genes
          </Button>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {tab === "autosuggest" ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ControlGroup
            // @ts-expect-error ts-migrate(2322) FIXME: Property 'style' does not exist on type 'IControlG... Remove this comment to see the full error message
            style={{
              paddingLeft: globals.leftSidebarSectionPadding,
              paddingBottom: globals.leftSidebarSectionPadding,
            }}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Suggest
              resetOnSelect
              closeOnSelect
              resetOnClose
              itemDisabled={userDefinedGenesLoading ? () => true : () => false}
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              noResults={<MenuItem disabled text="No matching genes." />}
              onItemSelect={(g: any) => {
                /* this happens on 'enter' */
                this.handleClick(g);
              }}
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              initialContent={<MenuItem disabled text="Enter a gene…" />}
              inputProps={{ "data-testid": "gene-search" }}
              inputValueRenderer={() => {
                return "";
              }}
              itemListPredicate={filterGenes}
              onActiveItemChange={(item: any) => this.setState({ activeItem: item })}
              itemRenderer={renderGene}
              items={geneNames || ["No genes"]}
              popoverProps={{ minimal: true }}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              className="bp3-button bp3-intent-primary"
              data-testid="add-gene"
              loading={userDefinedGenesLoading}
              onClick={() => this.handleClick(activeItem)}
            >
              Add gene
            </Button>
          </ControlGroup>
        ) : null}
        {tab === "bulkadd" ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div style={{ paddingLeft: globals.leftSidebarSectionPadding }}>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                this.handleBulkAddClick();
              }}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <FormGroup
                helperText="Add a list of genes (comma delimited)"
                labelFor="text-input-bulk-add"
              >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ControlGroup>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <InputGroup
                    onChange={(e: any) => {
                      this.setState({ bulkAdd: e.target.value });
                    }}
                    id="text-input-bulk-add"
                    data-testid="input-bulk-add"
                    placeholder={this.placeholderGeneNames()}
                    value={bulkAdd}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Button
                    intent="primary"
                    onClick={this.handleBulkAddClick}
                    loading={userDefinedGenesLoading}
                  >
                    Add genes
                  </Button>
                </ControlGroup>
              </FormGroup>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </form>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        ) : null}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default AddGenes;
