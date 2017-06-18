const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new ExtractTextPlugin("app.css")

module.exports = {
    context: path.join(__dirname, "/../" ),
    entry: {
        app: "./src/app.ts",
        vendor: "./src/vendor.ts"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "/../build")
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: extractCSS.extract("css-loader!less-loader") 
            }, {
                test: /\.tsx?$/, 
                exclude: [ 
                    path.resolve(__dirname, "node_modules")
                ], 
                loader: "ts-loader" 
            }, { 
                test: /\.html$/, 
                loader: "file-loader?name=[name].html"
            }, { 
                test: /\.css$/, 
                loader: "file-loader?name=[name].css"
            }
        ]
    },

    plugins: [
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            names: ["app", "vendor"]
        })
    ]
};