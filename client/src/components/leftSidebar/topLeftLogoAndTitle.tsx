// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import * as globals from "../../globals";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../framework/logo' was resolved to '/Users... Remove this comment to see the full error message
import Logo from "../framework/logo";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../util/truncate' was resolved to '/Users/... Remove this comment to see the full error message
import Truncate from "../util/truncate";

const DATASET_TITLE_WIDTH = 190;
const DATASET_TITLE_FONT_SIZE = 14;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  datasetTitle: state.config?.displayNames?.dataset ?? "",
  aboutURL: state.config?.links?.["about-dataset"],
  scatterplotXXaccessor: state.controls.scatterplotXXaccessor,
  scatterplotYYaccessor: state.controls.scatterplotYYaccessor,
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class LeftSideBar extends React.Component {
  props: any;
  render() {
    const { datasetTitle, aboutURL } = this.props;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        style={{
          paddingLeft: 8,
          paddingTop: 8,
          width: globals.leftSidebarWidth,
          zIndex: 1,
          borderBottom: `1px solid ${globals.lighterGrey}`,
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Logo size={30} />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <span
          style={{
            fontSize: 28,
            position: "relative",
            top: -6,
            fontWeight: "bold",
            marginLeft: 5,
            color: globals.logoColor,
            userSelect: "none",
          }}
        >
          cell
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <span
            style={{
              position: "relative",
              top: 1,
              fontWeight: 300,
              fontSize: 24,
            }}
          >
            ×
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </span>
          gene
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </span>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          style={{
            fontSize: DATASET_TITLE_FONT_SIZE,
            position: "relative",
            top: -6,
            display: "inline-block",
            width: DATASET_TITLE_WIDTH,
            marginLeft: "7px",
            height: "1.2em",
            overflow: "hidden",
            wordBreak: "break-all",
          }}
        >
          {aboutURL ? (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Truncate>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <a
                style={{ width: 185 }}
                href={aboutURL}
                data-testid="header"
                target="_blank"
                rel="noopener noreferrer"
              >
                {datasetTitle}
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </a>
            </Truncate>
          ) : (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Truncate>
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <span style={{ width: 185 }} data-testid="header">
                {datasetTitle}
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </span>
            </Truncate>
          )}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    );
  }
}

export default LeftSideBar;
