import React from "react";
import { Layout } from "antd";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Header from "../header";
import Side from "../side";
import Home from "../../pages/home";
import Setting from "../../pages/setting";
import style from './index.module.scss'

const Container = () => {
  return (
    <Layout>
      <Side></Side>
      <Layout className="site-layout">
        <Header></Header>
        <Layout.Content className={style.container}>
          <Routes>
            <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Container;
