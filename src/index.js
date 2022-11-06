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

// G空間情報センターに置かれている、プロジェクトPlateauで作成した、オルソ画像タイルの参照
var imageProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://gic-plateau.s3.ap-northeast-1.amazonaws.com/2020/ortho/tiles/{z}/{x}/{y}.png",
    maximumLevel: 19,
});
var current_image =
    viewer.scene.imageryLayers.addImageryProvider(imageProvider);

// 東京都千代田区の建物データ（3D Tiles）
var your_3d_tiles = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: "https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/notexture/tileset.json",
    })
);

// カメラの初期位置の指定
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(139.76, 35.68, 5000.0),
});
