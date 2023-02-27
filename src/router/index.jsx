import React from "react";
import { AppstoreOutlined, CalendarOutlined } from "@ant-design/icons";
import Home from "../pages/home";
import Setting from "../pages/setting";

export const routeList = [
  {
    path: "/home",
    key: "/home",
    name: "首页",
    element: <Home />,
    icon: <AppstoreOutlined />,
  },
  {
    path: "/setting",
    key: "/setting",
    name: "文章列表",
    element: <Setting />,
    icon: <CalendarOutlined />,
  },
];
