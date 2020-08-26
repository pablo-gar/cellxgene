// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React, { cloneElement } from "react";
import { Tooltip, Position } from "@blueprintjs/core";

import { tooltipHoverOpenDelayQuick } from "../../globals";

const SPLIT_STYLE = {
  display: "flex",
  overflow: "hidden",
  justifyContent: "flex-start",
};

const FIRST_HALF_STYLE = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flexShrink: 1,
  minWidth: "5px",
};
const SECOND_HALF_STYLE = {
  position: "relative",
  overflow: "hidden",
  whiteSpace: "nowrap",
};
const SECOND_HALF_SPACING_STYLE = {
  color: "transparent",
};

const SECOND_HALF_INNER_STYLE = {
  position: "absolute",
  right: 0,
};

export default (props: any) => {
  const { children } = props;
  // Truncate only support a single child with a text child

  if (
    React.Children.count(children) !== 1 ||
    React.Children.count(children.props?.children) !== 1
  ) {
    throw Error("Only pass a single child with text to Truncate");
  }
  const originalString = children.props.children;

  let firstString;
  let secondString;

  if (originalString.length === 1) {
    firstString = originalString;
  } else {
    firstString = originalString.substr(0, originalString.length / 2);
    secondString = originalString.substr(originalString.length / 2);
    if (firstString.charAt(firstString.length - 1) === " ") {
      firstString = `${firstString.substr(0, firstString.length - 1)}\u00a0`;
    }
    if (secondString.charAt(0) === " ") {
      secondString = `\u00a0${secondString.substr(1)}`;
    }
  }

  const inheritedColor = children.props.style.color;

  const splitStyle = { ...children.props.style, ...SPLIT_STYLE };
  const secondHalfContentStyle = {
    ...SECOND_HALF_INNER_STYLE,
    color: inheritedColor || "inherit",
  };

  const truncatedJSX = (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <span style={splitStyle}>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <span style={FIRST_HALF_STYLE}>{firstString}</span>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <span style={SECOND_HALF_STYLE}>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <span style={SECOND_HALF_SPACING_STYLE}>{secondString}</span>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <span style={secondHalfContentStyle}>{secondString}</span>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </span>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </span>
  );

  // clone children, changing the children(text) to the truncated string
  const newChildren = React.Children.map(children, (child: any) => cloneElement(child, {
    children: truncatedJSX,
    "aria-label": originalString,
  })
  );
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Tooltip
      content={originalString}
      hoverOpenDelay={tooltipHoverOpenDelayQuick}
      position={Position.LEFT}
      usePortal
      modifiers={{
        preventOverflow: { enabled: false },
        hide: { enabled: false },
      }}
    >
      {newChildren}
    </Tooltip>
  );
};
