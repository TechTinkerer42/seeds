const webpack = require("webpack");
const baseConfig = require("./base");

module.exports = Object.assign( baseConfig, {
    plugins: baseConfig.plugins.concat([
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify( "development" )
        })
    ]),
    devServer: {
        proxy: {
            "/api/*": {
                target: {
                    host: "example.com",
                    protocol: "http",
                    port: 80
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        }
    }
});
