"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// };

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("chat context selectedUser", selectedUser);
  const [unseenMessage, setUnseenMessages] = useState({});
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("token", storedToken);
    setToken(storedToken);
  }, []);
  const { socket } = useContext(AuthContext);
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ⬅️ add token here
        },
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages); // make sure naming matches backend
      } else {
        toast.error(data.message || "Failed to get users");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  // function to get messages for selected User

  const getMessages = async (selectedUser) => {
    if (!selectedUser) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/${selectedUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth required
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.messages);
    }
  };

  // function to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/send/${selectedUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ⬅️ FIX
          },
          body: JSON.stringify(messageData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser);
    }
  }, [selectedUser]);

  // function to subscribe to messages for selected user

  const subscribeToMessages = async () => {
    if (!socket) return;
    socket.on("newMessages", async (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        await fetch(
          `http://localhost:5000/api/messages/mark/${newMessage._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth required
            },
          }
        );
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // function to unsubscribe from messages
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessages");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessage,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
