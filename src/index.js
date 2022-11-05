// test
console.log("Hello World!");

// // The URL on your server where CesiumJS's static files are hosted.
// window.CESIUM_BASE_URL = "/";

// import * as Cesium from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

// // Your access token can be found at: https://cesium.com/ion/tokens.
// // Replace `your_access_token` with your Cesium ion access token.

// Cesium.Ion.defaultAccessToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjljZWVmZC1kMmY0LTQzNDctYjg3Ny0wZmVkODQyZmVmNDIiLCJpZCI6MTEzNjk3LCJpYXQiOjE2Njc1NzA2ODF9.hQHuUwu4vjfHu2x32CQVuuAPRV2l2FvLijahPdK41rQ";

// // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
// const viewer = new Cesium.Viewer("cesiumContainer", {
//     terrainProvider: Cesium.createWorldTerrain(),
// });
// // Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = viewer.scene.primitives.add(
//     Cesium.createOsmBuildings()
// );
// // Fly the camera to San Francisco at the given longitude, latitude, and height.
// viewer.camera.flyTo({
//     destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//     orientation: {
//         heading: Cesium.Math.toRadians(0.0),
//         pitch: Cesium.Math.toRadians(-15.0),
//     },
// });
