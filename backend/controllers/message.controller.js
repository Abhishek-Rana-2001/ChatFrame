import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getRelatedUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getRelatedUsers Controller", error);
    res.status(500).json({ message: "Error fetching related users" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const loggedUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: loggedUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: loggedUserId },
      ],
    });

    return res.status(200).json(messages)
  } catch (error) {
    console.log("error in getMessages Controller", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};


export const sendMessage = async(req, res)=>{
  try {
      const {text, image} = req.body;
      const {id:receiverId} = req.params;
      const senderId = req.user._id;

      let imageUrl;
      if(image){
               const uploadResponse = await cloudinary.uploader.upload(image);
               imageUrl = uploadResponse.secure_url;
               }
               const newMessage = await Message.create({
                senderId,
                receiverId,
                text,
                image:imageUrl
                });

                const receiverSocketId = getReceiverSocketId(receiverId);
                if(receiverSocketId){
                  io.to(receiverSocketId).emit("newMessage",newMessage)
                }

                res.status(201).json(newMessage);

                // Todo : Socket.io implementation
  } catch (error) {
    console.log("error in sendMessage Controller", error);
    res.status(500).json({ message: "Error sending message" });
    
  }
}
