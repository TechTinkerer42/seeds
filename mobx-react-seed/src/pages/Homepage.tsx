import * as React from "react";
import { Link } from "react-router";
import { observable, action, useStrict } from "mobx";
import { observer, inject } from "mobx-react";
import Header from "../components/Header";
import User from "../classes/User";

useStrict(true);

interface HomepageProps {
    user: User
};

interface HomepageState {
};

@inject("user") @observer
export default class Homepage extends React.Component<HomepageProps, HomepageState> {

    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header user={this.props.user} />
                <h1>Hello World!</h1>
            </div>
        );
    }
}