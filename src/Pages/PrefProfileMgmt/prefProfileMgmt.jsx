import React from "react";
import Button from "@mui/material/Button";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";
import personalPrefService from "../../Services/personalPrefService";

export default function PrefProfileMgmt() {
  let currenntUser = JSON.parse(localStorage.getItem("user"));
  let prefProfileStatus = currenntUser.prefernceProfileStatus;
  console.log(currenntUser);
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    console.log("clicked");
    navigate("/createPrefProfile");
  };

  const handleDelteProfile = async () => {
    console.log(currenntUser);

    //Delete Pref profile
    try{
      await personalPrefService.deletePrefernceProfile(currenntUser.prefernceProfileId);
    }catch(err){
      console.log(err);
    }

    //Update user
    try {
      let updateReq = {
        userID: currenntUser._id,
        prefernceProfileStatus: false,
        prefernceProfileId: "",
      };

      let updateRes = await authService.updateuserProfile(updateReq);
      if(updateRes)
      {
        alert("Profile Deleted Successfully");
        console.log(updateRes)
        localStorage.setItem("user", JSON.stringify(updateRes.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container text-center mt-5">
        <h1>Prefernce profile managment</h1>
        <h2>This page is under consturction</h2>

        <div className="container">
          {prefProfileStatus ? (
            <div>
              <div>
                <Button sx={{ mt: 4 }} variant="contained">
                  View profile
                </Button>
              </div>

              <div>
                <Button
                  sx={{ mt: 4 }}
                  variant="contained"
                  onClick={handleDelteProfile}
                >
                  Delete Profile
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                onClick={handleCreateProfile}
                sx={{ mt: 4 }}
                variant="contained"
              >
                Create profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
