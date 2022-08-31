import React from "react";
import styles from "./Main/main.module.css";
import Button from "@mui/material/Button";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import AuthService from "../Services/auth.service";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Box,
  Stack,
  Card,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Register() {


  const initalState = {
    username: "",
    email: "",
    password: "",
    adress: "",
    city: "",
    contactNumber: "",
    bio: "",
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //Success message state
  const [open, setOpen] = React.useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const [state, setState] = React.useState(initalState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });

    console.log(state);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        let result = await AuthService.signup(state);
        console.log(result)
        setOpen(true);
    }catch(err){
        console.log(err);
    }

  };

  return (
    <div style={{ paddingTop: "2vh", paddingBottom: "5vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <center>
              <Card
                sx={{ maxWidth: 545, boxShadow: "10px 13px 19px 8px #9E9E9E" }}
              >
                <div
                  style={{
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
                        <h2 className={`${styles.text_st}`}>Register </h2>
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
                          className={`${styles.secc_logo}`}
                          onClick={(event) => (window.location.href = "/")}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    paddingTop: "1vh",
                    paddingBottom: "4vh",
                    paddingLeft: "4vh",
                    paddingRight: "4vh",
                  }}
                >
                  <Stack direction="column" spacing={2}>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Name</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="username"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Email address</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="email"
                        onChange={handleChange}
                      />
                      <FormHelperText id="my-helper-text">
                        We'll never share your email.
                      </FormHelperText>
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Password</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        type="password"
                        name="password"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Address</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="adress"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-input">City</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="city"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-input">Contact Number</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="contactNumber"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        placeholder="Other(Bio)"
                        multiline
                        rows={2}
                        maxRows={4}
                        name="bio"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      endIcon={<ControlPointDuplicateRoundedIcon />}
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={(event) => (window.location.href = "/login")}
                    >
                      Alredy Have an Account : Login
                    </Button>
                  </Stack>
                </div>
              </Card>
            </center>
          </Grid>
          <Grid item xs={6}>
            <div style={{ paddingTop: "15vh" }}>
              <video autoPlay muted loop width={700}>
                <source
                  src="https://res.cloudinary.com/iplus/video/upload/v1649686358/new/location2_bb2vlj.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleMessage}>
        <Alert onClose={handleMessage} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
