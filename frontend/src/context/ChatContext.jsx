import { createContext, useCallback, useContext, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const {socketInstance} = useAuthContext()

  const getUsers = async () => {
    setIsUsersLoading(true);
    try {
      const response = await axiosInstance.get("/message/users");
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsUsersLoading(false);
    }
  };

  const getMessages = async (userId) => {
    setIsMessagesLoading(true);
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      setMessages(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsMessagesLoading(false);
    }
  };


  const sendMessage = async(messageData) =>{
    try {
       const response = await axiosInstance.post(`/message/send/${selectedUser?._id}` , messageData)
       setMessages(prev=>([...prev, response.data]))
    } catch (error) {
      toast.error("Error Sending the Message")
    }
  }


  const subscribeToMessages = ()=>{
    if(!selectedUser) return;

    socketInstance?.on("newMessage", (message)=>{

      if(message.senderId !== selectedUser._id) return;

      setMessages(prev=>([...prev, message]))
    })

  }


  const unsubscribeToMessages = ()=>{
    socketInstance?.off("newMessage");
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        isUsersLoading,
        setIsUsersLoading,
        getUsers,
        getMessages,
        isMessagesLoading,
        setIsMessagesLoading,
        sendMessage,
        subscribeToMessages,
        unsubscribeToMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within an AuthProvider");
  }
  return context;
};
