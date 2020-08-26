// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-helmet` if it exists... Remove this comment to see the full error message
import Helmet from "react-helmet";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";

// @ts-expect-error ts-migrate(6142) FIXME: Module './framework/container' was resolved to '/U... Remove this comment to see the full error message
import Container from "./framework/container";
// @ts-expect-error ts-migrate(6142) FIXME: Module './framework/layout' was resolved to '/User... Remove this comment to see the full error message
import Layout from "./framework/layout";
// @ts-expect-error ts-migrate(6142) FIXME: Module './leftSidebar' was resolved to '/Users/sba... Remove this comment to see the full error message
import LeftSideBar from "./leftSidebar";
// @ts-expect-error ts-migrate(6142) FIXME: Module './rightSidebar' was resolved to '/Users/sb... Remove this comment to see the full error message
import RightSideBar from "./rightSidebar";
// @ts-expect-error ts-migrate(6142) FIXME: Module './continuousLegend' was resolved to '/User... Remove this comment to see the full error message
import Legend from "./continuousLegend";
// @ts-expect-error ts-migrate(6142) FIXME: Module './graph/graph' was resolved to '/Users/sba... Remove this comment to see the full error message
import Graph from "./graph/graph";
// @ts-expect-error ts-migrate(6142) FIXME: Module './menubar' was resolved to '/Users/sbadajo... Remove this comment to see the full error message
import MenuBar from "./menubar";
// @ts-expect-error ts-migrate(6142) FIXME: Module './autosave' was resolved to '/Users/sbadaj... Remove this comment to see the full error message
import Autosave from "./autosave";
// @ts-expect-error ts-migrate(6142) FIXME: Module './embedding' was resolved to '/Users/sbada... Remove this comment to see the full error message
import Embedding from "./embedding";
// @ts-expect-error ts-migrate(6142) FIXME: Module './termsPrompt' was resolved to '/Users/sba... Remove this comment to see the full error message
import TermsOfServicePrompt from "./termsPrompt";

import actions from "../actions";

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  loading: state.controls.loading,
  error: state.controls.error,
  graphRenderCounter: state.controls.graphRenderCounter,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class App extends React.Component {
  forceUpdate: any;
  props: any;
  componentDidMount() {
    const { dispatch } = this.props;

    /* listen for url changes, fire one when we start the app up */
    window.addEventListener("popstate", this._onURLChanged);
    this._onURLChanged();

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    dispatch(actions.doInitialDataLoad(window.location.search));
    this.forceUpdate();
  }

  _onURLChanged() {
    const { dispatch } = this.props;

    dispatch({ type: "url changed", url: document.location.href });
  }

  render() {
    const { loading, error, graphRenderCounter } = this.props;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Container>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Helmet title="cellxgene" />
        {loading ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            loading cellxgene
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        ) : null}
        {error ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            error loading cellxgene
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        ) : null}
        {loading || error ? null : (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Layout>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LeftSideBar />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {(viewportRef: any) => <>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <MenuBar />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Embedding />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Autosave />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TermsOfServicePrompt />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Legend viewportRef={viewportRef} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Graph key={graphRenderCounter} viewportRef={viewportRef} />
            </>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RightSideBar />
          </Layout>
        )}
      </Container>
    );
  }
}

export default App;
