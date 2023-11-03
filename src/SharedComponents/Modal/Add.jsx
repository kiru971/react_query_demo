import React, { useContext } from "react";
import PostForm from "../PostForm";
import { MdClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../../service/api/user";
import { ReactContext } from "../../context/ReactContext";

const Add = ({ item, setToggle }) => {
  const queryClient = useQueryClient();
  const { addUser } = useContext(ReactContext);
  const mutationPost = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleAdd = (post) => {
    console.log(post);
    addUser({ id: Date.now(), ...post });
    mutationPost.mutate({
      ...post,
    });
  };

  return (
    <div className="bg-opacity-25 bg-black backdrop-blur-xs fixed inset-0 flex justify-center items-center">
      <div className="w-[550px] bg-white rounded-md p-5">
        <div className="flex justify-between mb-3 ">
          <h1 className="text-2xl font-medium">Add</h1>
          <MdClose onClick={() => setToggle(false)} />
        </div>
        <hr />
        <PostForm
          initialValue={{}}
          onSubmit={handleAdd}
          item={item}
          setToggle={setToggle}
        />
      </div>
    </div>
  );
};

export default Add;
