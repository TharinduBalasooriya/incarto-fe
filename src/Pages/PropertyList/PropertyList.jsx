import React from "react";
import MultiSelectDropDown from "../../component/MultiSelectDropDown/MultiSelectDropDown";
import NavBar from "../../component/NavBar/NavBar";
import SingleProperty from "../../component/SinglePropert/SingleProperty";

export default function PropertyList() {
  return (
    <div>
      <NavBar></NavBar>
      {/**Content Section */}
      <div className="container">
        <div className="mt-5 propertyListTopic">
          <p className="text-center">
            <h1
              style={{ fontFamily: "'Merriweather',serif", color: "#091638" }}
            >
              Search for an offer
            </h1>
            <p style={{ fontFamily: "'Merriweather',serif" }}>
              {" "}
              Choose from the most advantageous offers
            </p>
          </p>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-sm-3">
            <MultiSelectDropDown name="All types"></MultiSelectDropDown>
          </div>
          <div className="col-sm-3">
            <MultiSelectDropDown
              name="Any price"
              className="col-sm"
            ></MultiSelectDropDown>
          </div>
          <div className="col-sm-3">
            <MultiSelectDropDown
              name="Any Location"
              className="col-sm"
            ></MultiSelectDropDown>
          </div>
        </div>
        <div className="row mt-5 mb-5">
         <SingleProperty imageURL="https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb3BlcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb3BlcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb3BlcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb3BlcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></SingleProperty>
         <SingleProperty imageURL="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></SingleProperty>

        </div>
      </div>
    </div>
  );
}
