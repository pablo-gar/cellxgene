/* rc slider https://www.npmjs.com/package/rc-slider */

// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../brushableHistogram' was resolved to '/U... Remove this comment to see the full error message
import HistogramBrush from "../brushableHistogram";
import * as globals from "../../globals";
// @ts-expect-error ts-migrate(6142) FIXME: Module './addGenes' was resolved to '/Users/sbadaj... Remove this comment to see the full error message
import AddGenes from "./addGenes";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => {
  return {
    userDefinedGenes: state.controls.userDefinedGenes,
    differential: state.differential,
  };
})
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class GeneExpression extends React.Component {
  props: any;
  render() {
    const { userDefinedGenes, differential } = this.props;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        style={{
          borderBottom: `1px solid ${globals.lighterGrey}`,
        }}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AddGenes />
          {userDefinedGenes.length > 0
            ? _.map(userDefinedGenes, (geneName: any, index: any) => {
                return (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <HistogramBrush
                    key={geneName}
                    field={geneName}
                    zebra={index % 2 === 0}
                    isUserDefined
                  />
                );
              })
            : null}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div>
          {differential.diffExp
            ? _.map(differential.diffExp, (value: any, index: any) => {
                return (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <HistogramBrush
                    key={value[0]}
                    field={value[0]}
                    zebra={index % 2 === 0}
                    isDiffExp
                    logFoldChange={value[1]}
                    pval={value[2]}
                    pvalAdj={value[3]}
                  />
                );
              })
            : null}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default GeneExpression;
