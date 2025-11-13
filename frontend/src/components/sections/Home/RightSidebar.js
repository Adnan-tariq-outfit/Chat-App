"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";

const RightSidebar = () => {
  const [active, setActive] = React.useState(true);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      {/* info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "10%",
        }}
      >
        <Avatar
          src={"/static/images/avatar/1.jpg"}
          sx={{ width: 80, height: 80 }}
        />
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5">Adnan Tariq</Typography>
          {active && <Badge color="success" variant="dot" />}
        </Box>
      </Box>
      <Divider sx={{ bgcolor: "secondary.main", height: 2, width: "100%" }} />{" "}
      {/* gallery */}
      <Typography variant="h6" sx={{ mr: "auto" }}>
        Media
      </Typography>
      <ImageList
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
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
        cols={2}
        rowHeight={100}
        variant="masonry"
        gap={10}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} m={2}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                borderRadius: "12px", // 👈 Add rounded corners
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/* logout button */}
      <Button
        sx={{
          borderRadius: 10,
          bgcolor: "secondary.light",
          width: "100%",
          p: 1,
        }}
        variant="contained"
      >
        Logout
      </Button>
    </Box>
  );
};

export default RightSidebar;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
];
