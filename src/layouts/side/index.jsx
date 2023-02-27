import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { routeList } from "../../router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useSelector } from 'react-redux'

const { SubMenu } = Menu;
const flatRoutes = routeList.filter((item) => item.type === "subMenu");

let rootSubmenuKeys = [];
flatRoutes.forEach((e) => rootSubmenuKeys.push(e.path));

const Side = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [defaultPathname, setDefaultPathname] = useState(pathname);
  const collapsed = useSelector(state => state.collapsed)
  const [openKeys, setOpenkeys] = useState([]);
  const getOpenKes = (path) => {
    return [path.split("/").map((i) => "/" + i)[1]];
  };
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
    // 设置当前展开菜单
    setOpenkeys(getOpenKes(pathname));
    setDefaultPathname(pathname);
  }, [pathname]);

  const renderMenu = (list) => {
    return list.map((item) => {
      if (item.children && item.type === "subMenu") {
        return (
          <SubMenu key={item.key} title={item.name} icon={<item.icon />}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            title={item.name}
            icon={item.type === "menuItem" ? "" : <item.icon />}
          >
            <Link to={item.path} replace>
              {item.name}
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenkeys(keys);
    } else {
      setOpenkeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

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
