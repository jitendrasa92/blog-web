import React, { Component } from "react";


class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                <div classNam="edica-loader"></div>
                <main>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-11 mx-auto">
                                <section class="edica-404">
                                    <h1 class="page-title" data-aos="fade-up">404</h1>
                                    <h5 class="edica-404-subtitle" data-aos="fade-up" data-aos-delay="100">Page not found!</h5>
                                    <p class="edics-404-text" data-aos="fade-up" data-aos-delay="200">Oops! The page you are looking for does not exist.It might have been moved or deleted.</p>
                                    <a href="index.html" class="edica-404-link btn btn-warning" data-aos="fade-up" data-aos-delay="300">Go BAck</a>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
                <section className="edica-footer-banner-section">
                    <div className="container">
                        <div className="footer-banner" data-aos="fade-up">
                            <h1 className="banner-title">Download it now.</h1>
                            <div className="banner-btns-wrapper">
                                <button className="btn btn-success"> <img src="assets/images/apple@1x.svg" alt="ios" className="mr-2" /> App Store</button>
                                <button className="btn btn-success"> <img src="assets/images/android@1x.svg" alt="android" className="mr-2" /> Google Play</button>
                            </div>
                            <p className="banner-text">Add some helper text here to explain the finer details of your <br /> product or service.</p>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Contact;