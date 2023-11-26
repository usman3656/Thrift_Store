import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useContext, useEffect } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
const LOGIN_URL = "/user/login";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const { setAuth } = useContext(AuthContext);

  // const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const setCookieFunction = (value) => {
    localStorage.setItem("token", value.token);
    localStorage.setItem("userID",value.data._id);
    localStorage.setItem("username",value.data.username);
    localStorage.setItem("firstName",value.data.firstName);
    localStorage.setItem("lastName",value.data.lastName);
    localStorage.setItem("phone",value.data.phone);
    localStorage.setItem("address",value.data.address);
    localStorage.setItem("city",value.data.city);
    localStorage.setItem("country",value.data.country);
    localStorage.setItem("role",value.data.role);
  };

  useEffect(() => {
    setErr("");
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
      });
      setUsername("");
      setPassword("");
      setAuth({ username, password });
      setSuccess(true);

      setCookieFunction(response.data);
      response.data.data.role==='Admin'?window.location.href = '/admin':window.location.href='/';
    } catch (err) {
      if (!err?.response) {
        setErr("No Server Response");
      } else if (err.response?.status === 400) {
        setErr("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErr("Unauthorized");
      } else {
        setErr("Login Failed");
      }
    }

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {success ? (
            <Box sx={{ backgroundColor: "lightblue", padding: "2rem" }}>
              <div>
                <div> You are Logged in</div>
                <br />
                <a href="/">Go to Home</a>
              </div>
            </Box>
            
          ) : (
            <section>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <p ref={errRef} className={err ? "errmsg" : "offscreen"} aria-live="assertive">
                {err}
              </p>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  // ref = {userRef}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </section>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
