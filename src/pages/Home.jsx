import React from "react";
import Navbar from "../components/SideBar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
