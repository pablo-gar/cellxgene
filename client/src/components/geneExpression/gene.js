/*
https://bl.ocks.org/mbostock/4341954
https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
https://bl.ocks.org/SpaceActuary/2f004899ea1b2bd78d6f1dbb2febf771
https://bl.ocks.org/mbostock/3019563
*/
// jshint esversion: 6
import React from "react";
import { Button, ButtonGroup, Tooltip, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import * as globals from "../../globals";
import actions from "../../actions";
import { makeContinuousDimensionName } from "../../util/nameCreators";
import BrushableHistogram from "../brushableHistogram";

@connect((state, ownProps) => {
  const { isObs, isUserDefined, isDiffExp, field } = ownProps;
  const myName = makeContinuousDimensionName(
    { isObs, isUserDefined, isDiffExp },
    field
  );
  return {
    world: state.world,
    isScatterplotXXaccessor: state.controls.scatterplotXXaccessor === field,
    isScatterplotYYaccessor: state.controls.scatterplotYYaccessor === field,
    continuousSelectionRange: state.continuousSelection[myName],
    isColorAccessor: state.colors.colorAccessor === field,
  };
})
class Gene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };

    this.marginLeft = 10; // Space for 0 tick label on X axis
    this.marginRight = 54; // space for Y axis & labels
    this.marginBottom = 25; // space for X axis & labels
    this.marginTop = 3;

    this.width = 340 - this.marginLeft - this.marginRight;
    this.height = 135 - this.marginTop - this.marginBottom;
  }

  static getColumn(world, field, clipped = true) {
    /*
    Return the underlying Dataframe column for our field.   By default,
    returns the clipped column.   If clipped===false, will return the
    unclipped column.
    */
    const obsAnnotations = clipped
      ? world.obsAnnotations
      : world.unclipped.obsAnnotations;
    const varData = clipped ? world.varData : world.unclipped.varData;
    if (obsAnnotations.hasCol(field)) {
      return obsAnnotations.col(field);
    }
    return varData.col(field);
  }

  removeHistogram = () => {
    const {
      dispatch,
      field,
      isColorAccessor,
      isScatterplotXXaccessor,
      isScatterplotYYaccessor,
    } = this.props;
    dispatch({
      type: "clear user defined gene",
      data: field,
    });
    if (isColorAccessor) {
      dispatch({
        type: "reset colorscale",
      });
    }
    if (isScatterplotXXaccessor) {
      dispatch({
        type: "set scatterplot x",
        data: null,
      });
    }
    if (isScatterplotYYaccessor) {
      dispatch({
        type: "set scatterplot y",
        data: null,
      });
    }
  };

  handleSetGeneAsScatterplotX = () => {
    const { dispatch, field } = this.props;
    dispatch({
      type: "set scatterplot x",
      data: field,
    });
  };

  handleSetGeneAsScatterplotY = () => {
    const { dispatch, field } = this.props;
    dispatch({
      type: "set scatterplot y",
      data: field,
    });
  };

  handleColorAction = () => {
    const { dispatch, field, world, ranges } = this.props;

    if (world.obsAnnotations.hasCol(field)) {
      dispatch({
        type: "color by continuous metadata",
        colorAccessor: field,
        rangeForColorAccessor: ranges,
      });
    } else if (world.varData.hasCol(field)) {
      dispatch(actions.requestSingleGeneExpressionCountsForColoringPOST(field));
    }
  };

  render() {
    const {
      field,
      isColorAccessor,
      isUserDefined,
      isDiffExp,
      logFoldChange,
      pvalAdj,
      isScatterplotXXaccessor,
      isScatterplotYYaccessor,
      zebra,
    } = this.props;
    const { isExpanded } = this.state;
    const fieldForId = field.replace(/\s/g, "_");

    return (
      <div
        id={`histogram_${fieldForId}`}
        data-testid={`histogram-${field}`}
        data-testclass={
          isDiffExp
            ? "histogram-diffexp"
            : isUserDefined
            ? "histogram-user-gene"
            : "histogram-continuous-metadata"
        }
        style={{
          padding: globals.leftSidebarSectionPadding,
          backgroundColor: zebra ? globals.lightestGrey : "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "8px",
          }}
        >
          <div>{field}</div>
          <div>
            {isDiffExp || isUserDefined ? (
              <span>
                <ButtonGroup>
                  <Button
                    data-testid={`plot-x-${field}`}
                    onClick={this.handleSetGeneAsScatterplotX}
                    active={isScatterplotXXaccessor}
                    small
                    minimal
                    intent={isScatterplotXXaccessor ? "primary" : "none"}
                  >
                    x
                  </Button>
                  <Button
                    data-testid={`plot-y-${field}`}
                    onClick={this.handleSetGeneAsScatterplotY}
                    active={isScatterplotYYaccessor}
                    small
                    minimal
                    intent={isScatterplotYYaccessor ? "primary" : "none"}
                  >
                    y
                  </Button>
                </ButtonGroup>
              </span>
            ) : null}
            {isUserDefined ? (
              <Button
                minimal
                small
                onClick={this.removeHistogram}
                icon="delete"
                style={{
                  color: globals.blue,
                  cursor: "pointer",
                }}
              />
            ) : null}
            <Tooltip
              content="Use as color scale"
              position="bottom"
              hoverOpenDelay={globals.tooltipHoverOpenDelay}
            >
              <Button
                onClick={this.handleColorAction}
                active={isColorAccessor}
                intent={isColorAccessor ? "primary" : "none"}
                data-testclass="colorby"
                data-testid={`colorby-${field}`}
                minimal
                small
                icon="tint"
              />
            </Tooltip>
          </div>
        </div>

        {isExpanded ? (
          <BrushableHistogram
            field={field}
            pvalAdj={pvalAdj}
            logFoldChange={logFoldChange}
          />
        ) : (
          <Occupancy
            categoryValue={value}
            colorAccessor={colorAccessor}
            metadataField={metadataField}
            world={world}
            colorScale={colorScale}
            colorByIsCategorical={!!categoricalSelection[colorAccessor]}
          />
        )}
      </div>
    );
  }
}

export default Gene;
