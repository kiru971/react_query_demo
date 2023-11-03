import React, { useContext, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import logo from "/home/kiruthika/Documents/React js Task/reactquery-crud/src/assets/pexels-photo-2379004.jpeg";
import { LiaSortSolid } from "react-icons/lia";
import { ReactContext } from "../../context/ReactContext";
import Add from "../../SharedComponents/Modal/Add";
import Edit from "../../SharedComponents/Modal/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../service/api/user";

const Table = ({ currentItems, sort }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState();
  const [toggle, setToggle] = useState();
  const { deleteUser } = useContext(ReactContext);

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleDel = (id) => {
    alert("Do you want to delete");
    deletePostMutation.mutate(id);
    deleteUser(id);
  };
  const handleClick = (item) => {
    setOpen(true);
    setdata(item);
  };
  console.log(currentItems);
  return (
    <div className="w-full  overflow-hidden p-4">
      <div className="flex justify-between p-2">
        <h2 className="font-bold text-2xl">Students List</h2>
        <div>
          <LiaSortSolid
            color="#A700D0"
            size={25}
            style={{ marginRight: 10 }}
            onClick={sort}
          />{" "}
          <button
            className="bg-[#A700D0] text-white h-11 w-48 text-sm rounded"
            onClick={() => setToggle(true)}
          >
            ADD NEW STUDENT
          </button>
          {toggle && <Add setToggle={setToggle} item="add" />}
        </div>
      </div>
      <hr />
      <table className="w-full  text-left">
        <thead>
          <tr className="text-[#ACACAC] text-xs">
            <th></th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Zipcode</th>
            <th className="p-3">Website</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item) => {
            return (
              <>
                <tr key={item.id} className="bg-white text-sm">
                  <td className="p-2">
                    <div className="h-14 w-16 rounded-md">
                      <img src={logo} alt="pic" />
                    </div>
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.address?.zipcode}</td>
                  <td className="p-3">{item.website}</td>
                  <td className="p-3 cursor-pointer text-right">
                    <MdOutlineModeEditOutline
                      color="#A700D0"
                      size={"30px"}
                      onClick={() => handleClick(item)}
                    />{" "}
                    <AiOutlineDelete
                      style={{ marginLeft: 15 }}
                      color="#A700D0"
                      size={"30px"}
                      onClick={() => handleDel(item.id)}
                    />
                  </td>
                </tr>
                <br />
              </>
            );
          })}
        </tbody>
      </table>
      {open && <Edit item={data} setOpen={setOpen} value="edit" />}
    </div>
  );
};

export default Table;
