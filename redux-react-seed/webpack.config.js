function buildConfig(env) {
    return require("./webpack/" + env + ".js")
}

module.exports = buildConfig;