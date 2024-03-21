import apiClient from "./api-client";

interface Message {
  from: string;
  to: string;
  message: string;
}

interface getMessage {
  from: string;
  to: string;
}

export const addMessage = async (message: Message) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.post("/messages/addMsg", message, {
    headers: { Authorization: `JWT ${accessToken}` },
  });
  return data;
};

export const getMessages = async (message: getMessage) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.post("/messages/getMsg", message, {
    headers: { Authorization: `JWT ${accessToken}` },
  });
  return data;
};
