import * as React from "react"
import { connect } from "react-redux"
import HeaderUserState from "../components/HeaderUserState"

class Header extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-md-2">
                        <h4>Logo</h4>
                    </div>
                    <div className="col-md-10">
                        <HeaderUserState userinfo={ this.props.userinfo } />
                    </div>
                </div>
            </header>
        )
    }
}


function select( state: any ) {
	const { userinfo } = state.get( "userInfo" ).toJS() || {
		userinfo : {}
	}
	return {
		userinfo
	}

}

export default connect( select )( Header )