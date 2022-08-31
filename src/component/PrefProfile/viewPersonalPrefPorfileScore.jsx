import React from "react";
import Styles from "./viewPersonalPrefPorfileScore.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import personalPrefProfileService from "../../Services/personalPrefService";
import { Navigate } from "react-router-dom";


let SEARCH_RESULT =null;
let CENTER = null;

function ScoreCard(props) {
  const navigate = useNavigate();
  const navigateToSuitabilityMap = () => {
    navigate("/suitabilityMap",{state:{center:CENTER,searchResult:SEARCH_RESULT}});
  };
  return (
    <div>
      <ChangingProgressProvider values={[0, props.percentage]}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "16px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: "#003153",
              textColor: "#003153",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        )}
      </ChangingProgressProvider>
      <div className="row">
        <Button
          variant="contained"
          disableElevation
          sx={{
            height: 50,
            mt: 6,
            backgroundColor: "#003153",
            ":hover": {
              backgroundColor: "#003153",
            },
          }}
          onClick={navigateToSuitabilityMap}
        >
          View On Map
        </Button>
      </div>
      <div className="row">
        <Button
          variant="outlined"
          disableElevation
          sx={{
            height: 50,
            mt: 3,
            backgroundColor: "#335a75",
            color: "#ffff",
            ":hover": {
              backgroundColor: "#335a75",
            },
          }}
          onClick={() => {
            props.learnMoreAction();
          }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

function LoginMessage() {
  let navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1 className="text-center">Please Login</h1>
      <ErrorOutlineIcon
        sx={{ height: 200, width: 300, mt: 4, color: "#aa2e25" }}
      ></ErrorOutlineIcon>
      <div className="row">
        <Button
          onClick={navigateToLogin}
          variant="outlined"
          disableElevation
          sx={{
            height: 50,
            mt: 3,
            backgroundColor: "#003153",
            color: "#ffff",
            ":hover": {
              backgroundColor: "#003153",
            },
          }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}

function LoadingScore() {
  return (
    <div>
      <div>
        <div>
          <img
            src="https://i.ibb.co/kGrhZD0/output-onlinegiftools-2.gif"
            alt="loading..."
            height="400px"
            width="500px"
          />
        </div>

        <h5
          style={{
            color: "#003153",
            textAlign: "center",
          }}
          class="loadingtxt"
        >
          <b>Loading ..... </b>
        </h5>
      </div>
    </div>
  );
}

function CreatePrefProfileMessage() {
  let navigate = useNavigate();
  const navigateToCreatePrefProfile = () => {
    navigate("/createPrefProfile");
  };
  return (
    <div>
      <h2 className="text-center">
        You need to create personal prefernce profile first
      </h2>
      <ErrorOutlineIcon
        sx={{ height: 200, width: 300, mt: 4, color: "#aa2e25" }}
      ></ErrorOutlineIcon>
      <div className="row">
        <Button
          onClick={navigateToCreatePrefProfile}
          variant="outlined"
          disableElevation
          sx={{
            height: 50,
            mt: 3,
            backgroundColor: "#003153",
            color: "#ffff",
            ":hover": {
              backgroundColor: "#003153",
            },
          }}
        >
          Create Prefernce Profile
        </Button>
      </div>
    </div>
  );
}

export default function ViewPersonalPrefPorfileScore(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [percentage, setPercentage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const handlePercentage = async (req) => {
    let result = await personalPrefProfileService.getPrefernceScore(req);
    console.log(result);
    SEARCH_RESULT = result;
    setPercentage(result.finalScore.toFixed(2));
    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className={`${Styles.scoreContainer}`}>
        <LoginMessage />
      </div>
    );
  } else if (user != null && user.prefernceProfileStatus) {
    console.log(props);
    let searchRequest = {
      profileId: user.prefernceProfileId,
      lat: props.location.lat,
      long: props.location.lng,
    };

    CENTER = {lat:props.location.lat,lng:props.location.lng};
    handlePercentage(searchRequest);
    if (isLoading) {
      console.log("loading");
      return <LoadingScore></LoadingScore>;
    } else {
      return (
        <div className={`${Styles.scoreContainer}`}>
          <ScoreCard percentage={percentage} ></ScoreCard>

          {/** Learn More dialog */}
        </div>
      );
    }
  } else {
    return (
      <div className={`${Styles.scoreContainer}`}>
        <CreatePrefProfileMessage></CreatePrefProfileMessage>
      </div>
    );
  }
}
