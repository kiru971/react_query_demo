import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { PiGraduationCapBold } from "react-icons/pi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import logo from "/home/kiruthika/Documents/React js Task/reactquery-crud/src/assets/pexels-photo-2379004.jpeg";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username"));

  const handleOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="sideBar flex basis-80 flex-col gap-20 items-center ">
      <div className="flex flex-col gap-10">
        <div className="flex p-2 gap-2">
          <div className="h-7 w-2 border border-[#A700D0] bg-[#A700D0]"></div>
          <h1 className="text-xl font-bold"> DartSiders CRUD</h1>
        </div>
        <div>
          <div className="h-32 w-32 rounded-full mx-auto">
            <img src={logo} className="img" alt="imags" />
          </div>
          <h1 className="text-center pt-5 font-medium text-xl">{username}</h1>
          <h1 className="text-[#A700D0] text-xs text-center font-medium pt-3">
            Admin
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="text-sm font-medium px-8 py-1 ">
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive
                ? "bg-[#A700D0] h-10 w-48 rounded-md px-7 py-2 flex gap-2"
                : "flex gap-2 px-7 py-2"
            }
          >
            <AiOutlineHome size={"20px"} />
            <h1>Home</h1>
          </NavLink>
        </div>

        <div className="text-sm font-medium px-8 py-1">
          <NavLink
            to="student"
            className={({ isActive }) =>
              isActive
                ? "bg-[#A700D0] h-10 w-48 rounded-md px-7 py-2 flex gap-2 "
                : "flex gap-2 px-7 py-2"
            }
          >
            <PiGraduationCapBold size={"20px"} />
            Students
          </NavLink>
        </div>
        <div className="text-sm px-8 py-1 font-medium">
          <NavLink
            to="company"
            className={({ isActive }) =>
              isActive
                ? "bg-[#A700D0] h-10 w-48 rounded-md px-7 py-2 flex gap-2"
                : "flex gap-2 px-7 py-2"
            }
          >
            <HiOutlineBuildingLibrary size={"20px"} /> Company
          </NavLink>
        </div>
      </div>
      <button onClick={handleOut} className="pb-10 absolute bottom-0">
        Logout <MdLogout style={{ marginLeft: 10 }} />
      </button>
    </div>
  );
};

export default Navbar;
