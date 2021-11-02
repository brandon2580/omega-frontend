import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";


Sentry.init({
  dsn: "https://755067b23d944f3b930be23f8b4d065b@o968252.ingest.sentry.io/5919663",
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Auth0Provider
    domain="auth.sigma7.io"
    clientId="nhoaYEy41X2uaON17iw4eKpD0ZXB0wBG"
    // After a user signs in or creates an account, redirect them to the equity dashboard
    redirectUri={window.location.origin + "/"}
    useRefreshTokens={true}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
