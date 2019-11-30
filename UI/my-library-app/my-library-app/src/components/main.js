import React, { Component } from "react";
import { Route } from "react-router-dom";
import index from "./index";
import search from "./search";
import bookinfo from "./bookinfo";
import login from "./login";
import logout from "./logout";
import Requests from "./Requests";
import Returns from "./Returns";
import MyBooks from "./MyBooks";

class main extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact={true} component={index} />
        <Route path="/search" component={search} />
        <Route path="/bookinfo" component={bookinfo} />
        <Route path="/login" component={login} />
        <Route path="/logout" component={logout} />
        <Route path="/Requests" component={Requests} />
        <Route path="/Returns" component={Returns} />
        <Route path="/MyBooks" component={MyBooks} />
      </div>
    );
  }
}

export default main;
