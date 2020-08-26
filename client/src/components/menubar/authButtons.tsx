// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
import { AnchorButton, Tooltip } from "@blueprintjs/core";
import * as globals from "../../globals";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './menubar.css' or its correspo... Remove this comment to see the full error message
import styles from "./menubar.css";

const Auth = React.memo((props: any) => {
  const { auth, userinfo } = props;

  if (!auth || (auth && !auth.requires_client_login)) return null;

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={`bp3-button-group ${styles.menubarButton}`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tooltip
        content="Log in or log out of cellxgene"
        position="bottom"
        hoverOpenDelay={globals.tooltipHoverOpenDelay}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnchorButton
          type="button"
          data-testid="auth-button"
          disabled={false}
          icon={!userinfo.is_authenticated ? "log-in" : "log-out"}
          href={!userinfo.is_authenticated ? auth.login : auth.logout}
        >
          {!userinfo.is_authenticated ? "Log In" : "Log Out"}
        </AnchorButton>
      </Tooltip>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
});

export default Auth;
