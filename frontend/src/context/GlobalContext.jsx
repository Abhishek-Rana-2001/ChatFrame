import { createContext, useCallback, useContext, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthContext";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {


  return (
    <GlobalContext.Provider
      value={{
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AuthProvider");
  }
  return context;
};
