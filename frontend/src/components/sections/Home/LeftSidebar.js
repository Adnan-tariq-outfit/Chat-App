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
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

const LeftSidebar = ({ setSelectedChat }) => {
  const [online, setOnline] = useState(true);
  const [unseenMessages, setUnseenMessages] = useState(3);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
          <ListItem
            onClick={() => setSelectedChat(true)}
            alignItems="flex-start"
            key={item}
            sx={{
              py: 0.5,
              mt: 1,
              "&:hover": { bgcolor: "secondary.light", cursor: "pointer" },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="Adnan Tariq"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: `${online ? "green" : "primary.text"}`,
                      display: "inline",
                    }}
                  >
                    {online ? "Online" : "Offline"}
                  </Typography>
                </React.Fragment>
              }
            />
            {unseenMessages > 0 && (
              <Badge
                badgeContent={unseenMessages}
                color="success"
                sx={{
                  mt: 4,
                  mr: 3,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftSidebar;
