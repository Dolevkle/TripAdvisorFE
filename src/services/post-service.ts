import apiClient from "./api-client";

export type Comment = {
    content: string;
    responder_id: string;
    userImgUrl: string;
    username: string;
}
export type Post = {
    _id?:string;
  imgUrl: string;
  content: string;
  owner?: string;
  comment?: Comment[];
  userImgUrl?: string;
  username?: string;
};
export const getAllUserPosts = async () => {
    const currentUser = localStorage.getItem("currentUser");
    const { accessToken } = JSON.parse(currentUser);
    const { data } = await apiClient.get("/userPost/user/allPosts",
        {
          headers: { Authorization: `JWT ${accessToken}` },
        }
      );
      console.log(data);
  return data;
};

export const createPost = async (post: Post) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.post(
    "/userPost",
    { ...post },
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );
  return data;
};

export const editPost = async (post: Post) => {
    const currentUser = localStorage.getItem("currentUser");
    const { accessToken } = JSON.parse(currentUser);
    const { data } = await apiClient.put(
      `/userPost/${post._id}`,
      { ...post },
      {
        headers: { Authorization: `JWT ${accessToken}` },
      }
    );
    return data;
  };


