import "bootstrap/dist/css/bootstrap.min.css"
import "./index.tsx"
import "./index.html"

if ( process.env.NODE_ENV === "mockdevelopment" ) {
    require("../test/")
}