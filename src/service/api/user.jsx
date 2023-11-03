import axios from "axios";

export async function getUser() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //console.log(res.data);
  return res.data;
}

export async function updatePost(post) {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/users/${post.id}`,
    post
  );
  console.log(res.data);
  return res.data;
}

export async function addPost(newPost) {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    newPost
  );
  console.log(res.data);
  return res.data;
}

export async function deletePost(id) {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  console.log(res.data);
  return res.data;
}
