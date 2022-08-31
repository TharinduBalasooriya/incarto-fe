
import React from 'react';
import Predict from '../../component/avgprice/Predict';
import Predictslide from '../../component/avgprice/Predictslide';
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";


export default function Pricepredictview() {
  return (
    <div>
   <NavBar></NavBar>
    <div class="container">
  <div class="row">
    <div class="col-7">
        <Predict/>
    </div>
    <div class="col-5">
        <Predictslide/>
    </div>
   
  </div>

    
    </div>
    <Footer></Footer>
    </div>
  );
}
