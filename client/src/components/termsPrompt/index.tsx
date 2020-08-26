// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { connect } from "react-redux";
import {
  Drawer,
  Button,
  Classes,
  Position,
  Colors,
  Icon,
} from "@blueprintjs/core";

const CookieDecision = "cxg.cookieDecision";

function storageGet(key: any, defaultValue = null) {
  try {
    const val = window.localStorage.getItem(key);
    if (val === null) return defaultValue;
    return val;
  } catch (e) {
    return defaultValue;
  }
}

function storageSet(key: any, value: any) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // continue
  }
}

type State = any;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
@connect((state) => ({
  tosURL: state.config?.parameters?.["about_legal_tos"],
  privacyURL: state.config?.parameters?.["about_legal_privacy"],
}))
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
class TermsPrompt extends React.PureComponent<{}, State> {
  drawerClose: any;
  props: any;
  setState: any;
  state: any;
  constructor(props: {}) {
    super(props);
    const { tosURL, privacyURL } = this.props;
    const cookieDecision = storageGet(CookieDecision, null);
    const hasDecided = cookieDecision !== null;
    this.state = {
      hasDecided,
      isEnabled: !!tosURL || !!privacyURL,
      isOpen: !hasDecided,
    };
  }

  componentDidMount() {
    const { hasDecided, isEnabled } = this.state;
    if (isEnabled && !hasDecided) {
      this.setState({ isOpen: true });
    }
  }

  handleOK = () => {
    this.setState({ isOpen: false });
    storageSet(CookieDecision, "yes");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cookieDecisionCallback' does not exist o... Remove this comment to see the full error message
    if (window.cookieDecisionCallback instanceof Function) {
      try {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cookieDecisionCallback' does not exist o... Remove this comment to see the full error message
        window.cookieDecisionCallback();
      } catch (e) {
        // continue
      }
    }
  };

  handleNo = () => {
    this.setState({ isOpen: false });
    storageSet(CookieDecision, "no");
  };

  renderTos() {
    const { tosURL } = this.props;
    if (!tosURL) return null;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Icon icon="info-sign" intent="primary" /> By using this site, you are
        agreeing to our{" "}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <a
          style={{
            fontWeight: 700,
            textDecoration: "underline",
          }}
          href={tosURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of service
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </a>
        .{" "}
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </span>
    );
  }

  renderPrivacy() {
    const { privacyURL } = this.props;
    if (!privacyURL) return null;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span>
        To learn more, read our{" "}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <a
          style={{
            fontWeight: 700,
            textDecoration: "underline",
          }}
          href={privacyURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </a>
        .&nbsp;
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </span>
    );
  }

  render() {
    const { isOpen, isEnabled } = this.state;
    if (!isEnabled || !isOpen) return null;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Drawer
        // @ts-expect-error ts-migrate(2322) FIXME: Property 'onclose' does not exist on type 'IDrawer... Remove this comment to see the full error message
        onclose={this.drawerClose}
        isOpen={isOpen}
        size="120px"
        position={Position.BOTTOM}
        canOutsideClickClose={false}
        hasBackdrop /* if the user can't use the app or click outside to dismiss, that should be visually represented with a backdrop */
        enforceFocus={false}
        autoFocus={false}
        portal={false}
      >
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div
          className={Classes.DRAWER_BODY}
          style={{ backgroundColor: Colors.LIGHT_GRAY1 }}
        >
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className={Classes.DIALOG_BODY}>
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            <div>
              {this.renderTos()}
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              <span>
                We use cookies to help us improve the site and to inform our
                future efforts, and we also use necessary cookies to make our
                site work.&nbsp;
              {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
              </span>
              {this.renderPrivacy()}
            {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
            </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          <div className={Classes.DIALOG_FOOTER} style={{ textAlign: "left" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              intent="primary"
              onClick={this.handleOK}
              data-testid="tos-cookies-accept"
            >
              I&apos;m OK with cookies!
            </Button>{" "}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button onClick={this.handleNo} data-testid="tos-cookies-reject">
              No thanks
            </Button>
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </div>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      </Drawer>
    );
  }
}

export default TermsPrompt;
