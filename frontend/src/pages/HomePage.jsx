import Wrapper from "../components/Wrapper";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  return (
    <Wrapper className={"overflow-hidden h-screen"}>
      <div className="flex h-full overflow-hidden">
        <SideBar/>
        <ChatContainer />
      </div>
    </Wrapper>
  );
};

export default HomePage;
