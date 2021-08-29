import React, { FC, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Music } from "music-audio-player";
import "music-audio-player/dist/index.css";
// import enUS from 'antd/es/locale/en_US';
// import zhCN from 'antd/es/locale/zh_CN';
import Index from "./pages/Index";
import "./App.less";

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
  const goTop = () => {
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0 
    $("html,body").animate({ scrollTop: 0 }, 1000);
  }
  return (
    <ConfigProvider>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
      <Music />
      <div
        className="cd-top faa-float animated"
        style={{ top: isScrolling ? "-243px" : "-900px" }}
        onClick={goTop}
      />
    </ConfigProvider>
  );
};

export default App;
