import { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import { IoSearch } from "react-icons/io5";
import Button from "../components/Button";

const SideBar = () => {
  const { logout, user, onlineUsers } = useAuthContext();

  const { getUsers, users, setSelectedUser, selectedUser, filteredUsers, setFilteredUsers } = useChatContext();

  const handleSearch = (e)=>{
    if(!users) return;
    const searchValue = e.target.value;
    const filteredUsers = users.filter(user => user.fullName.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredUsers(filteredUsers)
  }

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, []);

  // const [hasFiltereUsersUpdated, setHasFiltereUsersUpdated] = useState(false)
  // useEffect(()=>{
  //    if(filteredUsers.length > 0 && !hasFiltereUsersUpdated){
  //     setFilteredUsers(prev=>([...prev, {
  //       "_id": "678e9fa53e1563a5c07a537s",
  //       "fullName": "johny boy",
  //       "email": "johny@gmail.com",
  //       // "profilePic": "https://res.cloudinary.com/dbiprv20u/image/upload/v1737400301/eqd6fqdhf6kknqhedc6.jpg",
  //       "createdAt": "2025-01-20T19:10:29.610Z",
  //       "updatedAt": "2025-01-20T19:11:41.930Z",
  //     }]))
  //     setHasFiltereUsersUpdated(true)
  //    }
  // },[filteredUsers])

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-[30%] min-w-[320px] flex-[0,0,40%] px-2 flex flex-col gap-5  rounded-3xl">
     
     {/* Sidebar header */}
      <div className="bg-white flex flex-col gap-5 p-4 rounded-3xl">
        <div className="flex justify-between ">
          <h2 className="md:text-4xl text-interact font-bold">ChatFrame</h2>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
             
             {/* Search Input */}
        <div className="flex gap-2 items-center border rounded-3xl p-2 px-4">
        <IoSearch size={20} />
          <input onChange={handleSearch} className="w-full focus:outline-none placeholder:text-[10px] placeholder:uppercase placeholder:font-bold placeholder:text-black/70" placeholder="Search" />
        </div>
      </div>

      {/* Chats */}
      <div className="p-4 bg-white rounded-3xl flex-1 flex flex-col gap-3">
        {filteredUsers?.map((user, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(user)}
              className={`flex p-1 px-2 gap-3 items-center hover:cursor-pointer hover:bg-neutral-200 shadow rounded-3xl overflow-x-hidden ${
                selectedUser?._id === user._id ? "bg-interact text-white":""
              }`}
            >
              <div className={`w-max relative before:content-[''] before:absolute before:bottom-[1px] before:right-[2px] before:w-2 before:h-2 before:rounded-full ${onlineUsers?.includes(user._id) ? "before:bg-green-500":"before:bg-neutral-300"}`}>
                <img
                  className="size-10 rounded-full object-cover"
                  src={user.profilePic ? user.profilePic : "/avatar.png"}
                  onError={(e)=>{e.target.onError = null; e.target.src = "/avatar.png"}}
                  alt=""
                />
              </div>
              <div className="flex-1 p-3">
                {user.fullName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
