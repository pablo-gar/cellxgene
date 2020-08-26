// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import { useAsync } from "react-async";
import {
  ButtonGroup,
  Popover,
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  Position,
} from "@blueprintjs/core";
import * as globals from "../../globals";
import actions from "../../actions";
import { getDiscreteCellEmbeddingRowIndex } from "../../util/stateManager/viewStackHelpers";

type EmbeddingState = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => {
  return {
    layoutChoice: state.layoutChoice, // TODO: really should clean up naming, s/layout/embedding/g
    schema: state.annoMatrix?.schema,
    crossfilter: state.obsCrossfilter,
  };
})
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class Embedding extends React.PureComponent<{}, EmbeddingState> {
  props: any;
  state: any;
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  handleLayoutChoiceChange = (e: any) => {
    const { dispatch } = this.props;
    dispatch(actions.layoutChoiceAction(e.currentTarget.value));
  };

  render() {
    const { layoutChoice, schema, crossfilter } = this.props;
    const { annoMatrix } = crossfilter;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ButtonGroup
        // @ts-expect-error ts-migrate(2322) FIXME: Property 'style' does not exist on type 'IButtonGr... Remove this comment to see the full error message
        style={{
          position: "absolute",
          display: "inherit",
          left: 8,
          bottom: 8,
          zIndex: 9999,
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Popover
          target={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Tooltip
              content="Select embedding for visualization"
              position="top"
              hoverOpenDelay={globals.tooltipHoverOpenDelay}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                type="button"
                data-testid="layout-choice"
                icon="heatmap"
                // minimal
                id="embedding"
                style={{
                  cursor: "pointer",
                }}
              >
                {layoutChoice?.current}: {crossfilter.countSelected()} out of{" "}
                {crossfilter.size()} cells
              </Button>
            </Tooltip>
          }
          // minimal /* removes arrow */
          position={Position.TOP_LEFT}
          content={
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: 10,
                width: 400,
              }}
            >
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <h1>Embedding Choice</h1>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <p style={{ fontStyle: "italic" }}>
                There are {schema?.dataframe?.nObs} cells in the entire dataset.
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <EmbeddingChoices
                onChange={this.handleLayoutChoiceChange}
                annoMatrix={annoMatrix}
                layoutChoice={layoutChoice}
              />
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          }
        />
      </ButtonGroup>
    );
  }
}

export default Embedding;

const loadAllEmbeddingCounts = async ({
  annoMatrix,
  available
}: any) => {
  const embeddings = await Promise.all(
    available.map((name: any) => annoMatrix.base().fetch("emb", name))
  );
  return available.map((name: any, idx: any) => ({
    embeddingName: name,
    embedding: embeddings[idx],
    discreteCellIndex: getDiscreteCellEmbeddingRowIndex(embeddings[idx]),
  }));
};

const EmbeddingChoices = ({
  onChange,
  annoMatrix,
  layoutChoice
}: any) => {
  const { available } = layoutChoice;
  const { data, error, isPending } = useAsync({
    promiseFn: loadAllEmbeddingCounts,
    annoMatrix,
    available,
  });

  if (error) {
    /* log, as this is unexpected */
    console.error(error);
  }
  if (error || isPending) {
    /* still loading, or errored out - just omit counts (TODO: spinner?) */
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RadioGroup onChange={onChange} selectedValue={layoutChoice.current}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {layoutChoice.available.map((name: any) => <Radio label={`${name}`} value={name} key={name} />)}
      </RadioGroup>
    );
  }
  if (data) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RadioGroup onChange={onChange} selectedValue={layoutChoice.current}>
        {data.map((summary: any) => {
          const { discreteCellIndex, embeddingName } = summary;
          const sizeHint = `${discreteCellIndex.size()} cells`;
          return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Radio
              label={`${embeddingName}: ${sizeHint}`}
              // @ts-expect-error ts-migrate(2322) FIXME: Property 'value' does not exist on type 'IControlP... Remove this comment to see the full error message
              value={embeddingName}
              key={embeddingName}
            />
          );
        })}
      </RadioGroup>
    );
  }
  return null;
};
