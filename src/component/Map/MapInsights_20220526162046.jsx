/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";

export default function Map(props) {
  let map;
  // eslint-disable-next-line no-unused-vars
  let markers = [];

  console.log("props")
console.log(props.data.lat.toString())
console.log(props.data.long)
  const myLatLng = { lat:  parseFloat(props.data.lat), lng: parseFloat(props.data.long) };



  function initMap() {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: myLatLng ,
      zoom: 13,
    });
    map.setTilt(45);

    const panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: myLatLng,
        pov: { heading: 165, pitch: 0 },
      zoom: 1,
      }
    );
  
    map.setStreetView(panorama);

    var marker = new window.google.maps.Marker({
      position: myLatLng,
     
   
    });

    // eslint-disable-next-line no-unused-vars
    const cityCircle = new window.google.maps.Circle({
      strokeColor: "#003153",
      strokeOpacity: 0.4,
      strokeWeight: 1,
      fillColor: "#003153",
      fillOpacity: 0.2,
      map,
      center: myLatLng,
      radius: 5000,
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }

  function trafficmap() {
    const trafficLayer = new window.google.maps.TrafficLayer();

    trafficLayer.setMap(map);
    this.setState({
      show: true,
    });
  }
  useEffect(() => {
    initMap();
  });

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <span
              class="badge badge-sm bg-gradient-secondary"
              button
              type="button"
              onClick={trafficmap}
            >
              Live Traffic
            </span>
        
          </div>

          <div class="col-sm">
          <span class="badge badge-sm bg-gradient-white text-dark">
        
              fast{" "}
              
              <img
                src="https://i.ibb.co/tX9tmWB/sjbjs.png"
                width="150"
                height="25"
              />{" "}
              Slow
            </span>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>

      <div    style={{ width: 1000, height: 700 }} id="map" />
      <div style={{ width: 1000, height: 300 }} id="pano"></div>
    </div>
  );
}
