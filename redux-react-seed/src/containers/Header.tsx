import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import HeaderUserState from "../components/HeaderUserState"

export default class Header extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    render() {
        return (
            <header>
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                <Link to="/">Headline</Link>
                            </div>
                        </div>
                        <div className="navbar-text navbar-right">
                            <HeaderUserState />
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}
