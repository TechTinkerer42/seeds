import * as React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

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
			loginButton = <NavLink to="/login" >登录</NavLink>
		}else{
			loginButton = <NavLink to="/logout" >注销</NavLink>
		}
		return (
			<div>
				{ this.props.userinfo.username ? <span>{ "欢迎，" + this.props.userinfo.username }</span> : null }
				{ loginButton }
			</div>
		)
	}
}