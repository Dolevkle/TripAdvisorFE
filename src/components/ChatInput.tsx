import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Input
} from "@nextui-org/react";
import { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="w-full flex fixed bottom-0 bg-content4 items-center">
      {/* <form className="" onSubmit={(event) => sendChat(event)}> */}
        <Input
          size="sm"
          type="text"
          placeholder="Send message"
          className=" py-10 px-10 w-4/6"
          value={msg}
          onValueChange={setMsg}

        />
        <FontAwesomeIcon icon={faPaperPlane} className=' cursor-pointer' onClick={sendChat}/>
      {/* </form> */}
    </div>
  );
}
