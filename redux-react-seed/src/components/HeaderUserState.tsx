import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

interface HeaderUserProps {
	userinfo: any
}

export default class HeaderUserState extends React.Component<HeaderUserProps, undefined> {

	constructor( props: any ) {
		super( props )
	}

	render(){
		let loginButton
		if( !this.props.userinfo.username ){
			loginButton = <Link to="/login" >登录</Link>
		}else{
			loginButton = <Link to="/logout" >注销</Link>
		}
		return (
			<div>
				{ this.props.userinfo.username ? <span>{ "欢迎，" + this.props.userinfo.username }</span> : null }
				{ loginButton }
			</div>
		)
	}
}