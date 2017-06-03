import * as React from "react"
import { connect } from "react-redux"
import { fetchLogin } from "../actions/login"
import Header from "../containers/Header"
import Footer from "../containers/Footer"

class Login extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
        this.state = {
            userName: "",
            password: ""
        }
    }

    handleAccountChange( evt: any ) {
        this.setState( {
            userName: evt.target.value
        })
    }

    handlePasswordChange( evt: any ) {
        this.setState( {
            password: evt.target.value
        })
    }

    login() {
        const { dispatch } = this.props
        dispatch( fetchLogin( this.state.userName, this.state.password ) )
    }

    render() {

        return (
            <div>
                <Header />
                <div>
                    <div className="panel panel-primary" style={{width: "400px", margin: "100px auto"}} >
                        <div className="panel-heading">登录</div>
                        <div className="panel-body" style={{paddingTop: "20px"}}>
                            <form>
                                <div className="form-group">
                                    <label>用户名：</label>
                                    <input type="text" className="form-control" value={ this.state.userName } placeholder="用户名" onChange={ this.handleAccountChange.bind( this ) } />
                                </div>
                                <div className="form-group">
                                    <label>密码：</label>
                                    <input type="password" className="form-control" value={ this.state.password } placeholder="密码" onChange={ this.handlePasswordChange.bind( this ) } />
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary" onClick={ this.login.bind( this ) } >登录</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = ( state: any, ownProps: any ) => {
    return Object.assign({
        userInfo: state.get("user").get("userInfo")
    })
}

export default connect<any, any, any>( mapStateToProps )( Login )