import * as React from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ShopOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/', // 对应的path
    icon: <HomeOutlined />, // 图标名称
  },
  {
    title: '博文',
    key: '/blogs',
    icon: <UserOutlined />
  },
  {
    title: '关于',
    key: '/about',
    icon: <AppstoreOutlined />,
    children: [ // 子菜单列表
      {
        title: '关于我',
        key: '/about/aboutMe',
        icon: <BarsOutlined />
      },
      {
        title: '关于博客',
        key: '/about/aboutBlog',
        icon: <ShopOutlined />
      },
      {
        title: '统计',
        key: '/about/statistics',
        icon: <ShopOutlined />
      },
    ]
  },
  {
    title: '留言板',
    key: '/message',
    icon: <KeyOutlined />,
  }
]
export default menuList