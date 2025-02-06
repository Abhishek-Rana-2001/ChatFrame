import React from "react";
import { IoMdClose } from "react-icons/io";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import { LiaArrowLeftSolid } from "react-icons/lia";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatContext();
  const { onlineUsers } = useAuthContext();

  return (
    <div className="flex px-4 py-3 items-center gap-2 text-white bg-interact">
      <LiaArrowLeftSolid size={25} className="hover:cursor-pointer" onClick={()=>setSelectedUser(null)}/>
      <div className="flex items-center">
        <div className="">
          <img className="size-16 rounded-full object-cover" src={selectedUser.profilePic ? selectedUser.profilePic : "/avatar.png"} alt="" />
        </div>
        <div className="flex-1 px-1">
          <h3 className="font-medium">{selectedUser?.fullName}</h3>
          <p className="text-xs">
            {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
