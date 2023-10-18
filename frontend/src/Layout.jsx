import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <Navbar />
      {children}
    </BrowserRouter>
  );
};

export default Layout;
