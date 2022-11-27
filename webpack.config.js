// The path to the CesiumJS source code
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
    // ベースとなるディレクトリ（デフォルトのカレントディレクトリのまま）
    context: __dirname,
    // エントリーポイントの設定（デフォルトのまま）
    entry: {
        app: "./src/index.js",
    },
    // ビルドしたファイルの出力場所
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
        sourcePrefix: "",
    },
    // amd: {
    //     // Enable webpack-friendly use of require in Cesium
    //     toUrlUndefined: true,
    // },
    resolve: {
        fallback: { https: false, zlib: false, http: false, url: false },
        mainFiles: ["index", "Cesium"],
    },
    module: {
        // 各ローダーの設定
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                        },
                    },
                ],
            },
            // これちゃんと機能してるかよくわからない
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                type: "asset/inline",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
                { from: path.join(cesiumSource, "Assets"), to: "Assets" },
                { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
            ],
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify(""),
        }),
    ],
    // webpackの--modeと同じ
    mode: "development",
    // webpackの--devtoolと同じ。evalはソースマップを生成しない
    // devtool: "eval",
    devtool: "source-map",
};
