import React from "react";
import Card from "@mui/material/Card";
import styles from "./Main/main.module.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import authService from "../Services/auth.service";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let initalState = {
    email: "",
    password: "",
  };

  const [userState, setUserState] = React.useState(initalState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(userState);
    try{
        let currUser = await  authService.signin(userState);
        localStorage.setItem("user", JSON.stringify(currUser));

        navigate('/');
       

    }catch(err){
        console.log(err)
       
    }
   


  }
  return (
    <div style={{ paddingTop: "20vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <center>
              <Card
                sx={{ maxWidth: 545, boxShadow: "10px 13px 19px 8px #9E9E9E" }}
              >
                <div
                  style={{
                    paddingTop: "2vh",
                    paddingBottom: "1vh",
                    paddingLeft: "1vh",
                    paddingRight: "1vh",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={9}>
                      <div
                        style={{
                          paddingTop: "4vh",
                          paddingBottom: "1vh",
                          paddingLeft: "1vh",
                          paddingRight: "1vh",
                        }}
                      >
                        <h2 className={`${styles.text_st}`}>Login </h2>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div
                        style={{
                          paddingTop: "2vh",
                          paddingBottom: "1vh",
                          paddingLeft: "1vh",
                          paddingRight: "1vh",
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/iplus/image/upload/v1649614372/new/logo2_dm1nky.png"
                          alt="logo"
                          className={`${styles.sec_logo}`}
                          onClick={(event) => (window.location.href = "/")}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    paddingTop: "4vh",
                    paddingBottom: "4vh",
                    paddingLeft: "4vh",
                    paddingRight: "4vh",
                  }}
                >
                  <Stack direction="column" spacing={2}>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="email"
                        id="username"
                        type="email"
                        name="email"
                        onChange={handleChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Password"
                        id="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                      />
                    </Box>

                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleLogin}>
                      Login
                    </Button>
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        <Link
                          to="/register"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {" "}
                          Do not Have an Account: Sign Up{" "}
                        </Link>
                      </Grid>
                      <Grid item xs={5}>
                        Forgot Password
                      </Grid>
                    </Grid>
                  </Stack>
                </div>
              </Card>
            </center>
          </Grid>
          <Grid item xs={6}>
            <div>
              <video autoPlay muted loop width={690}>
                <source
                  src="https://res.cloudinary.com/iplus/video/upload/v1649686358/new/location2_bb2vlj.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
