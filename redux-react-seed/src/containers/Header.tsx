import * as React from "react"
import { connect } from "react-redux"
import { is } from "immutable"
import HeaderUserState from "../components/HeaderUserState"

class Header extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    shouldComponentUpdate( nextProps: any, nextState: any) {
        if ( !is( this.props.userinfo.get( "username" ), nextProps.userinfo.get( "username" ) ) ) {
            return true;
        }
        return false
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


const mapStateToProps = ( state: any ) => {
	return {
		userinfo: state.get( "userInfo" )
	}

}

export default connect( mapStateToProps )( Header )