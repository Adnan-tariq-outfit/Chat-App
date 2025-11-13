"use client";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Badge,
  Divider,
  TextField,
  styled,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SendIcon from "@mui/icons-material/Send";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export const ChatContainer = ({ selectedChat }) => {
  const [active, setActive] = useState(true);
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const currentUserId = "680f50e4f10f3cd28382ecf9";

  return selectedChat ? (
    <Box sx={{ height: "100%", flexGrow: 2, position: "relative" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={"/static/images/avatar/1.jpg"}
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="h5">Adnan Tariq</Typography>
        {active && <Badge color="success" variant="dot" />}
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 112px)",
          width: "100%",
          overflowY: "auto",
          p: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: 2,

            transition: "width 0.3s ease",
          },
          "&:hover::-webkit-scrollbar": {
            width: 2, // show scrollbar on hover
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: 3,
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#bbb",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {messagesDummyData.map((msg, index) => {
          const isSender = msg.senderId === currentUserId;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: isSender ? "flex-end" : "flex-start",
                width: "100%",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: isSender ? "row-reverse" : "row",
                  gap: 1,
                  maxWidth: "80%",
                }}
              >
                <Avatar
                  src={
                    isSender
                      ? "/static/images/avatar/2.jpg"
                      : "/static/images/avatar/1.jpg"
                  }
                  sx={{ width: 36, height: 36 }}
                />

                {msg.image ? (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 0.5,
                      borderRadius: 3,
                      backgroundColor: isSender ? "#DCF8C6" : "#fff",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={msg.image}
                      alt="chat-img"
                      sx={{
                        width: "200px",
                        borderRadius: 2,
                        objectFit: "cover",
                      }}
                    />
                  </Paper>
                ) : (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1.2,
                      borderRadius: 3,
                      backgroundColor: isSender ? "#DCF8C6" : "#fff",
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", md: "15px" },
                        color: "#333",
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          );
        })}
        <Box ref={scrollEnd}></Box>
      </Box>
      {/* bottom area */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            //   py: 0.5,
            borderRadius: 1,
            backgroundColor: "secondary.light",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search User..."
            sx={{
              placeholder: { color: "text.secondary" },
              flex: 1,
              py: 0,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" }, // remove border
                "&:hover fieldset": { border: "none" }, // no hover border
                "&.Mui-focused fieldset": { border: "none" }, // no focus border
              },
              "& .MuiInputBase-input": {
                outline: "none",
                py: 1.5,
              },
            }}
          />
          <VisuallyHiddenInput id="selectImage" type="file" accept="image/*" />
          <Box component="label" htmlFor="selectImage">
            <IconButton aria-label="delete">
              <InsertPhotoOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <IconButton
          aria-label="delete"
          sx={{
            mr: "10px",
            width: "45px",
            height: "45px",
            bgcolor: "secondary.light",
          }}
        >
          <SendIcon fontSize="40px" />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        height: "100%",
        flexGrow: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#ffffff22",
        flexDirection: "column",
      }}
    >
      <Box
        component={"img"}
        src={"./logo_icon.svg"}
        width={100}
        loading="lazy"
      ></Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Select a chat to start messaging
      </Typography>
    </Box>
  );
};

// Dummy Data
const messagesDummyData = [
  {
    _id: "680f571ff10f3cd28382f094",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Hey there 👋 How are you doing?",
  },
  {
    _id: "680f5726f10f3cd28382f0b1",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "I'm doing great! Working on a project 🚀",
  },
  {
    _id: "680f572cf10f3cd28382f0bb",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    image: "./img1.jpg",
  },
  {
    _id: "680f5745f10f3cd28382f0c5",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    image: "./img2.jpg",
  },
  {
    _id: "680f5748f10f3cd28382f0ca",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "That looks awesome 👏",
  },
];
