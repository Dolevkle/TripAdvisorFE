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
  const { data } = await apiClient.post("/messages/addMsg", message);
  return data;
};

export const getMessages = async (message: getMessage) => {
  const { data } = await apiClient.post("/messages/getMsg", message);
  return data;
};
