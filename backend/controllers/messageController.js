// get all users except the logged in user

import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/User.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count number of messages not seen
    const unseenMessages = {};

    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: userId,
        receiverId: user._id,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (error) {
    console.error("Error getting users for sidebar:", error);
    res
      .status(500)
      .json({ message: "Server error during getting users for sidebar" });
  }
};

// get all messages for a user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });
    await Message.updateMany(
      {
        receiverId: myId,
        senderId: selectedUserId,
      },
      { seen: true }
    );
    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Server error during getting messages" });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// send message to selected user

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
