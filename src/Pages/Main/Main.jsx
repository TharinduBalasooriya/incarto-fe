import React from "react";
import Card from '@mui/material/Card';
import styles from './main.module.css';
import Button from '@mui/material/Button';
import ControlPointDuplicateRoundedIcon from '@mui/icons-material/ControlPointDuplicateRounded';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function Main() {
  
  return (
    <div style={{ paddingTop: '20vh' }}>
      <center>
        <Card sx={{ maxWidth: 545 ,boxShadow: "10px 13px 19px 8px #9E9E9E" }} >
        <div style={{ paddingTop: '2vh',paddingBottom:'1vh',paddingLeft:'1vh',paddingRight:'1vh' }}>

          <img src="https://res.cloudinary.com/iplus/image/upload/v1649614372/new/logo2_dm1nky.png" alt="logo" className={`${styles.main_logo}`} />
         </div>
          <div style={{ paddingTop: '4vh',paddingBottom:'4vh',paddingLeft:'4vh',paddingRight:'4vh' }}>

          <Stack direction="column" spacing={2}>

              <Button variant="outlined" startIcon={<ControlPointDuplicateRoundedIcon />}>
                Register
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} >
                Login
              </Button>
          </Stack>
          </div>

        </Card>
      </center>

    </div>
  )
}