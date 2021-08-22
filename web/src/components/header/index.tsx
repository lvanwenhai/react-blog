import React, { useState, FC } from "react";
import { Input, Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.less";
import MenuBar from "./menuBar";
// const { Search } = Input;
interface headerProps {
  isScrolling: boolean;
}
const Header: FC<headerProps> = (props: headerProps) => {
  const [current, setCurrent] = useState("mail");
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const downLoad = () => {
    // window.location.href = "https://coco727.oss-cn-hongkong.aliyuncs.com/b779af53356a48eed09560e479cf7bc2.png?attachment=true"
    window.open(
      "https://coco727.oss-cn-hongkong.aliyuncs.com/b779af53356a48eed09560e479cf7bc2.png?attachment=true"
    );
  };
  const { isScrolling } = props;
  return (
    <header
      className={
        isScrolling || isOpenSubMenu ? "header-box showHeader" : "header-box"
      }
    >
      <div>
        <h3>SlamDunk</h3>
      </div>
      <MenuBar
        {...props}
        onOpenSubMenu={() => setIsOpenSubMenu(true)}
      ></MenuBar>
      {/* <Menu className="menu-box" mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
            博文
          </Menu.Item>
          <Menu.SubMenu icon={<SettingOutlined />} title="关于">
            <Menu.Item key="setting:1">关于我</Menu.Item>
            <Menu.Item key="setting:2">关于博客</Menu.Item>
            <Menu.Item key="setting:3">统计</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="alipay">留言版</Menu.Item>
        </Menu> */}

      <div className="search-box">
        <Input
          placeholder="Search..."
          suffix={<SearchOutlined onClick={downLoad} />}
          bordered={false}
        />
      </div>
    </header>
  );
};
export default Header;
