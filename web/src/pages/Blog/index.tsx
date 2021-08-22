import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import BlogList from "./blogList";
import BlogDetails from "./blogDetails";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/blogs" exact component={BlogList}></Route>
          <Route path="/blogs/:id" component={BlogDetails}></Route>
          <Redirect to="/blogs"></Redirect>
        </Switch>
      </div>
    );
  }
}
