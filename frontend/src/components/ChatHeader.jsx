import React from "react";
import { IoMdClose } from "react-icons/io";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatContext();
  const { onlineUsers } = useAuthContext();

  return (
    <div className="flex px-4 items-center text-white bg-emerald-600">
      <div className="p-2">
        <img className="size-12 rounded-full" src="/avatar.png" alt="" />
      </div>
      <div className="flex-1 px-2">
        <h3 className="font-medium">{selectedUser?.fullName}</h3>
        <p className="text-xs">
          {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
        </p>
      </div>
      <div className="hover:cursor-pointer p-2">
        <IoMdClose size={20} onClick={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};

export default ChatHeader;
