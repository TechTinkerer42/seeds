import * as React from "react"
import { connect } from "react-redux"
import { fetchLogout } from "../actions/login"

class Logout extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch( fetchLogout() )
    }

    render() {
        return <div />
    }
}


const mapStateToProps = ( state: any, ownProps: any ) => {
    return Object.assign({
        userInfo: state.get("user").get("userInfo")
    })
}

export default connect<any, any, any>( mapStateToProps )( Logout )