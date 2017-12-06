import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ConNav from "./containers/ConNav";
import ConLogin from "./containers/ConLogin";
import ConSignup from "./containers/ConSignup";
import ConCart from "./containers/ConCart";
import Home from "./page/Home";
import User from "./page/User";
import Order from "./page/Order";
import Manage from "./page/Manage";
import ConProduct from "./containers/ConProduct";
import "whatwg-fetch";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="body">
          <ConNav />
             <div style={{position: "absolute", top: 17, right: 400}}>
            <ConCart/>
          </div>
          
          <Switch>
            <Route path="/manage" component={Manage}/>
            <Route path="/signup" component={ConSignup}/>
            <Route path="/login" component={ConLogin}/>
            <Route path="/user" component={User}/>
            <Route path="/product/:id" component={ConProduct}/>
            <Route path="/manage" component={Manage}/>
            <Route path="/order" component={Order}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
