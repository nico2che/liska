import React from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  BrowserRouter,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Calendar from "./containers/Calendar";
import Settings from "./containers/Settings";
import Resources from "./containers/Resources";
import CustomFields from "./containers/CustomFields";
import Users from "./containers/Users";

import TopBar from "./components/TopBar";
import "./App.scss";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    marginTop: "64px",
    height: "calc(100vh - 64px)",
    overflow: "auto",
  },
}));

function PrivateRoute(props) {
  const { user } = useSelector((state) => state.session);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.root}>
        <TopBar />
        <main className={classes.content}>
          <Routes>
            <Route exact path="/" element={<Calendar />} />
            <Route element={<PrivateRoute />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/custom-fields" element={<CustomFields />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
