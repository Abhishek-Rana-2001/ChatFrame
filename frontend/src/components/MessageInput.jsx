import { useEffect, useRef, useState } from "react";
import { FaImage, FaLocationArrow } from "react-icons/fa6";
import { useChatContext } from "../context/ChatContext";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";


const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const textRef = useRef(null)
  const { sendMessage } = useChatContext();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = ()=>{
    setImagePreview(null);
    inputRef.current.value = "";
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send Message", error);
    }
  };

  useEffect(()=>{
    textRef?.current?.focus()
  },[])

  return (
    <div className="">
      <form
        className="flex flex-col px-4"
        onSubmit={handleSend}
        >
          {imagePreview && (
            <div className="relative pl-2 pr-5 py-1 bg-neutral-400 rounded-md flex items-center justify-between">
              <img src={imagePreview} alt="Image Preview" className="w-20 h-20 object-cover" />
              <button type="button" className="p-2" onClick={handleRemoveImage}>
                  <IoMdClose size={20}  className="hover:cursor-pointer" />
              </button>
            </div>
          )}
        <div className="flex items-center gap-4 relative">
            <input
              className="flex-1 p-2 border rounded-lg"
              value={text}
              ref={textRef}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a Message..."
            />
            <input
              ref={inputRef}
              onChange={handleImageUpload}
              type="file"
              className="hidden"
            />
            <button type="button" onClick={() => inputRef?.current?.click()}>
              <FaImage size={25} />
            </button>
            <button type="Submit">
              <FaLocationArrow size={25} />
            </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
