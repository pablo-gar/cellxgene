// jshint esversion: 6
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { Button, Popover, Menu, MenuItem, Position } from "@blueprintjs/core";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";

const InformationMenu = React.memo((props: any) => {
  const { libraryVersions, aboutLink, tosURL, privacyURL } = props;
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={`bp3-button-group ${styles.menubarButton}`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Popover
        content={
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Menu>
            {aboutLink ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <MenuItem
                href={aboutLink}
                target="_blank"
                icon="document-open"
                text="About this dataset"
              />
            ) : (
              ""
            )}

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              href="https://chanzuckerberg.github.io/cellxgene/"
              target="_blank"
              icon="help"
              text="Help"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              href="https://join-cellxgene-users.herokuapp.com/"
              target="_blank"
              icon="chat"
              text="Chat"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              href="https://github.com/chanzuckerberg/cellxgene"
              target="_blank"
              icon="git-branch"
              text="Github"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem
              target="_blank"
              text={
                libraryVersions && libraryVersions.cellxgene
                  ? libraryVersions.cellxgene
                  : null
              }
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MenuItem text="MIT License" />
            {tosURL ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <MenuItem href={tosURL} target="_blank" text="Terms of Service" />
            ) : null}
            {privacyURL ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <MenuItem
                href={privacyURL}
                target="_blank"
                text="Privacy Policy"
              />
            ) : null}
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button
          type="button"
          className="bp3-button bp3-icon-info-sign"
          style={{
            cursor: "pointer",
          }}
        />
      </Popover>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
});

export default InformationMenu;
