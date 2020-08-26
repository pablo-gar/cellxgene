// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React, { PureComponent, cloneElement } from "react";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../graph.css' or its correspon... Remove this comment to see the full error message
import styles from "../graph.css";

type State = any;

export default class GraphOverlayLayer extends PureComponent<{}, State> {
  props: any;
  setState: any;
  state: any;
  /*
    This component takes its children (assumed in the data coordinate space ([0, 1] range, origin in bottom left corner))
    and transforms itself multiple times resulting in screen space ([0, screenWidth/Height] range, origin in top left corner)

    Children are assigned in the graph component and must implement onDisplayChange()
   */
  constructor(props: {}) {
    super(props);
    this.state = {
      display: {},
    };
  }

  matrixToTransformString = (m: any) => {
    /* 
      Translates the gl-matrix mat3 to SVG matrix transform style

                            mat3                    SVG Transform Function          
        a  c  e       
        b  d  f / [a, b, 0, c, d, 0, e, f, 1] =>  matrix(a, b, c, d, e, f) / matrix(sx, 0, 0, sy, tx, ty) / matrix(m[0] m[3] m[1] m[4] m[6] m[7])
        0  0  1      
    */
    return `matrix(${m[0]} ${m[1]} ${m[3]} ${m[4]} ${m[6]} ${m[7]})`;
  };

  reverseMatrixScaleTransformString = (m: any) => {
    return `matrix(${1 / m[0]} 0 0 ${1 / m[4]} 0 0)`;
  };

  // This is passed to all children, should be called when an overlay's display state is toggled along with the overlay name and its new display state in boolean form
  overlaySetShowing = (overlay: any, displaying: any) => {
    this.setState((state: any) => {
      return { ...state, display: { ...state.display, [overlay]: displaying } };
    });
  };

  render() {
    const {
      cameraTF,
      modelTF,
      projectionTF,
      children,
      handleCanvasEvent,
      width,
      height,
    } = this.props;
    const { display } = this.state;

    if (!cameraTF) return null;

    const displaying = Object.values(display).some((value) => value); // check to see if at least one overlay is currently displayed

    const inverseTransform = `${this.reverseMatrixScaleTransformString(
      modelTF
    )} ${this.reverseMatrixScaleTransformString(
      cameraTF
    )} ${this.reverseMatrixScaleTransformString(
      projectionTF
    )} scale(1 2) scale(1 ${1 / -height}) scale(2 1) scale(${1 / width} 1)`;

    // Copy the children passed with the overlay and add the inverse transform and onDisplayChange props
    const newChildren = React.Children.map(children, (child: any) => cloneElement(child, {
      inverseTransform,
      overlaySetShowing: this.overlaySetShowing,
    })
    );

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <svg
        className={styles.graphSVG}
        width={width}
        height={height}
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          backgroundColor: displaying ? "rgba(255, 255, 255, 0.55)" : "",
        }}
        onMouseMove={handleCanvasEvent}
        onWheel={handleCanvasEvent}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <g
          id="canvas-transformation-group-x"
          transform={`scale(${width} 1) scale(.5 1) translate(1 0)`}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <g
            id="canvas-transformation-group-y"
            transform={`scale(1 ${-height}) translate(0 -1) scale(1 .5) translate(0 1)`}
          >
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <g
              id="projection-transformation-group"
              transform={this.matrixToTransformString(projectionTF)}
            >
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <g
                id="camera-transformation-group"
                transform={this.matrixToTransformString(cameraTF)}
              >
                {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                <g
                  id="model-transformation-group"
                  transform={this.matrixToTransformString(modelTF)}
                >
                  {newChildren}
                {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
                </g>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </g>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </g>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </g>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </g>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </svg>
    );
  }
}
