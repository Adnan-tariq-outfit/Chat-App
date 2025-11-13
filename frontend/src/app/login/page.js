"use client";
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  // ✅ Validation Schemas
  const RegisterValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept terms and policies")
      .required("You must accept terms and policies"),
  });

  const LoginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: isLogin
      ? LoginValidationSchema
      : RegisterValidationSchema,
    onSubmit: (values) => {
      if (isLogin) {
        console.log("Logging in:", values);
        alert("Login successful!");
      } else {
        console.log("Registering:", values);
        alert("Account created successfully!");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        gap: 4,
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          component="img"
          src="/logo_big.svg"
          alt="Logo"
          sx={{
            display: "block",
            mx: "auto",
            mb: 4,
            width: 300,
            alignSelf: "center",
          }}
        />
      </Box>
      <Box flex={1}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: { xs: "90%", sm: "100%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 3,
            mx: "auto",
          }}
        >
          <Typography variant="h5" textAlign="center" fontWeight={600}>
            {isLogin ? "Login" : "Create Account"}
          </Typography>

          {/* Username only in Register mode */}
          {!isLogin && (
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          )}

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Checkbox only for Register */}
          {!isLogin && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    color="primary"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Terms and Policies
                    </Typography>
                  </Typography>
                }
              />
              {formik.touched.terms && formik.errors.terms && (
                <Typography color="error" variant="caption">
                  {formik.errors.terms}
                </Typography>
              )}
            </>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, borderRadius: 10, py: 1 }}
            onClick={formik.handleSubmit}
          >
            {isLogin ? "Login" : "Register"}
          </Button>

          {/* Toggle Mode */}
          <Typography variant="body2" textAlign="center" mt={1}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 500 }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login here"}
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
