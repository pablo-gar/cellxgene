// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";

function Container(props: any) {
  const { children } = props;
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div
      className="container"
      style={{
        height: "calc(100vh - (100vh - 100%))",
        width: "calc(100vw - (100vw - 100%))",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {children}
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
}

export default Container;
