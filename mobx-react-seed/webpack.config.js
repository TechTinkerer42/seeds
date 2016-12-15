let autoprefixer = require("autoprefixer");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin("style.css");

module.exports = {
    context: __dirname,
    entry: "./app.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.less$/, loader: extractCSS.extract('css!csso!postcss!less') },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        extractCSS
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter"
    },

    devServer: {
        proxy: {
            '/api/*': {
                target: {
                    host: 'develop-server.in',
                    protocol: 'http',
                    port: 80
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        }
    },

    postcss: [ autoprefixer({ browsers: ['last 4 iOS versions', '> 1%'] }) ]
};