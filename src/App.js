import React from "react";
import "./App.css";
import QueryForm from "./QueryForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <QueryForm />
          </Route>
          <Route exact path="/adminLogin">
            <AdminLogin />
          </Route>
          <Route exact path="/adminDashboard">
            <AdminDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
