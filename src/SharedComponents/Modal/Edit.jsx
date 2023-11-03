import React, { useContext } from "react";
import PostForm from "../PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../service/api/user";
import { MdClose } from "react-icons/md";
import { ReactContext } from "../../context/ReactContext";

const Edit = ({ item, setOpen, value }) => {
  const queryClient = useQueryClient();
  const { editUser } = useContext(ReactContext);
  const id = item.id;
  const mutationPost = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      console.log(data);
      editUser(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleSubmit = (updatedPost) => {
    console.log(updatedPost.username);
    localStorage.setItem("username", JSON.stringify(updatedPost.username));
    mutationPost.mutate({
      id,
      ...updatedPost,
    });
    setOpen(false);
  };
  return (
    <div className="bg-opacity-25 bg-black backdrop-blur-xs fixed inset-0 flex justify-center items-center">
      <div className="w-[550px] bg-white rounded-md p-5">
        <div className="flex justify-between mb-3 ">
          <h1 className="text-2xl font-medium">Edit</h1>
          <MdClose onClick={() => setOpen(false)} />
        </div>
        <hr />
        <PostForm
          onSubmit={handleSubmit}
          initialValue={item}
          item={value}
          setToggle={setOpen}
        />
      </div>
    </div>
  );
};

export default Edit;
