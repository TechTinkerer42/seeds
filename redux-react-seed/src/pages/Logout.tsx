import * as React from "react"
import { connect } from "react-redux"
import { fetchLogout } from "../actions/login"

class Logout extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch( fetchLogout( () => {
            this.goHome()
        }) )
    }

    goHome() {
        this.props.history.replace( {
            pathname: "/"
        } )
    }

    render() {

        return <div />
    }
}


const mapStateToProps = ( state: any ) => {
	const { userinfo } = state.userInfo || {
		userinfo : {}
	}
	return {
		userinfo
	}

}

export default connect<any, any, any>( mapStateToProps )( Logout )