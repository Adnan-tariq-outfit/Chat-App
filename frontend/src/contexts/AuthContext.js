"use client";

import { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  /** ---------------------------
   *  LOAD TOKEN FROM LOCALSTORAGE
   * --------------------------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  /** ---------------------------
   *  CHECK AUTH (GET USER)
   * --------------------------- */
  const checkAuth = async () => {
    try {
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/auth/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Correct
        },
      });

      const data = await res.json();

      if (data.success) {
        console.log("this is auth", data);
        setAuthUser(data.userData);
        connectSocket(data.userData);
      }
    } catch (error) {
      toast.error("Authentication failed");
      console.log(error);
    }
  };

  /** Run checkAuth whenever token changes */
  useEffect(() => {
    if (localStorage.getItem("token")) checkAuth();
  }, [token]);

  /** ---------------------------
   *  LOGIN USER
   * --------------------------- */
  const login = async (state, credentials) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${state}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // store token
      setToken(data.token);
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/`;

      // set user
      setAuthUser(data.userData);

      // connect socket
      connectSocket(data.userData);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /** ---------------------------
   *  LOGOUT USER
   * --------------------------- */
  const logout = () => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    toast.success("Logged out successfully");
  };

  /** ---------------------------
   *  UPDATE PROFILE
   * --------------------------- */
  const updateProfile = async (body) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setAuthUser(data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  /** ---------------------------
   *  SOCKET CONNECTION
   * --------------------------- */
  const connectSocket = (user) => {
    if (!user || socket?.connected) return;

    const newSocket = io("http://localhost:5000", {
      query: { userId: user._id },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    setSocket(newSocket);
  };

  /** Cleanup socket when component unmounts */
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  /** ---------------------------
   *  PROVIDER VALUE
   * --------------------------- */
  const value = {
    authUser,
    onlineUsers,
    token,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
