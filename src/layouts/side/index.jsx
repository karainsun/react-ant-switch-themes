import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { routeList } from "../../router";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useSelector } from 'react-redux'

const flatRoutes = routeList.filter((item) => item.type === "subMenu");

let rootSubmenuKeys = [];
flatRoutes.forEach((e) => rootSubmenuKeys.push(e.path));

const Side = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [defaultPathname, setDefaultPathname] = useState(pathname);
  const collapsed = useSelector(state => state.collapsed)
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const arr = routeList.map(({ icon, key, name }) => {
      return {
        key,
        icon,
        label: name,
      };
    });
    setMenuData(arr);
  }, []);
  useEffect(() => {
    setDefaultPathname(pathname);
  }, [pathname]);

  return (
    <Layout.Sider
      className={styles.side}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className={styles.logo}>
        <img src="https://cdn.kayrain.cn/titlefont.png" alt="" />
      </div>
      <div className="shadow-lg">
        <Menu
          className={styles.menu}
          theme="light"
          mode="inline"
          selectedKeys={defaultPathname}
          defaultOpenKeys={[pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuData}
          onClick={({ key }) => {
            if (key) {
              navigate(key);
            }
          }}
        />
      </div>
    </Layout.Sider>
  );
};

export default Side;
