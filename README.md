# 使用 [Ant design5](https://ant.design) 实现主题定制
>本项目使用create-react-app搭建

## 一、在 ConfigProvider 中配置主题(官方示例)
### 修改主题变量
通过在 ConfigProvider 中传入 theme，可以配置主题。在升级 v5 后，将默认使用 v5 的主题，以下是将配置主题示例：
```javascript
import { Button, ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Button />
  </ConfigProvider>
);

export default App;
```
## 二、使用 react-redux 和 @reduxjs/toolkit 封装 store 模块

首先添加主题配置文件 config/theme.js
```javascript
export const themeConfig = {
  blue: {
    colorPrimary: '#1677ff',
  },
  green: {
    colorPrimary: '#00b96b',
  },
  orange: {
    colorPrimary: 'orange',
  },
}
```
store模块添加state和reducers
```javascript
// store/state/index.js
const initState = {
  collapsed: false, // 菜单收起
  theme: {
    colorPrimary: '#1677ff',
  }
};
export default initState;

```
```javascript
// store/reducers/index.js
import { createSlice } from '@reduxjs/toolkit'
import initState from "../state";

const infoSlice = createSlice({
  name: 'info',
  initialState: initState,
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed
    },
    setColorPrimary: (state, action) => {
      state.theme = action.payload
    }
  }
})

export const { setCollapsed, setColorPrimary } = infoSlice.actions
export default infoSlice.reducer

```
在App.js中添加ConfigProvider组件
```javascript
//App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import Container from "./layouts/container";
import { useSelector } from 'react-redux'

const App = () => {
  // useSelector 动态获取主题色
  const colorPrimary = useSelector(state => state.theme.colorPrimary)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
        },
      }}
    >
      <Routes>
        <Route path="/*" element={<Container></Container>}></Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;

```
编辑header组件，以及在组件内使用dispatch修改主题颜色
```javascript
import React, { useState } from "react";
import { Layout, Popover } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
// 使用 useSelector, useDispatch 
import { useSelector, useDispatch } from "react-redux";
// 引入 store 主要方法
import { setCollapsed, setColorPrimary } from "../../store/reducers";
// 引入主题配置文件
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
  // 选择主题
  const checkTheme = (c) => {
    setOpen(false);
    // 使用 dispatch 调用 store 方法
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

```

**完整内容请跳转至[react-ant-switch-themes](https://github.com/karainsun/react-ant-switch-themes)**