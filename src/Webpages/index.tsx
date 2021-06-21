import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContentPage from "./content";
import LoginPage from "./login";
import RegisterPage from "./register";

export default function indexPage() {
    return (
        <Router>
          <Route exact path="/" component={ContentPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Router>
    )
}