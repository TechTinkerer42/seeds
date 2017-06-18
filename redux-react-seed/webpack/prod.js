const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new ExtractTextPlugin("app.[contentHash:20].css")
const baseConfig = require("./base")

module.exports = Object.assign( baseConfig, {
    output: {
        filename: "[name].[chunkhash].js",
        path: path.join(__dirname, "/../build")
    },

    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: extractCSS.extract( "css-loader!csso-loader!less-loader" ) 
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
                loader: "file-loader?name=[name].[hash:20].css"
            }
        ]
    },
    plugins: [
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            names: ["app", "vendor"]
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify( "production" )
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false
        }),
        function() {
            this.plugin("done", function(stats) {
                let assets = stats.toJson().assets
                let key
                let file
                file = fs.readFileSync( path.join("./src", "index.html" ), "utf-8")
                assets.forEach( (asset) => {
                    let filename = asset.name
                    let arrNames = /^(.+)\.([^.]+)\.([^.]+)$/i.exec( filename )
                    if ( arrNames && ( arrNames[3] === "css" || arrNames[3] === "js" )) {
                        let oriName = `${arrNames[1]}.${arrNames[3]}`
                        file = file.replace(oriName, filename)
                    }
                })
                if ( !fs.existsSync( "./build" )) {
                    fs.mkdirSync( "./build" )
                }
                fs.writeFileSync(path.join("./build", "index.html"), file, "utf8")
            })
        }
    ]
})