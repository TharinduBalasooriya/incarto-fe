import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";
import styles from "./createprofile.module.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ChurchIcon from "@mui/icons-material/Church";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import personalPrefService from "../../Services/personalPrefService";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Steps in the main crieate weightage allocator
const steps = [
  {
    name: "Essentail Goods and Services",
    apiTag: "essentail goods",
    label: "Select how accesbility essentail goods is important to you",
    description:
      "This criteria is to evalute accebility points where we can buy essntial goods for day to day , eg : supermarket",
    sub_criteria: [
      {
        name: "Super Markets",
        description:
          "A supermarket is a self-service shop offering a wide variety of food, beverages and household products, organized into sections.",
        apiTag: "super market",
      },
      {
        name: "Grocery stores",
        description:
          "A grocery store (AE), grocery shop (BE) or simply grocery is a store that primarily retails a general range of food products, which may be fresh or packaged",
        apiTag: "grocery store",
      },
      {
        name: "Hardware Stores",
        description:
          "A hardware store traditionally sells household hardware such as fasteners, keys, locks, hinges, wire, chains, plumbing supples, tools, cutlery and machine parts.",
        apiTag: "hardware store",
      },
    ],
  },
  {
    name: "Educational facilities",
    apiTag: "education",
    label: "Select how accesbility Education centers is essential to you",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    sub_criteria: [
      {
        name: "Pres schools",
        description:
          "A preschool, also known as nursery school, pre-primary school, or play school, is an educational establishment or learning space offering early childhood education to children before they begin compulsory education at primary school. It may be publicly or privately operated, and may be subsidized from public funds. It is for kids age 4-6.",
        apiTag: "pre-schools",
      },
      {
        name: "Non state schools",
        description:
          "An independent school is independent in its finances and governance. Also known as private schools, non-governmental, privately funded, or non-state schools,[1] they are not administered by local, state or national governments. In British English, an independent school usually refers to a school which is endowed, i.e. held by a trust, charity, or foundation, whilst a private school is one which is privately owned",
        apiTag: "non-state schools",
      },
      {
        name: "State\\Government schools",
        description:
          "State schools or public schools are generally primary or secondary schools that educate all children without charge. They are funded in whole or in part by taxation. ",
      },
      {
        name: "State  Universities",
        description:
          "A public university or public college is a university or college that is in state ownership or receives significant public funds through a national or subnational government.",
        apiTag: "state universities",
      },
      {
        name: "Private Universities",
        description:
          "A private university or private college is a university or college that is owned by a private corporation or other private entity.",
        apiTag: "non-state universities",
      },
    ],
  },
  {
    name: "Health Carea and Services",
    apiTag: "health_care",
    label: "Select how accesbility Health-care units is essential to you",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    sub_criteria: [
      {
        name: "Hospitals",
        description:
          "A public hospital, or government hospital, is a hospital which is government owned and is fully funded by the government ",
        apiTag: "hospitals",
        min: 0,
        max: 0,
      },
      {
        name: "Pharmacies",
        description:
          "Pharmacy is the clinical health science that links medical science with chemistry and it is charged with the discovery, production, disposal, safe and ...",
        apiTag: "pharmacies"
      },
      {
        name: "Dental clinics or dentists",
        description:
          "A dental clinic or dentist is a medical facility that provides dental services to the general public.",
        apiTag: "dental clinincs"
      },
    ],
  },

  {
    name: "Recreation and Sports",
    apiTag: "recreational",
    label:
      "Select how accesbility recreational and sport  facilites is essential to you",
    description: `Recreational areas are one of the most important uses in the modern residential neighborhoods because they improve economic resources, social life, and environmental quality.`,
    sub_criteria: [
      {
        name: "Gym and Fitness centers",
        description:
          "A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek term 'gymnasium'.",
        apiTag: "gym",
        min: 0,
        max: 0,
      },
      {
        name: "Jogging tracks",
        description:
          "A staple in any modern recreation center is the walking or jogging track. It is typically found elevated around the gymnasium, offering the user views of the activity below",
        apiTag: "jogging track",
        min: 0,
        max: 0,
      },
      {
        name: "Playgrounds",
        description:
          "A playground, playpark, or play area is a place designed to provide an environment for children that facilitates play, typically outdoors.",
        apiTag: "playground",
        min: 0,
        max: 0,
      },
      {
        name: "Swimming pools",
        description:
          "A swimming pool, swimming bath, wading pool, paddling pool, or simply pool, is a structure designed to hold water to enable swimming or other leisure activities.",
        apiTag: "swimming pool",
        min: 0,
        max: 0,
      },
      {
        name: "Movie theaters & Cinema",
        description:
          "A movie theater is a building that contains auditoria for viewing films (also called movies) for entertainment.",
        apiTag: "movie theater",
        min: 0,
        max: 0,
      },
    ],
  },
  {
    name: "Transportation",
    apiTag: "transportation",
    label: "Select how accesbility transport hubs are  important you",
    description: `Try out different ad text to see what brings in the most customers,`,
    sub_criteria: [
      {
        name: "Bus stops",
        description:
          "A bus stop is a designated place where buses stop for passengers to get on and off the bus.",
        apiTag: "bus stand",
      },
      {
        name: "Railway Stations",
        description:
          "A train station, railway station, railroad station or depot is a railway facility or area where trains regularly stop to load or unload passengers, ...",
        apiTag: "railway station",
      },
      {
        name:"Highways and Expressways",
        description:"A tollbooth (or toll booth) is an enclosure placed along a toll road that is used for the purpose of collecting a toll from passing traffic. A structure consisting of several tollbooths placed next to each other is called a toll plaza, tollgate, or toll station.",
        apiTag:"toll booth",
      }
    ],
  },
  {
    name: "Religious and Cultural",
    apiTag: "religious_cultural",
    label:
      "Select how accesbility Religious and Cultural centers are essential to you",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    sub_criteria: [
      {
        name: "Buddhist temple",
        description:"Buddhist monastery is the place of worship for Buddhists, the followers of Buddhism. They include the structures called vihara, chaitya, stupa, wat and pagoda in different regions and languages.",
        apiTag:"buddhist temple",
      },
      {
        name: "Church",
        description:"A church, church building or church house is a building used for Christian worship services and other Christian religious activities",
        apiTag:"church",
      },{
        name: "Mosque",
        description:"A mosque is a building where Muslims worship the Sunnah, the Islamic teachings and the Islamic religion.",
        apiTag:"mosque",
      },{
        name: "Hindu temple",
        description:"Hindu temple is a temple dedicated to Hinduism, the Hindu religion, and Hindu deities.",
        apiTag:"hindu temple",
      }
    ]
  },
  

  
];

//Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//Criteria details
const CustomStepIcon = (props) => {
  let { name } = props;

  switch (name) {
    case "essentail goods":
      return (
        <div className={`${styles.stepIconBg}`}>
          <LocalGroceryStoreIcon
            className="mt-2"
            sx={{ color: "white" }}
          ></LocalGroceryStoreIcon>
        </div>
      );
    case "health_care":
      return (
        <div className={`${styles.stepIconBg}`}>
          <LocalHospitalIcon
            className="mt-2"
            sx={{ color: "white" }}
          ></LocalHospitalIcon>
        </div>
      );

    case "education":
      return (
        <div className={`${styles.stepIconBg}`}>
          <SchoolIcon className="mt-2" sx={{ color: "white" }}></SchoolIcon>
        </div>
      );
    case "recreational":
      return (
        <div className={`${styles.stepIconBg}`}>
          <SportsFootballIcon
            className="mt-2"
            sx={{ color: "white" }}
          ></SportsFootballIcon>
        </div>
      );
    case "transportation":
      return (
        <div className={`${styles.stepIconBg}`}>
          <DirectionsBusIcon
            className="mt-2"
            sx={{ color: "white" }}
          ></DirectionsBusIcon>
        </div>
      );
    case "religious_cultural":
      return (
        <div className={`${styles.stepIconBg}`}>
          <ChurchIcon className="mt-2" sx={{ color: "white" }}></ChurchIcon>
        </div>
      );
    default:
      break;
  }
};

