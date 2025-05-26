import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "../redux/authSlice";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const { mode } = useSelector((state) => state.theme);
  const  mode  = "Dark"

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: mode === "dark" ? "#1a1a1a" : "#ffffff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" color={mode === "dark" ? "white" : "black"}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{ style: { color: mode === "dark" ? "#ccc" : "#000" } }}
            InputProps={{ style: { color: mode === "dark" ? "white" : "black" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputLabelProps={{ style: { color: mode === "dark" ? "#ccc" : "#000" } }}
            InputProps={{ style: { color: mode === "dark" ? "white" : "black" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login2;
