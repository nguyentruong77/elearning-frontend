import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout(props) {
  return (
    <>
      <Header {...props}/>
      <Outlet />
      <Footer />
    </>
  );
}
