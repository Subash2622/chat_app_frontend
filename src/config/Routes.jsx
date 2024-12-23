import React from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import JoinCreateChat from "../components/JoinCreateChat";
import ChatPage from "../components/ChatPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/joincreatechat" element={<JoinCreateChat />} />
    </Routes>
  );
};

export default AppRoutes;
