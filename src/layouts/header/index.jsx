import React, { useState } from "react";
import { Layout, Popover } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setCollapsed, setColorPrimary } from "../../store/reducers";
import { themeConfig } from "../../configs/theme";

const HeaderFc = () => {
  const collapsed = useSelector((state) => state.collapsed);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    dispatch(setCollapsed());
  };
  const text = () => <div>切换主题</div>;
  const content = () => (
    <div className={styles.themeBox}>
      {Object.entries(themeConfig).map((c, i) => {
        return (
          <span
            onClick={() => checkTheme(c[1])}
            key={c[0]}
            style={{ backgroundColor: c[1].colorPrimary }}
          ></span>
        );
      })}
    </div>
  );
  const checkTheme = (c) => {
    setOpen(false);
    dispatch(setColorPrimary(c));
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Layout.Header className={styles.header}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: toggleMenu,
      })}
      <Popover
        placement="bottom"
        title={text}
        content={content}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <SkinOutlined
          style={{ marginLeft: "20px" }}
          className={styles.pointHover}
          title="换肤"
          onClick={() => setOpen(!open)}
        />
      </Popover>
    </Layout.Header>
  );
};

export default HeaderFc;
