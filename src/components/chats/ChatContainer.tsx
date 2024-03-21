import { useEffect, useId, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { Avatar, User } from "@nextui-org/react";
import axios from "axios";
import { addMessage, getMessages } from "../../services/messsage-service";
import { cn } from "../../../utils/cn";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const id = useId();

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages({
        from: currentUser._id,
        to: currentChat?._id,
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
      to: currentChat?._id,
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

  return (
    <>
      <User
        name={currentChat?.username}
        description={currentChat?.email}
        avatarProps={{ src: currentChat?.imgUrl }}
        className="w-full p-4 border-b-2 border-divider justify-start rounded-none bg-content2"
      />
      <div className="overflow-y-auto h-[425px]">
        {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={id}>
              <div
                className={cn(
                  "flex justify-start items-center",
                  message.fromSelf && "flex-row-reverse"
                )}
              >
                <Avatar
                  alt="user avatar"
                  className="w-7 h-7 m-1"
                  src={
                    message.fromSelf ? currentUser?.imgUrl : currentChat?.imgUrl
                  }
                />
                <div
                  className={cn(
                    " m-2 w-fit px-2 rounded-lg text-white",
                    message.fromSelf
                      ? "bg-primary rounded-br-none"
                      : "bg-foreground-500 rounded-bl-none"
                  )}
                >
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
