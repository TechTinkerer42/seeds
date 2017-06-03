import * as React from "react"
import { connect } from "react-redux"
import Container from "../containers/Container"
import Header from "../containers/Header"
import Footer from "../containers/Footer"

class Home extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    render() {
        return (
            <Container>
                Home
            </Container>
        )
    }
}

const mapStateToProps = ( state: any, ownProps: any ) => {
    return Object.assign({
        userInfo: state.get("user").get("userInfo")
    })
}

export default connect<any, any, any>( mapStateToProps )( Home )