import React from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import JoinCreateChat from "../components/JoinCreateChat";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<h1>This is a chat</h1>} />
      <Route path="/joincreatechat" element={<JoinCreateChat />} />
    </Routes>
  );
};

export default AppRoutes;
