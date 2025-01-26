import { Outlet } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext";

function App() {
  const { checkAuth, isCheckingLogin, onlineUsers } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingLogin) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="bg-primary"
      // style={{
      //   backgroundImage: "url(/texture-background.jpg)",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <ChatProvider>
        <Toaster position="top-right" />
        <Outlet />
      </ChatProvider>
    </div>
  );
}

export default App;
