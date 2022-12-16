import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css";

// Cesium Ionの読み込み指定
Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2UyMjcwOS00MDY1LTQxYjEtYjZjMy00YTU0ZTg5MmViYWQiLCJpZCI6ODAzMDYsImlhdCI6MTY0Mjc0ODI2MX0.dkwAL1CcljUV7NA7fDbhXXnmyZQU_c-G5zRx8PtEcxE";

// Terrainの指定（EGM96、国土数値情報5m標高から生成した全国の地形モデル、5m標高データが無い場所は10m標高で補完している）
var viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(770371),
    }),
});

// ジオイド面用にTerrainを追加（EGM96）
const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(1434440),
    })
);

// G空間情報センターに置かれている、プロジェクトPlateauで作成した、オルソ画像タイルの参照
var imageProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://gic-plateau.s3.ap-northeast-1.amazonaws.com/2020/ortho/tiles/{z}/{x}/{y}.png",
    maximumLevel: 19,
});
var current_image =
    viewer.scene.imageryLayers.addImageryProvider(imageProvider);

// 東京都千代田区の建物データ（3D Tiles）
// minato-ku
var your_3d_tiles_Minato = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: "https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13103_minato-ku/notexture/tileset.json",
    })
);
// shinagawa-ku

var your_3d_tiles_shinagawa = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: "https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13109_shinagawa-ku/notexture/tileset.json",
    })
);

// const seaLevelRise = viewer.entities.add({
//     name: "標高0m",
//     polygon: {
//         height: 45, //EGM96: 39.37 Meters
//     },
//     position: Cesium.Cartesian3.fromDegrees(138.7191, 35.1002, 40.88),

//     box: {
//         dimensions: new Cesium.Cartesian3(10000.0, 10000.0, 0.0),
//         material: Cesium.Color.CYAN.withAlpha(0.3),
//     },
// });

//
const level = viewer.entities.add({
    name: "height=3776m",
    rectangle: {
        // 曲率が無視できる程度の範囲なら適応できる
        coordinates: Cesium.Rectangle.fromDegrees(
            138.7274 - 0.01,
            35.3606 - 0.01,
            138.7274 + 0.01,
            35.3606 + 0.01
        ),
        // height: 3776,
        extrudedHeight: 3776 + 40.88,
        material: Cesium.Color.RED.withAlpha(0.5),
    },
});

// const levelPlusGeoid = viewer.entities.add({
//     name: "height=3776+40.88m",
//     rectangle: {
//         // 曲率が無視できる程度の範囲なら適応できる
//         coordinates: Cesium.Rectangle.fromDegrees(
//             138.7274 - 0.01,
//             35.3606 - 0.01,
//             138.7274 + 0.01,
//             35.3606 + 0.01
//         ),
//         height: 3776 + 40.88,
//         material: Cesium.Color.YELLOW.withAlpha(0.5),
//     },
// });

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(138.7274, 35.3606 - 0.005, 4000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-20.0),
    },
});
