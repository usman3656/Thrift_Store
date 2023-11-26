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
import AuthContext from "../context/AuthProvider";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "../api/axios";

const SIGNUP_URL = "/user/register-login";

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

export default function SignUp() {
  const { setAuth } = useContext(AuthContext);

  // const userRef = useRef();
  const errRef = useRef();

  const [data, setData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    city: "",
    country: "",
    role: "User",
  });

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
    // const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(SIGNUP_URL, JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json" },
      });

      setCookieFunction(response.data);      

      setAuth({ data });
      setSuccess(true);
      window.location.href='/'

    } catch (err) {
      if (!err?.response) {
        setErr("No Server Response");
      } else if (err.response?.status === 400) {
        setErr("Missing Details");
      } else if (err.response?.status === 401) {
        setErr("Account Already Exists");
      } else {
        setErr("Register Failed");
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
                <div>Registered!</div>
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
                Sign up
              </Typography>
              <p ref={errRef} className={err ? "errmsg" : "offscreen"} aria-live="assertive">
                {err}
              </p>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="username" label="Email Address" name="username" autoComplete="email" onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth id="city" label="City" name="city" onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth id="country" label="Country" name="country" onChange={HandleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="address" label="Address" name="address" onChange={HandleChange} />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth id="phone" label="Phone" name="phone" onChange={HandleChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </section>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
