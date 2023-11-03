import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deletePost } from "../../service/api/user";

const Delete = ({ onDel }) => {
  const id = onDel;
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const onSubmit = (id) => {
    deletePostMutation.mutate(id);
  };
  return <div>Delete</div>;
};

export default Delete;
