import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";

const MessagesPreview = () => {
  const { user } = useAuthContext();

  const { messages, setMessages, selectedUser } = useChatContext();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 overflow-x-hidden">
      {messages?.map((message, index) => {
        return (
          <div
            ref={messageEndRef}
            key={index}
            className={`bg-neutral-200 p-1 relative rounded-md border max-w-[500px] w-max px-2 ${
              message.senderId === user._id ? "ml-auto" : ""
            }`}
          >
            <div className={`absolute -bottom-3 ${  message.senderId === user._id ? "right-1" : "left-1" } w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-neutral-200 border-r-[10px] border-r-transparent `}></div>
            <div className=" ">
              {message.text && (
                <span className="text-wrap">{message.text}</span>
              )}
              {message.image && (
                <img className="size-32" src={message.image} alt="image" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesPreview;
