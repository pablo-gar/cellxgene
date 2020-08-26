// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React, { PureComponent } from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect, shallowEqual } from "react-redux";
import Async from "react-async";

import { categoryLabelDisplayStringLongLength } from "../../../globals";
import calcCentroid from "../../../util/centroid";
import { createColorQuery } from "../../../util/stateManager/colorHelpers";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  annoMatrix: state.annoMatrix,
  colors: state.colors,
  layoutChoice: state.layoutChoice,
  dilatedValue: state.pointDilation.categoryField,
  categoricalSelection: state.categoricalSelection,
  showLabels: state.centroidLabels?.showLabels,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class CentroidLabels extends PureComponent {
  props: any;
  static watchAsync(props: any, prevProps: any) {
    return !shallowEqual(props.watchProps, prevProps.watchProps);
  }

  fetchAsyncProps = async (props: any) => {
    const {
      annoMatrix,
      colors,
      layoutChoice,
      categoricalSelection,
      showLabels,
    } = props.watchProps;
    const { schema } = annoMatrix;
    const { colorAccessor } = colors;

    const [layoutDf, colorDf] = await this.fetchData();
    let labels;
    if (colorDf) {
      labels = calcCentroid(
        schema,
        colorAccessor,
        colorDf,
        layoutChoice,
        layoutDf
      );
    } else {
      labels = new Map();
    }

    const { overlaySetShowing } = this.props;
    overlaySetShowing("centroidLabels", showLabels && labels.size > 0);

    return {
      labels,
      colorAccessor,
      category: categoricalSelection[colorAccessor],
    };
  };

  handleMouseEnter = (e: any, colorAccessor: any, label: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: "category value mouse hover start",
      metadataField: colorAccessor,
      categoryField: label,
    });
  };

  handleMouseOut = (e: any, colorAccessor: any, label: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: "category value mouse hover end",
      metadataField: colorAccessor,
      categoryField: label,
    });
  };

  colorByQuery() {
    const { annoMatrix, colors } = this.props;
    const { schema } = annoMatrix;
    const { colorMode, colorAccessor } = colors;
    return createColorQuery(colorMode, colorAccessor, schema);
  }

  async fetchData() {
    const { annoMatrix, layoutChoice } = this.props;
    // fetch all data we need: layout, category
    const promises = [];
    // layout
    promises.push(annoMatrix.fetch("emb", layoutChoice.current));
    // category to label - we ONLY label on obs, never on X, etc.
    const query = this.colorByQuery();
    if (query && query[0] === "obs") {
      promises.push(annoMatrix.fetch(...query));
    } else {
      promises.push(Promise.resolve(null));
    }

    return Promise.all(promises);
  }

  render() {
    const {
      inverseTransform,
      dilatedValue,
      categoricalSelection,
      showLabels,
      colors,
      annoMatrix,
      layoutChoice,
    } = this.props;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Async
        watchFn={CentroidLabels.watchAsync}
        promiseFn={this.fetchAsyncProps}
        watchProps={{
          annoMatrix,
          colors,
          layoutChoice,
          categoricalSelection,
          dilatedValue,
          showLabels,
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Async.Fulfilled>
          {(asyncProps: any) => {
            if (!showLabels) return null;

            const labelSVGS: any = [];
            const deselectOpacity = 0.375;
            const { category, colorAccessor, labels } = asyncProps;

            labels.forEach((coords: any, label: any) => {
              const selected = category.get(label) ?? true;

              // Mirror LSB middle truncation
              let displayLabel = label;
              if (displayLabel.length > categoryLabelDisplayStringLongLength) {
                displayLabel = `${label.slice(
                  0,
                  categoryLabelDisplayStringLongLength / 2
                )}…${label.slice(-categoryLabelDisplayStringLongLength / 2)}`;
              }

              labelSVGS.push(
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events -- the mouse actions for centroid labels do not have a screen reader alternative
                <Label
                  key={label} // eslint-disable-line react/no-array-index-key --- label is not an index, eslint is confused
                  label={label}
                  dilatedValue={dilatedValue}
                  coords={coords}
                  inverseTransform={inverseTransform}
                  opactity={selected ? 1 : deselectOpacity}
                  colorAccessor={colorAccessor}
                  displayLabel={displayLabel}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseOut={this.handleMouseOut}
                />
              );
            });

            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <>{labelSVGS}</>;
          }}
        </Async.Fulfilled>
      </Async>
    );
  }
}

const Label = ({
  label,
  dilatedValue,
  coords,
  inverseTransform,
  opacity,
  colorAccessor,
  displayLabel,
  onMouseEnter,
  onMouseOut
}: any) => {
  /*
  Render a label at a given coordinate.
  */
  let fontSize = "15px";
  let fontWeight = null;
  if (label === dilatedValue) {
    fontSize = "18px";
    fontWeight = "800";
  }

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <g
      key={label}
      className="centroid-label"
      transform={`translate(${coords[0]}, ${coords[1]})`}
      data-testclass="centroid-label"
      data-testid={`${label}-centroid-label`}
    >
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events --- the mouse actions for centroid labels do not have a screen reader alternative*/}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <text
        transform={inverseTransform}
        textAnchor="middle"
        style={{
          fontSize,
          fontWeight,
          fill: "black",
          userSelect: "none",
          opacity: { opacity },
        }}
        onMouseEnter={(e: any) => onMouseEnter(e, colorAccessor, label)}
        onMouseOut={(e: any) => onMouseOut(e, colorAccessor, label)}
        pointerEvents="visiblePainted"
      >
        {displayLabel}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </text>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </g>
  );
};
export default CentroidLabels;
