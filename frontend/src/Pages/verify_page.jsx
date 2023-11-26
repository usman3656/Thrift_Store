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

const VERIFY_URL = "/user/forgot/verify";
const VERIFY_AGAIN_URL = "/user/update_user";

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

export default function VerifyPassword() {
  const { setAuth } = useContext(AuthContext);
  const emailref = useRef();
  const errRef = useRef();

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setErr("");
  }, [password]);

  useEffect(() => {
    sendURL();

    async function sendURL() {
      console.log(window.location.pathname); //yields: "/js" (where snippets run)
      console.log(window.location.href); //yields: "https://stacksnippets.net/js"
      let urlElements = window.location.href.split("=");
      console.log(urlElements);
      let token = urlElements[1];

      try {
        const tok = localStorage.getItem("token");
        console.log(tok);
        axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;

        const response = await axios.post(VERIFY_URL, JSON.stringify({ token }), {
          headers: { "Content-Type": "application/json" },
        });

        console.log(response);
        emailref.current = response.data;
        setAuthorized(true);
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
    }
  }, []);

  const HandleChange = ({ currentTarget: input }) => {
    setPassword({ [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);

    try {
      const response = await axios.put(VERIFY_AGAIN_URL, JSON.stringify({ password, emaily: emailref.current }), {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

      setAuth(password);
      setSuccess(true);

      console.log(JSON.stringify(response?.data));
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
          {authorized ? (
            <>
              {success ? (
                <Box sx={{ backgroundColor: "lightBlue", padding: "2rem" }}>
                  <div>
                    <div>Password Changed</div>

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
                    Set New Password
                  </Typography>
                  <p ref={errRef} className={err ? "errmsg" : "offscreen"} aria-live="assertive">
                    {err}
                  </p>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField required fullWidth id="password" label="Password" name="password" autoComplete="password" onChange={HandleChange} />
                      </Grid>
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Set New Password
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
            </>
          ) : (
            <Box sx={{ backgroundColor: "lightBlue", padding: "2rem" }}>
              <div>
                <div>Not Authorized, Try Again</div>

                <br />
                <a href="/forgot">Go to Forgot Password</a>
              </div>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
