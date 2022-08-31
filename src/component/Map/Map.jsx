import React, { useEffect } from "react";

export default function Map(props) {
  let map;
  let markers = [];
  



  let center = { lat: 7.028883269941137, lng: 80.11505286363685 };
  function initMap() {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 8,
    });

    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      let location = mapsMouseEvent.latLng.toJSON();
      addMarker(location.lat, location.lng);
    });
  }

  function addMarker(lat, lng) {
    markers.forEach(elem=>{
      elem.setMap(null);
    })

    var marker = new window.google.maps.Marker({
      position: { lat: lat, lng: lng },
      title: "Hello World!",
    });

    markers.push(marker)
    marker.setMap(map);
    props.callBack(lat,lng)
    
  }
  useEffect(() => {
    initMap();

  });
  return (
    <div>
      <div style={{ width: 700, height: 700 }} id="map" />
    </div>
  );
}
