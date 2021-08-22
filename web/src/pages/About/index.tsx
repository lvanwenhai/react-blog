import React from "react";
import { Route, Switch } from "react-router-dom";
import Statistics from "./statistics";
import AboutBlog from "./aboutBlog";
import AboutMe from "./aboutMe";

function About() {
  return (
    <div>
      <Switch>
        <Route path="/about/aboutMe" component={AboutMe} />
        <Route path="/about/aboutBlog" component={AboutBlog} />
        <Route path="/about/statistics" component={Statistics} />
      </Switch>
    </div>
  );
}

export default About;
