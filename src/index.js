import React from "react";
import { createRoot } from "react-dom/client";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createTheme, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";

import reducers from "./store";

import App from "./App";
import "./index.scss";

import * as serviceWorker from "./serviceWorker";
import { LocalizationProvider } from "@mui/x-date-pickers";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(
    createLogger({
      collapsed: true,
    })
  );
}

const store = createStore(reducers, applyMiddleware(...middlewares));
const theme = createTheme();

const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        adapterLocale={frLocale}
        dateAdapter={AdapterDateFns}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
