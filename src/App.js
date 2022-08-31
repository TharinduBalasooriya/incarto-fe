import React from "react";
import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home/Home";
import PropertyList from "./Pages/PropertyList/PropertyList";
import Addview from "./Pages/Addview";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Form from "./Pages/ListPropertyForm/Form";
import CreatePrefProfile from "./Pages/CreatePrefProfile/CreatePrefProfile";
import Pricepredictview from "./Pages/avgpricePredicter/Pricepredictview";
import PrefProfileMgmt from './Pages/PrefProfileMgmt/prefProfileMgmt';
import Insights from "./Pages/insights/Insights";
import MapSuitability from "./component/Map/MapSuitability";

function App() {
  return (
    <BRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addview" element={<Addview />} />
        <Route path="/propertyList" element={<PropertyList />} />
        <Route path="/createAd" element={<Form />} />
        <Route exact path="/createPrefProfile" element={<CreatePrefProfile />} />
        <Route exact path="/avgpricepredicter" element={<Pricepredictview />} />
        <Route exact path="/prefProfileMgmt" element={<PrefProfileMgmt />} />
        <Route exact path="/insights" element={<Insights/>} />
        <Route exact path="/suitabilityMap" element={<MapSuitability></MapSuitability>} />

      </Routes>
    </BRouter>
  );
}

export default App;
