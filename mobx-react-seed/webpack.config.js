const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("style.css?[contentHash]");

module.exports = {
    context: __dirname,
    entry: {
        main: "./src/app.ts",
        vendor: "./src/vendor.ts"
    },
    output: {
        filename: "[name].js",
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
        function() {
            this.plugin("done", function(stats){
                let chunks = stats.toJson().chunks,
                    key, file;
                file = fs.readFileSync(path.join(__dirname, "src", "index.html"), "utf8");
                chunks.forEach(function(chunk) {
                    chunk.files.forEach(function(filename){
                        let names = /^([^?]+)\??(.*)$/.exec(filename);
                        let name = filename;
                        if (!names[2]) {    //无hash值,补上trunkHash
                            name = `${names[1]}?${chunk.hash}`;
                        }
                        file = file.replace(names[1], name);
                    });
                });
                if (!fs.existsSync(path.join(__dirname, "build"))) {
                    fs.mkdirSync(path.join(__dirname, "build"));
                }
                fs.writeFileSync(path.join(__dirname, "build", "index.html"), file, "utf8");
            });
        }
    ],

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