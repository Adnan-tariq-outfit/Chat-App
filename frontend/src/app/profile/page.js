"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

// ✅ Hidden file input
const HiddenInput = styled("input")({
  display: "none",
});

const Profile = () => {
  const [image, setImage] = useState(null);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Profile Updated:", { ...values, image });
      alert("Profile updated successfully!");
    },
  });

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        gap: 4,
        maxWidth: "1200px",
        mx: "auto",
        p: 2,
        flexWrap: "wrap",
      }}
    >
      {/* ✅ Profile Form */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: { xs: "100%", sm: 400 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 3,
          mx: "auto",
          flex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center">
          Profile Details
        </Typography>

        {/* ✅ Avatar Upload */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            src={
              image ? URL.createObjectURL(image) : "/static/images/avatar/1.jpg"
            }
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <label htmlFor="upload-photo">
            <HiddenInput
              accept="image/*"
              id="upload-photo"
              type="file"
              onChange={handleImageChange}
            />
            <Button variant="outlined" component="span" size="small">
              Upload Picture
            </Button>
          </label>
        </Box>

        {/* ✅ Username Field */}
        <TextField
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />

        {/* ✅ Email Field */}
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* ✅ Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 10, py: 1 }}
          onClick={formik.handleSubmit}
        >
          Save Changes
        </Button>
      </Paper>

      {/* ✅ Right Side Illustration */}
      <Box
        flex={1}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/logo_icon.svg"
          alt="Profile Illustration"
          sx={{
            maxWidth: 350,
            opacity: 0.9,
          }}
        />
      </Box>
    </Box>
  );
};

export default Profile;
