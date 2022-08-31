import React from "react";
import "./loading.css"

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <img
          src="https://i.ibb.co/kGrhZD0/output-onlinegiftools-2.gif"
          alt="loading..."
          height="500px"
          width="700px"
        />
        <h5
          style={{
            color: "#003153",
          }}
          class="loadingtxt"
        >
          <b>Incarto Location Insights . . . . . . </b>
        </h5>
      </div>
    </div>
  );
}
