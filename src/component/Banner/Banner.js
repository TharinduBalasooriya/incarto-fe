import React from "react";
import "./Banner.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import MyMapComponent from "../Map/Map";
import { Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewPersonalPrefPorfileScore from "../PrefProfile/viewPersonalPrefPorfileScore";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Banner() {
  const [open, setOpen] = React.useState(false);
  const [scoreDialogOpen, setScoreDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const [nextRoute, setRoute] = React.useState("");
  let location = { lat: "", lng: "" };

  const [locationState, setLocationState] = React.useState({location});
  const intialState = {
    address: "13 rue de la gare",
  };

  const handleClickOpen = (routeName) => {
    setRoute(routeName);
    setOpen(true);
  };
  const handleClose = () => {
    console.log(location);
    //Navigate to the next route
    if (location.lat !== "" && location.lng !== "") {
      if (nextRoute === "insights") {
        console.log("adadasdasdasd");
        goToInsights();
      }
      if (nextRoute === "prefernceAnalysis") {
        console.log("Prefernce Analysis", location);
        setLocationState({ location });
        setScoreDialogOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  //Handle Personal preference profile close
  const handleScoreDialogClose = () => {
    setScoreDialogOpen(false);
  };

  const handleAddressChange = (event) => {};

  const handleSubmit = () => {};

  const getDataFromMap = (lat, long) => {
    location.lat = lat;
    location.lng = long;
  };

  const goToInsights = () => {
    navigate("/insights", { state: location });
  };

  return (
    <div className="video-container">
      <video autoPlay muted loop>
        <source
          src="https://res.cloudinary.com/iplus/video/upload/v1649583962/new/New_video_heuapm.mp4"
          type="video/mp4"
        />
      </video>
      <div className="content">
        <h1 className="BannerHeader">
          Disocover a place <br /> you'll love to live
        </h1>

        <div class="d-flex justify-content-center BannerButtonGroup">
          <div className="row">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  handleClickOpen("insights");
                }}
              >
                Insights &amp; Statistics
              </button>
              <Link
                to="/avgpricepredicter"
                style={{ color: "white", textDecoration: "none" }}
              >
                <button type="button" className="btn btn-outline-light">
                  Price Predection
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  handleClickOpen("prefernceAnalysis");
                }}
              >
                Preference Analysis
              </button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center ">
          <div className="row BannerSearchBar">
            <div class="input-group mt-3">
              <input
                type="search"
                class="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={handleClickOpen}
              >
                search
              </button>

              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        onChange={handleAddressChange}
                        defaultValue={intialState.address}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant="contained" onClick={handleSubmit}>
                        Search
                      </Button>
                    </Grid>
                  </Grid>

                  <div
                    style={{ width: "600px", height: "600px" }}
                    className="mt-3"
                  >
                    {/**
                     * map component
                     */}
                    <MyMapComponent callBack={getDataFromMap}></MyMapComponent>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog>

              {
                //Score dialog
              }

              <BootstrapDialog open={scoreDialogOpen}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleScoreDialogClose}
                >
                  <div className="text-center">
             
                    Suitablity Score for your location
                  </div>
                </BootstrapDialogTitle>
                <DialogContent className="scoreHolder" dividers>
                  <ViewPersonalPrefPorfileScore location={locationState.location}></ViewPersonalPrefPorfileScore>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
