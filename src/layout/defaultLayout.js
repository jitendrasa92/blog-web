import React, { Component } from "react";
import Header from "../components/elements/Header";
import Footer from "../components/elements/Footer";

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div classNam="edica-loader"></div>
                <Header />
                {this.props.children}
                <Footer />
            </React.Fragment>
        );
    }
}

export default DefaultLayout;