// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react` if it exists or add... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-dom` if it exists or... Remove this comment to see the full error message
import ReactDOM from "react-dom";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-redux` if it exists ... Remove this comment to see the full error message
import { Provider } from "react-redux";
import { FocusStyleManager } from "@blueprintjs/core";

import "./index.css";

/* our code */
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/app' was resolved to '/Users/... Remove this comment to see the full error message
import App from "./components/app";
import store from "./reducers";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Provider store={store}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <App />
  </Provider>,
  document.getElementById("root")
);
