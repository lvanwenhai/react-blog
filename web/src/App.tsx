import React, { FC } from "react";
import "./App.less";
import { Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Music } from "music-audio-player";
import "music-audio-player/dist/index.css";

// import enUS from 'antd/es/locale/en_US';
// import zhCN from 'antd/es/locale/zh_CN';
import Index from "./pages/Index";

const App: FC = (props) => {
  console.log(props);
  return (
    <ConfigProvider>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
      <Music />
    </ConfigProvider>
  );
};

export default App;
