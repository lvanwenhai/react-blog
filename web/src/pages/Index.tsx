import React, { FC, useState, useRef, useEffect } from "react";
// import logo from './logo.svg';
// import { Button } from 'antd';
import { ConfigProvider } from "antd";
// import enUS from 'antd/es/locale/en_US';
// import zhCN from 'antd/es/locale/zh_CN';
import { Route, Switch } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

import Home from "./Home";
import Blog from "./Blog";
import About from "./About";
import Message from "./Message";

const App: FC = (props) => {
  console.log(props);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  const scrollListener = () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    setIsScrolling(scrollTop > 0);
  };
  return (
    <ConfigProvider>
      <div>
        <Header isScrolling={isScrolling} {...props}></Header>
        <Switch>
          <Route path="/message" component={Message} />
          <Route path="/about" component={About} />
          <Route path="/blogs" component={Blog} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default App;
