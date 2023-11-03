import React, { useContext, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Edit from "../../SharedComponents/Modal/Edit";
import { ReactContext } from "../../context/ReactContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../service/api/user";

const HomeTable = ({ currentItems }) => {
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState();
  const { deleteUser } = useContext(ReactContext);
  const handleClick = (item) => {
    setOpen(true);
    setdata(item);
  };
  const queryClient = useQueryClient();
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

  return (
    <div>
      <table className="w-full  text-left">
        <thead>
          <tr className="text-[#ACACAC] text-xs">
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="bg-white text-sm">
                <td className="p-3">{item.username}</td>
                <td className="p-3">{item.email}</td>
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {open && <Edit item={data} setOpen={setOpen} value="home" />}
    </div>
  );
};

export default HomeTable;
