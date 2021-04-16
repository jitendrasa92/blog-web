import React from "react";
import { connect } from 'react-redux';
import { saveAuthData } from '../../Services/actions/authAction';

import { useTranslation } from 'react-i18next';
import Form from "react-bootstrap/Form";

const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    saveAuthData: data => dispatch(saveAuthData(data)),
});

const Footer = (props) => {
    const { t, i18n } = useTranslation();
    const handalLng = (lng) => {
        props.saveAuthData({ lng: lng });
        i18n.changeLanguage(lng);
    }

    return (
        <div className="footer">
            <footer className="edica-footer" data-aos="fade-up">
                <div className="container">
                    <div className="row footer-widget-area">
                        <div className="col-md-3">
                            <a href="index.html" className="footer-brand-wrapper">
                                <img src="/assets/images/logo.svg" alt="edica logo" />
                            </a>
                            <p className="contact-details">hello@edica.com</p>
                            <p className="contact-details">+23 3000 000 00</p>
                            <nav className="footer-social-links">
                                <a href="#!"><i className="fab fa-facebook-f"></i></a>
                                <a href="#!"><i className="fab fa-twitter"></i></a>
                                <a href="#!"><i className="fab fa-behance"></i></a>
                                <a href="#!"><i className="fab fa-dribbble"></i></a>
                            </nav>
                        </div>
                        <div className="col-md-3">
                            <nav className="footer-nav">
                                <a href="#!" className="nav-link">Company</a>
                                <a href="#!" className="nav-link">Android App</a>
                                <a href="#!" className="nav-link">ios App</a>
                                <a href="#!" className="nav-link">Blog</a>
                                <a href="#!" className="nav-link">Partners</a>
                                <a href="#!" className="nav-link">Careers</a>
                            </nav>
                        </div>
                        <div className="col-md-3">
                            <nav className="footer-nav">
                                <a href="#!" className="nav-link">FAQ</a>
                                <a href="#!" className="nav-link">Reporting</a>
                                <a href="#!" className="nav-link">Block Storage</a>
                                <a href="#!" className="nav-link">Tools & Integrations</a>
                                <a href="#!" className="nav-link">API</a>
                                <a href="#!" className="nav-link">Pricing</a>
                            </nav>
                        </div>
                        <div className="col-md-3">
                            <Form.Control className='form-control lngSelect' as="select" size="ms" onChange={(e) => { handalLng(e.target.value); }} value={props.data.authData.lng}>
                                <option value="en">English</option>
                                <option value="hi">हिंदी</option>
                            </Form.Control>
                            {/* <div className="dropdown footer-country-dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="footerCountryDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="flag-icon flag-icon-gb flag-icon-squared"></span> United Kingdom <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="footerCountryDropdown">
                                    <button className="dropdown-item " href="#" onClick={() => { handalLng('en'); }}>
                                        <span className="flag-icon flag-icon-us flag-icon-squared"></span> English
                                     </button>
                                    <button className="dropdown-item active" href="#" onClick={() => { handalLng('hi'); }}>
                                        <span className="flag-icon flag-icon-au flag-icon-squared"></span> हिंदी
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="footer-bottom-content">
                        <nav className="nav footer-bottom-nav">
                            <a href="#!">Privacy & Policy</a>
                            <a href="#!">Terms</a>
                            <a href="#!">Site Map</a>
                        </nav>
                        <p className="mb-0">© Edica. 2020 <a href="https://www.bootstrapdash.com" target="_blank" rel="noopener noreferrer" className="text-reset">bootstrapdash</a> . All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);