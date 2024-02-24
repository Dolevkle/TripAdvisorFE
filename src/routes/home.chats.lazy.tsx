import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import { getAllUsers } from "../services/user-service";
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";
// import { allUsersRoute, host } from "../utils/APIRoutes";

export const Route = createLazyFileRoute("/home/chats")({
  component: HomeChats,
});


export default function HomeChats() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser) {
        navigate('/')
    } else {
        setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  const handleChatChange = (currentChat) => setCurrentChat(currentChat);

  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        const users = await getAllUsers(currentUser._id);
        setContacts(users);
      }
    };
    fetchContacts();
  }, [currentUser]);


  return (
    <div className="flex justify-center h-[625px]">
      {contacts && <Contacts contacts={contacts} changeChat={handleChatChange} />}
      {/* {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )} */}
      
      <main className="flex-auto">// Content</main>
    </div>
  );
}