export default function CreatePrefProfile() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activePage, setActivePage] = React.useState(0);
  const navigate = useNavigate();

  //Success message state
  const [open, setOpen] = React.useState(false);

  //Object to store profile
  let initprofile = {
    userID: JSON.parse(localStorage.getItem("user"))._id,
    main_criteria: [],
  };

  const [profile, setProfile] = React.useState(initprofile);

  const handleMessage = () => {
    alert("Profile created successfully");
    setOpen(!open);
  };

  const handleMainCriteriaSlider = (event) => {
    let currProfile = profile;
    let createNew = true;
    currProfile.main_criteria.forEach((element) => {
      if (element.main_criteria_name === event.target.name) {
        element.weightage = event.target.value;
        createNew = false;
      }
    });

    if (createNew) {
      let currMainCriteria = {};
      currMainCriteria.main_criteria_name = event.target.name;
      currMainCriteria.weightage = event.target.value;
      currMainCriteria.sub_criteria = [];
      currProfile.main_criteria.push(currMainCriteria);
    }
    setProfile(currProfile);
  };

  /***
   * Horizontal Stepper states
   *
   */

  const [activeStepHorizontal, setActiveStepHorizontal] = React.useState(0);

  let currentlyEvalMainCriteriaName = "";
  let subCrtieriasForCurrentlyEvalMainCriteria = [];

  if (
    activePage !== 0 &&
    activeStepHorizontal !== profile.main_criteria.length
  ) {
    //System has started evalutaing sub criterias for main criterias
    currentlyEvalMainCriteriaName =
      profile.main_criteria[activeStepHorizontal].main_criteria_name;
    subCrtieriasForCurrentlyEvalMainCriteria = steps.find(
      (element) => element.apiTag === currentlyEvalMainCriteriaName
    ).sub_criteria;
  }

  const handleNextHorizontal = () => {
    // document.getElementById("maxIn").value = "";
    // document.getElementById("minIn").value = "";
    setActiveStepHorizontal((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackHorizontal = () => {
    setActiveStepHorizontal((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetHorizontal = () => {
    setActiveStepHorizontal(0);
  };

  /**
   *
   * End Horizontal steppeer functins
   */

  //Main critera  stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //Main critera  stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePageNext = () => {
    setActivePage((prevActivePage) => prevActivePage + 1);
  };

  const handlePageBack = () => {
    setActivePage((prevActivePage) => prevActivePage - 1);
  };

  //Main critera  stepper
  const handleReset = () => {
    setActiveStep(0);
    setProfile(initprofile);
  };

  const handleMinValueChange = (event) => {
    let currProfile = profile;
    let createNew = true;
    currProfile.main_criteria[activeStepHorizontal].sub_criteria.forEach(
      (element) => {
        if (element.sub_criteria_name === event.target.name) {
          element.expected_min_value = event.target.value;
          createNew = false;
        }
      }
    );
    if (createNew) {
      console.log("Get called2Min");
      let currSubCriteria = {};
      currSubCriteria.sub_criteria_name = event.target.name;
      currSubCriteria.expected_min_value = event.target.value;
      currProfile.main_criteria[activeStepHorizontal].sub_criteria.push(
        currSubCriteria
      );
    }
    console.log(currProfile);
    setProfile(currProfile);
  };

  const handleMaxValueChange = (event) => {
    let currProfile = profile;
    let createNew = true;
    currProfile.main_criteria[activeStepHorizontal].sub_criteria.forEach(
      (element) => {
        console.log("Get called");
        if (element.sub_criteria_name === event.target.name) {
          element.expected_max_value = event.target.value;
          createNew = false;
        }
      }
    );
    if (createNew) {
      console.log("Get called2");
      let currSubCriteria = {};
      currSubCriteria.sub_criteria_name = event.target.name;
      currSubCriteria.expected_max_value = event.target.value;
      currProfile.main_criteria[activeStepHorizontal].sub_criteria.push(
        currSubCriteria
      );
    }
    console.log(currProfile);
    setProfile(currProfile);
  };

  //Handle save profile
  const handleSaveProfile = async () => {
    console.log(profile);
    try {
      let res = await personalPrefService.createPersonalPrefernceProfile(
        profile
      );
      console.log("PRef", res);
      if (res) {
        //Upadte profile status
        let updateReq = {
          userID: profile.userID,
          prefernceProfileStatus: true,
          prefernceProfileId: res._id,
        };
        let updateRes = await authService.updateuserProfile(updateReq);
        if (updateRes) {
          console.log("Update res", updateRes);
          localStorage.setItem("user", JSON.stringify(updateRes.data));
          handleMessage();
          navigate("/");
        }
      } else {
        throw new Error("User status update failed");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <NavBar></NavBar>
      {activePage === 0 && (
        <Paper className={`${styles.mainContainercp}`}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() =>
                    CustomStepIcon({ name: step.apiTag })
                  }
                >
                  {activeStep === index ? (
                    <div className={`${styles.setpText}`}>{step.label}</div>
                  ) : (
                    <div className={`${styles.setpText}`}>{step.name}</div>
                  )}
                </StepLabel>
                <StepContent>
                  <Typography className="mt-3">{step.description}</Typography>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                    className={`${styles.sliderContianer}`}
                  >
                    <div>I have no intrest</div>

                    <Slider
                      defaultValue={0}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      sx={{ mb: 2 }}
                      name={step.apiTag}
                      onChange={handleMainCriteriaSlider}
                    />

                    <div>Very important</div>
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          mt: 1,
                          mr: 1,
                          backgroundColor: "#003153",
                          color: "white",
                        }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button
                variant="contained"
                onClick={handlePageNext}
                sx={{
                  mt: 1,
                  mr: 1,
                  backgroundColor: "#003153",
                  color: "white",
                }}
              >
                Evaluate Sub-criteria
              </Button>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Paper>
      )}
      {/**
       *
       * Sub crtieria  form field
       *
       */}
      {activePage !== 0 && (
        <Paper className={`${styles.mainContainercp}`}>
          <h1>Evaluate Sub-Criteria</h1>

          <Box className={`${styles.horizontalStepperContainer}`}>
            <Stepper activeStep={activeStepHorizontal}>
              {profile.main_criteria.map((mc, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={mc.main_criteria_name} {...stepProps}>
                    <StepLabel {...labelProps}>
                      {mc.main_criteria_name}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStepHorizontal === profile.main_criteria.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: "#003153",
                      color: "white",
                    }}
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </Button>
                  <Button onClick={handleResetHorizontal}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStepHorizontal + 1}
                </Typography>
                {
                  /**
                   Render sub criterieas based on selcted main  criterias 
                   **/
                  activeStepHorizontal !== profile.main_criteria.length &&
                    subCrtieriasForCurrentlyEvalMainCriteria.map((element) => (
                      <div key={element.name}>
                        <Card
                          sx={{
                            border: "1px solid #1769aa",
                            mt: 3,
                            p: 2,
                          }}
                        >
                          <CardContent>
                            <h3>{element.name}</h3>
                            <Typography
                              variant="body3"
                              color="textSecondary"
                              component="p"
                            >
                              {element.description}
                            </Typography>
                            <div className="row mt-4">
                              <div className="col-md-6">
                                <TextField
                                  id="minIn"
                                  label="Minimum expected travel time"
                                  variant="outlined"
                                  sx={{
                                    width: "75%",
                                    marginLeft: "10px",
                                    marginTop: "10px",
                                  }}
                                  name={element.apiTag}
                                  onChange={handleMinValueChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <TextField
                                  id="maxIn"
                                  label="Maximum expected travel time"
                                  variant="outlined"
                                  sx={{
                                    width: "75%",
                                    marginLeft: "10px",
                                    marginTop: "10px",
                                  }}
                                  name={element.apiTag}
                                  onChange={handleMaxValueChange}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Learn More</Button>
                          </CardActions>
                        </Card>
                      </div>
                    ))
                }

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    //disabled={activeStepHorizontal === 0}
                    onClick={
                      activeStepHorizontal === 0
                        ? handlePageBack
                        : handleBackHorizontal
                    }
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNextHorizontal}>
                    {activeStepHorizontal === steps.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleMessage}>
            <Alert
              onClose={handleMessage}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </Paper>
      )}

      <Footer></Footer>
    </div>
  );
}
