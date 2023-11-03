import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactContext } from "../../context/ReactContext";

const Login = () => {
  const navigate = useNavigate();
  const [users, setUser] = useState({
    username: "",
    email: "",
  });
  const { user } = useContext(ReactContext);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("username"));
    console.log(item);
    const item2 = JSON.parse(localStorage.getItem("email"));
    if (item && item2) {
      navigate("/home");
    }
    return navigate("/login");
  }, []);

  const handleInput = (e) => {
    setUser({
      ...users,
      [e.target.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userCheck = user.find(
      (val) => val.username === users.username && val.email === users.email
    );
    if (userCheck) {
      localStorage.setItem("username", JSON.stringify(users.username));
      localStorage.setItem("email", JSON.stringify(users.email));
      navigate("/home");
      setUser({
        username: "",
        email: "",
      });
    } else {
      alert("Invalid username and email");
    }
  };

  return (
    <div className="bg-white w-[475px] rounded-2xl p-8 flex flex-col gap-10">
      <h1 className="text-3xl text-center text-[#A700D0] font-bold  flex gap-x-2 self-center">
        <div className="h-8 w-2 border border-[#A700D0] bg-[#A700D0]"></div>
        Dartsiders CRUD
      </h1>
      <div className="text-center">
        <h2 className="text-xl text-center text-[#A700D0] font-bold">
          LOGIN IN
        </h2>
        <small className="text-gray-500">
          Enter your credentials to access your account
        </small>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <div className="text-sm pb-2 text-[#6C6C6C]">
            <label>Name</label>
          </div>
          <div>
            <input
              className="placeholder:text-xs placeholder:text-[#CDCDCD] border border-gray-200 p-2 w-full focus:outline-none"
              type="text"
              name="username"
              placeholder="Enter your name"
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <div className="text-sm pb-2 text-[#6C6C6C]">
            <label>Email</label>
          </div>
          <div>
            <input
              className="placeholder:text-xs placeholder:text-[#CDCDCD] border border-gray-200 p-2 w-full focus:outline-none"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <button
            className="bg-[#A700D0] w-full text-white p-2 mt-5"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
