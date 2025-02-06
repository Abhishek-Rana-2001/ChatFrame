import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { axiosInstance, baseURL } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingLogin, setIsCheckingLogin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketInstance, setSocketInstance] = useState(null);

  const checkAuth = useCallback(async () => {
    setIsCheckingLogin(true);
    await axiosInstance
      .get("/auth/check")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setIsCheckingLogin(false);
      });
  }, []);

  const updateProfile = async (data) => {
    await axiosInstance.put(`/auth/updateProfile`, data).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      }
    }).catch((error)=>{
      console.log(error)
    })
  };

  const login = async (email, password) => {
    setIsLoggingIn(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      setUser(response.data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const signUp = async (fullName, email, password) => {
    return await axiosInstance.post("/auth/signup", {
      fullName,
      email,
      password,
    });
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        setUser(null);
        disconnectSocket()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectSocket = () => {

    if (!user || socketInstance?.connected) return;

    const socket = io(baseURL, {
      query:{
        userId: user._id
      }
    });
    setSocketInstance(socket);
    socket.connect();

    socket.on("getOnlineUsers", (userIds)=>{
      setOnlineUsers(userIds)
    })

  };

  useEffect(()=>{
      if(user){
        connectSocket();
      }
  },[user])

  const disconnectSocket = () => {
    if (socketInstance?.connected) {
      socketInstance.disconnect();
      setSocketInstance(null);
      }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkAuth,
        login,
        logout,
        isLoggingIn,
        isCheckingLogin,
        signUp,
        isUpdatingProfile,
        setIsUpdatingProfile,
        updateProfile,
        onlineUsers,
        setOnlineUsers,
        socketInstance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
