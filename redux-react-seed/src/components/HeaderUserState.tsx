import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

interface HeaderUserProps {
	userInfo: any
}

class HeaderUserState extends React.Component<HeaderUserProps, undefined> {

	constructor( props: any ) {
		super( props )
	}

	render(){
		const { userInfo } = this.props
		let loginButton
		let userName = userInfo.get("userName")
		if( !userName ){
			loginButton = <Link to="/login" >登录</Link>
		}else{
			loginButton = <Link to="/logout" >注销</Link>
		}
		return (
			<div>
				{ userName ? <span>{ "欢迎，" + userName }</span> : null }
				{ loginButton }
			</div>
		)
	}
}

function mapStateToProps( state: any ) {
	return Object.assign({
		userInfo: state.get("user").get("userInfo")
	})

}

export default connect( mapStateToProps )( HeaderUserState )