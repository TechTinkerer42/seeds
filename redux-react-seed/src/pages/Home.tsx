import * as React from "react"
import { connect } from "react-redux"
import Header from "../containers/Header"
import Footer from "../containers/Footer"

class Home extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    Home Page
                </div>
                <Footer />
            </div>
        )
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

export default connect<any, any, any>( mapStateToProps )( Home )