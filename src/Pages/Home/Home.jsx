import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";
import Banner from "../../component/Banner/Banner";
import Marketing from "../../component/marketing/marketing";

export default function Home() {
  return (
    <div>
      <NavBar></NavBar>
      <Banner></Banner>
      <Marketing></Marketing>
      <Footer></Footer>
    </div>
  );
}
