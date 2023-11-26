import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../api/axios";
import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const FORGOT_URL = "/user/forgot";

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

export default function ForgotPassword() {
  const { setAuth } = useContext(AuthContext);

  // const userRef = useRef();
  const errRef = useRef();

  const [data, setData] = useState({
    username: "",
  });

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErr("");
  }, [data]);

  const HandleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(FORGOT_URL, JSON.stringify({ data, token }), {
        headers: { "Content-Type": "application/json" },
      });

      setAuth({ data });
      setSuccess(true);

    } catch (err) {
      if (!err?.response) {
        setErr("No Server Response");
      } else if (err.response?.status === 400) {
        setErr("User Not Found");
      } else if (err.response?.status === 401) {
        setErr("Email Error");
      } else {
        setErr("Authentication Failed");
      }
    }
    console.log({ data });
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
            <Box sx={{ backgroundColor: "lightBlue", padding: "2rem" }}>
              <div>
                <div>Email Sent!</div>

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
                Forgot Password
              </Typography>
              <p ref={errRef} className={err ? "errmsg" : "offscreen"} aria-live="assertive">
                {err}
              </p>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="username" label="Email Address" name="username" autoComplete="email" onChange={HandleChange} />
                  </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Authenticate
                </Button>
                <Grid container>
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
