import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
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
  const [contacts, setContacts] = useState([
    {
      id: 1,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
      email: "kristen.cooper@example.com",
    },
    {
      id: 6,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
      email: "brian.kim@example.com",
      status: "Active",
    },
    {
      id: 7,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
      email: "michael.hunt@example.com",
    },
    {
      id: 8,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
      email: "samantha.brooks@example.com",
    },
    {
      id: 9,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
      email: "frank.harrison@example.com",
    },
    {
      id: 10,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
      email: "emma.adams@example.com",
    },
    {
      id: 11,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
      email: "brandon.stevens@example.com",
    },
    {
      id: 12,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
      email: "megan.richards@example.com",
    },
    {
      id: 13,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
      email: "oliver.scott@example.com",
    },
    {
      id: 14,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
      email: "grace.allen@example.com",
    },
    {
      id: 15,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
      email: "noah.carter@example.com",
    },
    {
      id: 16,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
      email: "ava.perez@example.com",
    },
    {
      id: 17,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
      email: "liam.johnson@example.com",
    },
    {
      id: 18,
      imgUrl: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
      email: "sophia.taylor@example.com",
    },
   
  ]);
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

  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     if (currentUser) {
  //       const { data: contacts } = await axios.get(
  //         `${allUsersRoute}/${currentUser._id}`
  //       );
  //       setContacts(contacts);
  //     }
  //   };
  //   fetchContacts();
  // }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="flex justify-center h-full">
      <Contacts contacts={contacts} changeChat={handleChatChange} />
      {/* {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )} */}
      
      <main className="flex-auto">// Content</main>
    </div>
  );
}
