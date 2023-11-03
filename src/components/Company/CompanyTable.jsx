import React, { useContext, useState } from "react";
import { ReactContext } from "../../context/ReactContext";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Edit from "../../SharedComponents/Modal/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../service/api/user";

const CompanyTable = ({ currentItems }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState();

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

  return (
    <div>
      <table className="w-full  text-left">
        <thead>
          <tr className="text-[#ACACAC] text-xs">
            <th className="p-3">Name</th>
            <th className="p-3">Address</th>
            <th className="p-3">City</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item) => {
            return (
              <>
                <tr key={item.id} className="bg-white text-sm">
                  <td className="p-3 ">{item.company.name}</td>
                  <td className="p-3">{item.address.street}</td>
                  <td className="p-3">{item.address.city}</td>
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
      {open && <Edit item={data} setOpen={setOpen} value="company" />}
    </div>
  );
};

export default CompanyTable;
