import React, { Component } from "react";
import Home from "./components/Home";
import CustomNavbar from "./components/CustomNavbar";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App() {
  const token = localStorage.getItem("auth-token");

  return (
    <div>
      <Router>
        <CustomNavbar />
        {token ? (
          <>
            {/* private route */}
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <LandingPage></LandingPage>
          </>
        )}
      </Router>
    </div>
  );
}
