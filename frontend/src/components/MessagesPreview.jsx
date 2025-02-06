import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";

const MessagesPreview = () => {
  const { user } = useAuthContext();

  const { messages } = useChatContext();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 overflow-x-hidden">
      {messages?.map((message, index) => {
        return (
          <div
            ref={messageEndRef}
            key={index}
            className={`bg-interact text-white p-1 relative rounded-xl px-3 border max-w-[500px] w-max ${
              message.senderId === user?._id ? "ml-auto" : ""
            }`}
          >
            <div
              className={`absolute -bottom-[5px] ${
                message.senderId === user?._id
                  ? "-right-[8px] -rotate-45"
                  : "-left-2 rotate-45"
              } w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-interact border-r-[10px] border-r-transparent `}
            ></div>
            <div className=" ">
              {message.text && (
                <span className="text-wrap">{message.text}</span>
              )}
              {message.image && (
                <img className="size-32" src={message.image} alt="image" />
              )}
            </div>
            <span
              className={`text-[10px] block text-white w-max ${
                message.senderId === user._id ? "ml-auto" : ""
              }`}
            >
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesPreview;
