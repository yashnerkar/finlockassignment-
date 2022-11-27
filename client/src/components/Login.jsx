import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      email: data.get("email"),
      password: data.get("password"),
    };

    await axios.post('/api', obj)
      .then((response
      ) => {
        setShow(true);
        setAlertData({
          severity: response.data.severity,
          message: response.data.message
        })
        if (response.status === 200) {
          setTimeout(() => {
            setShow(false);
            navigate("/users");
          }, 500);
        }

      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setAlertData({
          severity: err.response.data.severity,
          message: err.response.data.message
        })
        setTimeout(() => {
          setShow(false);
        }, 1000);

      });


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Alert severity={alertData.severity} message={alertData.message} show={show}></Alert>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
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
    </ThemeProvider>
  );
}
