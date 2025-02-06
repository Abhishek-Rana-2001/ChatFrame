import Wrapper from "../components/Wrapper";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  return (
    <Wrapper className={"overflow-hidden h-full bg-neutral-200 rounded-3xl"}>
      <div className="flex gap-4 h-full overflow-hidden">
        <SideBar/>
        <ChatContainer />
      </div>
    </Wrapper>
  );
};

export default HomePage;
