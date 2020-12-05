import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
//import ReactGA from "react-ga";
import FirstPage from "./views/FirstPage.js";
import Signup from "./views/signup.js";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import removingItems from "./components/sections/removingItems";
import submittingItems from "./components/sections/submittingItems";
import NoLogIn from "./components/sections/nologin";

// Initialize Google Analytics
/*
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
*/

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute
            exact
            path="/"
            component={FirstPage}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/home/"
            component={Home}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/signup/"
            component={Signup}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/removeitem/"
            component={removingItems}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/submittingitem/"
            component={submittingItems}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/nologin/"
            component={NoLogIn}
            layout={LayoutDefault}
          />
        </Switch>
      )}
    />
  );
};

export default App;
