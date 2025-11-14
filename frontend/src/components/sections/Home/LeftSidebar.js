"use client";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { ChatContext } from "@/contexts/ChatContext";
import { AuthContext } from "@/contexts/AuthContext";

const LeftSidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages = 3,
    setUnseenMessages,
  } = useContext(ChatContext);
  console.log("this in side bar selected user", selectedUser);
  const { onlineUsers } = useContext(AuthContext);
  console.log("online user", onlineUsers);
  const [online, setOnline] = useState(true);
  const [input, setInput] = useState(false);
  // const [unseenMessages, setUnseenMessages] = useState(3);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  console.log(filteredUsers);
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);
  return (
    <Box
      bgcolor={"background.paper"}
      p={3}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="img" width={220} src="/logo.png" alt="Logo" />

        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={handleClose} component={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/logout">
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
          gap: 1,
          px: 2,
          //   py: 0.5,
          borderRadius: 1,
          backgroundColor: "secondary.light",
          borderRadius: 10,
        }}
      >
        <SearchIcon color="text.secondary" />
        <TextField
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          placeholder="Search User..."
          sx={{
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
      </Box>
      {/* list of users */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          overflowY: "scroll",
          height: "100%",
          overflowY: "auto",
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
        {filteredUsers?.map((item) => (
          <ListItem
            onClick={() => setSelectedUser(item)}
            alignItems="flex-start"
            key={item._id}
            sx={{
              py: 0.5,
              mt: 1,
              "&:hover": { bgcolor: "secondary.light", cursor: "pointer" },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.fullName}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={item.fullName}
              secondary={
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: onlineUsers?.includes(item._id)
                      ? "green"
                      : "text.secondary",
                    display: "inline",
                  }}
                >
                  {onlineUsers?.includes(item._id) ? "Online" : "Offline"}
                </Typography>
              }
            />

            {unseenMessages?.[item._id] > 0 && (
              <Badge
                badgeContent={unseenMessages[item._id]}
                color="success"
                sx={{ mt: 4, mr: 3 }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftSidebar;
