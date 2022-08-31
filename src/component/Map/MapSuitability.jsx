import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  AmbientLight,
  DirectionalLight,
  Matrix4,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let map;
const mapOptions = {
  tilt: 65,
  heading: 65,
  zoom: 15,
  center: { lat: 35.6594945, lng: 139.6999859 },
  mapId: "15431d2b469f209e",
};

let markers = [];



function initMap() {
  const mapDiv = document.getElementById("map3D");

  map = new window.google.maps.Map(mapDiv, mapOptions);

  markers.forEach((marker)=>{
      let lat = marker.lat;
      let lng = marker.long;
   
      var curr_marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        title: marker.name,
        label: marker.name,
        map: map,
       
      });


  })

  initWebglOverlayView(map);
}
function initWebglOverlayView(map) {
  let scene, renderer, camera, loader;
  const webglOverlayView = new window.google.maps.WebGLOverlayView();

  webglOverlayView.onAdd = () => {
    // Set up the scene.
    scene = new Scene();
    camera = new PerspectiveCamera();

    const ambientLight = new AmbientLight(0xffffff, 0.75); // Soft white light.

    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.25);

    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);
    // Load the model.
    loader = new GLTFLoader();

    const source =
      "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";

    loader.load(source, (gltf) => {
      gltf.scene.scale.set(50, 50, 50);
      gltf.scene.rotation.x = Math.PI; // Rotations are in radians.
      scene.add(gltf.scene);
    });
  };

  webglOverlayView.onContextRestored = ({ gl }) => {
    // Create the js renderer, using the
    // maps's WebGL rendering context.
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;
    // Wait to move the camera until the 3D model loads.
    loader.manager.onLoad = () => {
      renderer.setAnimationLoop(() => {
        webglOverlayView.requestRedraw();

        const { tilt, heading, zoom } = mapOptions;

        map.moveCamera({ tilt, heading, zoom });
        // Rotate the map 360 degrees.
        if (mapOptions.tilt < 67.5) {
          mapOptions.tilt += 0.5;
        } else if (mapOptions.heading <= 360) {
          mapOptions.heading += 0.2;
          mapOptions.zoom -= 0.0005;
        } else {
          renderer.setAnimationLoop(null);
        }
      });
    };
    document.getElementById("map3D").addEventListener("dblclick", stopRendering);
    function stopRendering() {
      renderer.setAnimationLoop(null);
    }
  };

  webglOverlayView.onDraw = ({ gl, transformer }) => {
    const latLngAltitudeLiteral = {
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 100,
    };
    // Update camera matrix to ensure the model is georeferenced correctly on the map.
    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);

    camera.projectionMatrix = new Matrix4().fromArray(matrix);
    webglOverlayView.requestRedraw();
    renderer.render(scene, camera);
    // Sometimes it is necessary to reset the GL state.
    renderer.resetState();
  };

  webglOverlayView.setMap(map);
}

export default function MapSuitability() {
  const location = useLocation();
  console.log(location);
  mapOptions.center = { lat: location.state.center.lat, lng: location.state.center.lng };
  markers = location.state.searchResult.closestPlaces;
  useEffect(() => {
    initMap();
  });
  return (
    <div>
      <div style={{ width: "100vw", height:"100vh"}} id="map3D" />
    </div>
  );
}
