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
//     position: Cesium.Cartesian3.fromDegrees(139.756389, 35.637222, 0.0),

//     box: {
//         dimensions: new Cesium.Cartesian3(5000.0, 5000.0, 1.0),
//         material: Cesium.Color.CYAN.withAlpha(0.3),
//     },
// });

// The height, in meters, above the ellipsoid.

const seaLevelRise = viewer.entities.add({
    name: "virtual sea level rise",
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(139.7, 35.61, 139.78, 35.65),
        material: Cesium.Color.CYAN.withAlpha(0.3),
        // rotation: Cesium.Math.toRadians(45),
        // extrudedHeight: 3776.0,
        // extrudedHeight: 136.4424, // 日本のジオイド2011より算出36.4424
        // EGM96:39.37
        height: 39,
    },
});

// カメラの初期位置を設定
const setCameraView = (initialLat, initialLon) => {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            initialLon,
            initialLat,
            5000.0
        ),
    });
};

function getCurrentPositionIsSuccess(position) {
    const initialLat = position.coords.latitude;
    const initialLon = position.coords.longitude;
    setCameraView(initialLat, initialLon);
}

function getCurrentPositionIsError() {
    console.log("位置取得できませんでした、カメラをデフォルト位置に設定します");
    const initialLat = 35.6451607;
    const initialLon = 139.7552528;
    setCameraView(initialLat, initialLon);
}

// 位置情報API
if (navigator.geolocation) {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(
        getCurrentPositionIsSuccess,
        getCurrentPositionIsError
    );
} else {
    console.log("Geolocation is not supported by your browser");
}
