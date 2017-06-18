if ( process.env.NODE_ENV === "mockdevelopment" ) {
    require("../test/")
}

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.tsx"
import "./index.html"
import "./styles/entry.less"
