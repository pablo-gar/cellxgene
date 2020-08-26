/* rc slider https://www.npmjs.com/package/rc-slider */

// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../brushableHistogram' was resolved to '/U... Remove this comment to see the full error message
import HistogramBrush from "../brushableHistogram";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  schema: state.annoMatrix?.schema,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Continuous extends React.PureComponent {
  props: any;
  render() {
    /* initial value for iterator to simulate index, ranges is an object */
    const { schema } = this.props;
    if (!schema) return null;
    const obsIndex = schema.annotations.obs.index;
    const allContinuousNames = schema.annotations.obs.columns
      .filter((col: any) => col.type === "int32" || col.type === "float32")
      .filter((col: any) => col.name !== obsIndex)
      .filter((col: any) => !col.writable) // skip user annotations - they will be treated as categorical
      .map((col: any) => col.name);

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div>
        {allContinuousNames.map((key: any, zebra: any) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <HistogramBrush key={key} field={key} isObs zebra={zebra % 2 === 0} />
        ))}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default Continuous;
