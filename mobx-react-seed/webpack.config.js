const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("style.css?[hash]");

module.exports = {
    context: __dirname,
    entry: {
        main: "./app.js",
        vendor: "./vendor.js"
    },
    output: {
        filename: "[name].js?[hash]",
        path: path.resolve(__dirname, "build")
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { 
                test: /\.less$/, 
                loader: extractCSS.extract("css!csso!postcss!less") 
            }, { 
                test: /\.tsx?$/, 
                exclude: [ 
                    path.resolve(__dirname, "node_modules")
                ], 
                loader: "ts" 
            }, { 
                test: /\.html?$/, 
                loader: "file?name=[name].html" 
            }, { 
                test: /\.(png|jpg|gif)?$/, 
                loader: "file?name=assets/[name].[ext]?[hash]" 
            }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
        function() {    //为html内引用的静态文件增加压缩前hash
            this.plugin("done", function(stats){
                let assets = stats.toJson().assetsByChunkName,
                    key, file;
                file = fs.readFileSync(path.join(__dirname, "build", "index.html"), "utf8");
                for (key in assets) {
                    assets[key].forEach(function(name) {
                        let oname = name.replace(/^([^?]+).*$/, "$1");
                        file = file.replace(oname, name);
                        console.log(name);
                        console.log(oname);
                    });
                }
                fs.writeFileSync(path.join(__dirname, "build", "index.html"), file, "utf8");
            });
        }
    ],

    /**
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "mobx": "Mobx",
        "mobx-react": "MobxReact"
    },
     */

    devServer: {
        proxy: {
            "/api/*": {
                target: {
                    host: "develop-server.in",
                    protocol: "http",
                    port: 80
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        }
    },

    postcss: [ autoprefixer({ browsers: ["last 4 iOS versions", "> 1%"] }) ]
};