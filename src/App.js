import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import Container from "./layouts/container";
import { useSelector } from 'react-redux'

const App = () => {
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
