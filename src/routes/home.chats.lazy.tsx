import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Contacts from "../components/chats/Contacts";
import { getAllUsers } from "../services/user-service";
import NoChat from "../components/chats/NoChat";
import ChatContainer from "../components/chats/ChatContainer";
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
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    } else {
      setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  const handleChatChange = (currentChat) => setCurrentChat(currentChat);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(import.meta.env.VITE_SOCKET);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
      {contacts && (
        <Contacts contacts={contacts} changeChat={handleChatChange} />
      )}
      <main className="flex-auto">
        {" "}
        {!currentChat ? (
          <NoChat />
        ) : (
          <ChatContainer
            currentChat={contacts?.find(
              (contact) => contact._id === Array.from(currentChat).join('')
            )}
            socket={socket}
          />
        )}
      </main>
    </div>
  );
}
