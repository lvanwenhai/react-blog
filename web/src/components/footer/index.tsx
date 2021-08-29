import React from "react";
import { Tooltip } from "antd";
import {
  GithubOutlined,
  ZhihuOutlined,
  WeiboCircleOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";

import "./index.less";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-info">
        <div>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            关于我
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            关于博客
          </a>
        </div>
        <div>
          <GithubOutlined />
          <ZhihuOutlined />
          <WeiboCircleOutlined />
          <WechatOutlined />
          <QqOutlined />
        </div>
      </div>
      <div className="footer-ICP py-4 fs-2xl">
        <a
          href="http://www.beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @2021 Design and Code by SlamDunk. 鄂ICP备20002324号
        </a>
      </div>
    </footer>
  );
}

export default Footer;
