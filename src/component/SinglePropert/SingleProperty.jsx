import React from "react";
import BathtubIcon from "@mui/icons-material/Bathtub";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { Link } from "react-router-dom";

export default function SingleProperty(props) {
  return (
    <div className="col-sm-3 mb-5">
      <div className="card " style={{ width: "20rem;" }}>
        <img src={props.imageURL} className="card-img-top" alt="..."></img>
        <Link to="/addView" style={{textDecoration:"none",color:"none"}}>
          <div className="card-body">
            <h5
              className="card-title"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "#003153",
              }}
            >
              Large 4-room apartment with a beautiful terrace
            </h5>
            <p
              className="card-text mt-3"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "#1C3988",
                fontWeight: "bold",
              }}
            >
              320 000€
            </p>
            <p
              className="card-text"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "#9e9e9e",
              }}
            >
              Barcelona IV.{" "}
            </p>
            <div className="row">
              <div className="col-sm-4">
                <BathtubIcon color="action"></BathtubIcon>
                <p style={{ float: "right" }}>5</p>
              </div>
              <div className="col-sm-4">
                <NightShelterIcon color="action"></NightShelterIcon>
                <p style={{ float: "right" }}>5</p>
              </div>
              <div className="col-sm-4">
                <NightShelterIcon color="action"></NightShelterIcon>
                <p style={{ float: "right" }}>600ft</p>
              </div>
              <div />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
