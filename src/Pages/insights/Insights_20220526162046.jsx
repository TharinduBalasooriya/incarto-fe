import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import axios from "axios";
import "./insights.css";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";
import Loading from "../../component/LoadingInsights/loading";
import MyMapComponent from "../../component/Map/MapInsights";

export default function Insights() {
  const { state } = useLocation();

  const [healthcareIndex, setHealthcareIndex] = React.useState(0);
  const [envndex, setEnveIndex] = React.useState(0);
  const [healthcarePlaces, setHealthCarePlaces] = React.useState(null);
  const [eductionIndex, setEductionIndex] = React.useState(0);
  const [educationPlaces, setEducationPlaces] = React.useState(null);
  const [essentialGoodIndex, setEssentialGoodIndex] = React.useState(0);
  const [essentialGoodPlaces, setEssentialGoodPlaces] = React.useState(null);
  const [recreationalIndex, setRecreationalGoodIndex] = React.useState(0);
  const [recreationalPlaces, setRecreationalGoodPlaces] = React.useState(null);
  const [transportIndex, settransportIndex] = React.useState(0);
  const [transportPlaces, settransportPlaces] = React.useState(null);
  const [nearbyProperties, setnearbyPropertiesIndex] = React.useState();
  const [nearbyPropertiesphotos, setnearbyPropertiesIndexPhotos] =
    React.useState();

  const [selected, setSelected] = React.useState(0);
  let location = { lat: "", lng: "" };

  console.log(state);
  let reqBody = {
    lat: state.lat.toString(),
    long: state.lng.toString(),
  };
  const getDataFromMap = (lat, long) => {
    location.lat = lat;
    location.lng = long;
  };

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/envfactors", reqBody)
      .then((response) => {
        console.log(response.data.result);

        setEnveIndex(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log("envndex");
        console.log(envndex);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/healthcare", reqBody)
      .then((response) => {
        console.log(response.data.result);
        setHealthcareIndex(response.data.result.IndexValue);
        setHealthCarePlaces(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log(healthcarePlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/education", reqBody)
      .then((response) => {
        console.log(response.data.result);
        setEductionIndex(response.data.result.IndexValue);
        setEducationPlaces(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log(educationPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/essentialgood", reqBody)
      .then((response) => {
        console.log(response.data.result);
        setEssentialGoodIndex(response.data.result.IndexValue);
        setEssentialGoodPlaces(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log(essentialGoodPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/recreational", reqBody)
      .then((response) => {
        console.log(response.data.result);
        setRecreationalGoodIndex(response.data.result.IndexValue);
        setRecreationalGoodPlaces(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log(recreationalPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/transport", reqBody)
      .then((response) => {
        console.log(response.data.result);
        settransportIndex(response.data.result.IndexValue);
        settransportPlaces(
          response.data.result.places[response.data.result.places.length - 1]
        );

        console.log(transportPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8005/api/properties", reqBody)
      .then((response) => {
        setnearbyPropertiesIndex(response.data.result);

        console.log("nearbyProperties");
        console.log(nearbyProperties);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (nearbyProperties) {
    return (
      <div class="insights">
        <NavBar></NavBar>

        <body class="g-sidenav-show  bg-gray-200">
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">health_and_safety</i>
                    </div>
                    <div class="text-end pt-1">
                      <h1 class="text-md mb-0 text-capitalize">
                        Health Care Quality Index {"     "}
                      </h1>
                      <h2 class="mb-0">{healthcareIndex}</h2>
                    </div>
                    <div class="tooltip">
                      Hover over me
                      <span class="tooltiptext">Tooltip text</span>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      Hospitals{"     "}
                      <span class="text-success text-lg font-weight-bolder">
                        {healthcarePlaces.count1 || 0}
                      </span>
                    </p>
                    <p class="mb-0">
                      Pharmacies{" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {healthcarePlaces.count2 || 0}
                      </span>
                    </p>
                    <p class="mb-0">
                      Dispensaries/Doctor{" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {healthcarePlaces.count3 || 0}
                      </span>
                    </p>
                    <p class="mb-0">
                      Dental Centers{" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {healthcarePlaces.count4 || 0}
                      </span>
                    </p>
                    <p class="mb-2">
                      Other medical centers(Drug store,Veterinary care){" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {healthcarePlaces.count5 || 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">school</i>
                    </div>
                    <div class="text-end pt-1">
                      <h1 class="text-md mb-0 text-capitalize">
                        Education Quality Index
                      </h1>
                      <h2 class="mb-0">{eductionIndex}</h2>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      Primary Schools
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {educationPlaces.count1}{" "}
                      </span>
                    </p>
                    <p class="mb-0">
                      Schools/Secondary_schools
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {educationPlaces.count2}
                      </span>
                    </p>

                    <p class="mb-0">
                      Universities/Higher Education Insititutes
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {educationPlaces.count3}
                      </span>
                    </p>
                    <p class="mb-7">
                      {" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">shopping_cart</i>
                    </div>
                    <div class="text-end pt-2">
                      <h2 class="text-md mb-0 text-capitalize">
                        Essential Good Quality Index
                      </h2>
                      <h2 class="mb-0">{essentialGoodIndex}</h2>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      Supermarkets
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {essentialGoodPlaces.count1}
                      </span>
                    </p>

                    <p class="mb-0">
                      Banks / Atms
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {essentialGoodPlaces.count2}
                      </span>
                    </p>
                    <p class="mb-0">
                      Resturants / Hotels
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {essentialGoodPlaces.count3}
                      </span>
                    </p>
                    <p class="mb-0">
                      Clothing stores / Shoe Stores / Salons
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {essentialGoodPlaces.count4}
                      </span>
                    </p>

                    <p class="mb-2">
                      Other Stores(furniture stores , gas Stations ect.)
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {essentialGoodPlaces.count5}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">sports_handball</i>
                    </div>
                    <div class="text-end pt-1">
                      <h3 class="text-md mb-0 text-capitalize">
                        Recreational Facilities Index
                      </h3>
                      <h2 class="mb-0">{recreationalIndex}</h2>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      Gym / Fiteness Centers{" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {recreationalPlaces.count1}
                      </span>
                    </p>
                    <p class="mb-0">
                      Parks / Gardens{" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {recreationalPlaces.count2}
                      </span>
                    </p>
                    <p class="mb-0">
                      Religous Places(Temples,church ects .){" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {recreationalPlaces.count3}
                      </span>
                    </p>
                    <p class="mb-6">
                      other Places(Movie Theater, Museum ect.){" "}
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {recreationalPlaces.count5}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr class="dark horizontal my-3" />

              <div class="col-xl-3 col-sm-6">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-warning shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">bus_alert</i>
                    </div>
                    <div class="text-end pt-1 index">
                      <h1 class="text-md b-0 text-capitalize">
                        Transport Index
                      </h1>
                      <h4 class="mb-0">{transportIndex}</h4>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      Bus Stations / Taxi Stands
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {transportPlaces.count1}
                      </span>
                    </p>
                    <p class="mb-0">
                      Train Stations
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {transportPlaces.count2}
                      </span>
                    </p>
                    <p class="mb-0">
                      Parking plots
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {transportPlaces.count3}
                      </span>
                    </p>

                    <p class="mb-0">
                      Other Transport hubs(Air port ect.)
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                        {transportPlaces.count5}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-sm-6">
                <div class="card">
                  <div class="card-header p-3 pt-2">
                    <div class="icon icon-lg icon-shape bg-gradient-danger shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i class="material-icons opacity-10">nature_people</i>
                    </div>
                    <div class="text-end pt-4 index">
                      <h1 class="text-md b-0 text-capitalize">
                        Environmental Quality Factor
                      </h1>
                    </div>
                  </div>
                  <hr class="dark horizontal my-0" />
                  <div class="card-footer p-3">
                    <p class="mb-0">
                      -Within 0.5 km-
                      <span class="text-success text-lg font-weight-bolder">
                        {"  "}
                      </span>
                    </p>
                    <p class="mb-0">
                      Rivers
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {envndex.count1}
                      </span>
                    </p>
                    <p class="mb-0">
                      Mountains/Hills
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {envndex.count3}
                      </span>
                    </p>

                    <p class="mb-0">
                      Forests
                      <span class="text-danger text-lg font-weight-bolder">
                        {"  "}
                        {envndex.count3}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
              <div class="card">
                <div class="card-header pb-0">
                  <div class="row">
                    <div class="col-lg-6 col-7">
                      <h2>Google Map</h2>
                      <p class="text-lg mb-0">
                        <i class="fa fa-check text-info" aria-hidden="true"></i>
                        <span class="font-weight-bold ms-1">
                          5 km radius map view
                        </span>
                      </p>
                      <MyMapComponent data={reqBody}></MyMapComponent>
                    </div>
                    <div class="col-lg-6 col-5 my-auto text-end">
                      <div class="dropdown float-lg-end pe-4">
                        <a
                          class="cursor-pointer"
                          id="dropdownTable"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v text-secondary"></i>
                        </a>
                        <ul
                          class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                          aria-labelledby="dropdownTable"
                        >
                          <li>
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              Action
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              Another action
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body px-0 pb-2">
                  <div class="table-responsive"></div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="card h-100">
                <div class="card-header pb-0">
                  <h3>Nearby Properties</h3>
                </div>

                <div class="card-body p-4">
                  <div class="timeline timeline-one-side">
                    <div class="timeline-block mb-4">
                      <span class="timeline-step">
                        <i class="material-icons text-dark text-gradient">
                          account_balance
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Banks
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[0].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#bankModal2"
                              onClick={() => {
                                setSelected("bank");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="timeline-block mb-4">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          school
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Schools
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[1].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#schoolModal2"
                              onClick={() => {
                                setSelected("school");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="timeline-block mb-4">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          local_hospital
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Health Care Centers
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[2].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#hospitalModal2"
                              onClick={() => {
                                setSelected("hospital");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          credit_card
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Supermarkets
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[4].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#supermakets2"
                              onClick={() => {
                                setSelected("supermakets");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          fitness_center
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Gyms
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[3].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#gym2"
                              onClick={() => {
                                setSelected("gym");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark text-gradient">
                          payments
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Atms
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[5].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#atm2"
                              onClick={() => {
                                setSelected("hospital");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          hotel
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Resturants
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[6].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#hotel2"
                              onClick={() => {
                                setSelected("hospital");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          directions_bus
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Transists
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[7].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#transist2"
                              onClick={() => {
                                setSelected("hospital");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="timeline-block mb-3">
                      <span class="timeline-step">
                        <i class="material-icons text-dark  text-gradient">
                          park
                        </i>
                      </span>
                      <div class="timeline-content">
                        <div class="row">
                          <div class="col-8">
                            <h2 class="text-dark text-lg font-weight-bold mb-0">
                              Parks
                            </h2>
                            <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                              {nearbyProperties.results[8].count || 0}
                            </p>
                          </div>
                          <div class="col-4">
                            {" "}
                            <span
                              class="badge badge-sm bg-gradient-info"
                              button
                              type="button"
                              data-toggle="modal"
                              data-target="#hospitalModal2"
                              onClick={() => {
                                setSelected("hospital");
                              }}
                            >
                              View more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>

        <div
          class="modal custom fade"
          id="bankModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Banks
                </h5>
              </div>

              <div class="modalbody">
                <div className="container ">
                  {nearbyProperties ? (
                    nearbyProperties.results[0].palces.map((item) => {
                      
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>
                          
                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}

                        </div>
                        
                      );
                   
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="schoolModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Schools
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                 
                    nearbyProperties.results[1].palces.map((item) => {
                     
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                            <li class="list-group-item"> </li>
                          </ul>
                          
                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}

                        </div>
                        
                      );
                   
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="hospitalModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Hospitals
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    nearbyProperties.results[2].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                            
                          </ul>

                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="supermakets2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby super markets /Grocery Shops
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    
                    nearbyProperties.results[4].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>
                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="gym2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Gym / Fitness Centers
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    nearbyProperties.results[3].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>

                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="hotel2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Resturants
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    nearbyProperties.results[6].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>

                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="atm2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Atms
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    nearbyProperties.results[5].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>

                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal custom fade"
          id="transist2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header modaltitle">
                <h5 class="modal-title modaltitletxt" id="myModalLabel2">
                  Nearby Transits
                </h5>
              </div>

              <div class="modal-body modalbody">
                <div className="container">
                  {nearbyProperties ? (
                    nearbyProperties.results[7].palces.map((item) => {
                      if (typeof item.photos == "undefined"){
                        console.log("no photos");
                        return (
                          <div>no photos available</div>
                        )
                      }
                      return (
                        <div>
                          <ul class="list-group">
                            <li class="list-group-item primary">
                              {" "}
                              {item.name}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.business_status}
                            </li>
                            <li class="list-group-item">
                              {" "}
                              {item.formatted_address}
                            </li>

                            <li class="list-group-item">
                              {" "}
                              <Rating
                                class="rating"
                                ratingValue={item.rating * 10}
                              />
                            </li>
                          </ul>

                          {item ? (
                            item.photos.map((cal) => {
                              return (
                                <div>
                                  <img
                                    src={
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                      cal.photo_reference +
                                      "&key=AIzaSyD_l997kF6J5hiFZO5ExgCH-XHCMG1SydA"
                                    }
                                  ></img>

                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  } else {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
}
