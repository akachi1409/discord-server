import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
        {authProtectedRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              component={route.component}
              key={idx}
              isAuthProtected={true}
            />
          ))}
          {publicRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
