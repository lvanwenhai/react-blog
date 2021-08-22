import React from "react";
import { Link } from "react-router-dom";

import { Menu } from "antd";
import menuList from "../../../assets/js/menuConfig";

const { SubMenu } = Menu;
const getIsAuth = (item: any, props: any) => {
  let { key, isPublic } = item;
  // let userInfos = JSON.parse(localStorage.userInfos || "{}")
  const userInfos = props.userInfos || {};
  let userName = userInfos.username;
  let menus = userInfos.role_id ? userInfos.role_id.menus : [];
  if (userName === "admin" || isPublic || menus.indexOf(key) !== -1) {
    return true;
  } else if (item.children) {
    let findObj = item.children.find((v: any) => menus.indexOf(v.key) !== -1);
    return !!findObj;
  }
  return false;
};
const getMenuNodes = (List: any, props: any) => {
  // let currentPath = props.location.pathname
  return List.map((item: any) => {
    // let isAuth = getIsAuth(item, props)
    // if (!isAuth) {
    //   return false
    // }
    if (!item.children) {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      );
    } else {
      // let menu = item.children.find(e => currentPath.indexOf(e.key) === 0)
      // if (menu) {
      // this.currentOpen = item.key
      // console.log('currentOpen', this.currentOpen)
      // }
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {getMenuNodes(item.children, props)}
        </SubMenu>
      );
    }
  });
};
const getOpenKey = (path: any) => {
  let openKey = "";
  menuList.forEach((item) => {
    if (item.children) {
      let menu = item.children.find((e) => e.key === path);
      if (menu) {
        openKey = item.key;
      }
    }
  });
  return openKey;
};

const MenuBar = (props: any) => {
  console.log(props);
  let currentPath = props.location.pathname;

  if (currentPath.indexOf("/product") === 0) {
    currentPath = "/product";
  }
  return (
    <Menu
      className="menu-box"
      mode="horizontal"
      selectedKeys={[currentPath]}
      defaultOpenKeys={[getOpenKey(currentPath)]}
      onOpenChange={(openKeys: any) => props.onOpenSubMenu()}
    >
      {getMenuNodes(menuList, props)}
    </Menu>
  );
};
export default MenuBar;
