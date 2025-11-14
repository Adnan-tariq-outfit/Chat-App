"use client";
import { LeftSidebar, RightSidebar } from "@/components/sections/Home";
import { ChatContainer } from "@/components/sections/Home/ChatContainer";
import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  const [selectedChat, setSelectedChat] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <LeftSidebar />
        <ChatContainer selectedChat={selectedChat} />
        {selectedChat && <RightSidebar selectedChat={selectedChat} />}
      </Box>
    </Box>
  );
};

export default Home;
