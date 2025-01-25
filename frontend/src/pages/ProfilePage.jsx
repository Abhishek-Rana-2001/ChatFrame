import { useRef } from "react";
import Wrapper from "../components/Wrapper";
import { useAuthContext } from "../context/AuthContext";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const inputRef = useRef(null);
  const { user, isUpdatingProfile, updateProfile } = useAuthContext();

  const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if(!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = async()=>{
        const base64Image = reader.result;
        await updateProfile({profilePic : base64Image});
      }
  };

  return (
    <Wrapper className={"h-screen "}>
      <div className="h-full content-center">
        <div className="max-w-3xl mx-auto space-y-6 p-8 bg-neutral-200 rounded-3xl">
          <h1 className="text-5xl text-center">Profile</h1>

          <div className="flex flex-col gap-3">
            <div className="relative w-max mx-auto">
              <img
                className="size-40 mx-auto rounded-full object-cover border-4 border-emerald-500"
                src={user?.profilePic || "/avatar.png"}
                alt=""
              />
              <div onClick={()=>inputRef?.current?.click()} className="absolute bottom-0 right-0 bg-neutral-400 p-2 rounded-full z-10 hover:cursor-pointer">
                <MdEdit size={25} />
              </div>
              <input ref={inputRef} onChange={handleImageUpload}  type="file" className="hidden" />
            </div>
            <span className="text-xs block mx-auto w-max">Click the pencil icon to change profile pic</span>
          </div>

          <div className="flex flex-col gap-6">
             <label htmlFor="fullName">Name:<input value={user?.fullName} type="text" name="fullName" readOnly className='p-2 rounded-md shadow-sm w-full placeholder:text-sm outline-neutral-400  ' placeholder='Enter your email' /></label>
             <label htmlFor="email">Email:<input value={user?.email} type="text" name="email" readOnly className='p-2 rounded-md shadow-sm w-full placeholder:text-sm outline-neutral-400 ' placeholder='Enter your email' /></label>
          </div>

          <div className="flex justify-between text-sm">
            <span>Joined On:</span>
            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
