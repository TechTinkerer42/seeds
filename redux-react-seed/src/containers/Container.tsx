import * as React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import Header from "./Header"
import Footer from "./Footer"

class Container extends React.Component<any, any> {
    constructor ( props: any ) {
        super( props )
    }

    componentDidMount() {
        const { dispatch, userInfo, location, children } = this.props

        let userName = userInfo.get("userName")
        
        if ( !userName ) {
            dispatch(push("/Login"))
        }
    }

    render() {
        const { userInfo, location, children } = this.props

        let content = <div>loading...</div>
        let userName = userInfo.get("userName")
        if ( userName ) {
            content = (
                <div>
                    <Header />
                    <div className="container row">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <div>{ children }</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        return content
    }
}

const mapStateToProps = ( state: any, ownProps: any ) => {
    return Object.assign({
        userInfo: state.get("user").get("userInfo")
    })
}

export default connect<any, any, any>( mapStateToProps )( Container )