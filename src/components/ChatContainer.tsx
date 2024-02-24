import { useEffect, useId, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { User } from "@nextui-org/react";
import useCurrentUser from "../hooks/useCurrentUser";
import axios from "axios";
import { addMessage, getMessages } from "../services/messsage-service";

export default function ChatContainer({ currentChat, socket }) {
  console.log(currentChat);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const id = useId();

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages({
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(messages);
    };
    void fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const currentUser = useCurrentUser();

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    addMessage({
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    setMessages([...messages, { fromSelf: true, message: msg }]);
  };
  console.log(messages);
  return (
    <>
      <User
        name={currentChat.username}
        description={currentChat.email}
        avatarProps={{ src: currentChat.imgUrl }}
        className="w-full p-4 border-b-2 border-divider justify-start rounded-none bg-content2"
      />
      <div className="chat-messages">
        {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={id}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </>
  );
}
