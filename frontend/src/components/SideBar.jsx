import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../components/Button"

const SideBar = () => {
      const { logout, user } = useAuthContext();
     
    const { getUsers, users, setSelectedUser } = useChatContext();


     useEffect(() => {
        if (user) {
          getUsers();
        }
      }, []);


      const handleClick = (user)=>{
          setSelectedUser(user)
      }


  return (
    <div className="w-[30%] min-w-[320px] flex-[0,0,40%] p-2 flex flex-col gap-5 border-r">
            <div className="flex justify-between">
              <h2 className="md:text-4xl">Chats</h2>
              <Button onClick={()=>logout()}>Logout</Button>
            </div>
            <div className="flex gap-2 items-center border rounded-lg p-2"><IoSearchOutline size={20} /><input className="w-full" placeholder="Search" /></div>
            {
                users?.map((user, index)=>{
                    return <div key={index} onClick={()=>handleClick(user)} className="flex p-1 gap-3 items-center hover:cursor-pointer hover:bg-neutral-200">
                    <img className="size-10 rounded-full object-cover" src={user.profilePic} alt="" />
                    <div className="border-b border-neutral-200 flex-1 p-3">{user.fullName}</div>
                 </div>
                })
            }
        </div>
  )
}

export default SideBar
