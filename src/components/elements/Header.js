import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoginModel from './LoginModel';
import SignupModel from './SignupModel';
import ForgotModel from './ForgotModel';

import { useTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { saveAuthData } from '../../Services/actions/authAction';
import { loginShow, signUpShow, forgotShow } from '../../Services/actions/modelAction';


const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    saveAuthData: data => dispatch(saveAuthData(data)),
    loginShow: data => dispatch(loginShow(data)),
    signUpShow: data => dispatch(signUpShow(data)),
    forgotShow: data => dispatch(forgotShow(data))
});


const Header = (props) => {
    const { t, i18n } = useTranslation();
    //const [token] = useState(JSON.parse(localStorage.getItem('userData'))[1].accessToken);
    // useEffect(() => {
    //     setIsLogin(props.data.authData.setIsLogin);
    // }, [])
    // const logout = () => {
    //     localStorage.removeItem("isLogin");
    //     localStorage.removeItem('userData');
    //     let authDataSet = {
    //         setIsLogin: false
    //     }
    //     props.saveAuthData(authDataSet);
    // };

    return (
        <React.Fragment>
            <div className="header">
                <header className="edica-header">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" activeClassName="activemenu" to="/"><img src="/assets/images/logo.svg" alt="Edica" /></Link>
                            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#edicaMainNav" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="edicaMainNav">
                                <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" activeClassName="activemenu" to="/">{t('Home')}<span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" activeClassName="activemenu" to="/about-us">{t('About Us')}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" activeClassName="activemenu" to="/contact-us">{t('Contact Us')}</Link>
                                    </li>

                                </ul>
                                <ul className="navbar-nav mt-2 mt-lg-0 mx-auto">
                                    {props.data.authData.setIsLogin && props.data.authData.setIsLogin == true ?
                                        <li className="nav-item dropdown "> <a class="nav-link dropdown-toggle" href="javascript:void(0);" id="blogDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={process.env.REACT_APP_API_BASE_URL + JSON.parse(localStorage.getItem('userData'))[0].image} width="50" className="profile_header rounded-circle mr-2" /> {JSON.parse(localStorage.getItem('userData'))[0].name} </a>
                                            <div class="dropdown-menu" aria-labelledby="blogDropdown">
                                                <Link className="dropdown-item" to="/profile">Profile</Link>
                                                <a class="dropdown-item" href="javascript:void(0);" onClick={() => {
                                                    props.saveAuthData({ setIsLogin: false });
                                                }}>Logout</a>
                                            </div>
                                        </li>
                                        : <a class="nav-link" href="javascript:void(0);" onClick={() => {
                                            props.loginShow(true);
                                        }}>{t('Login')}</a>

                                    }

                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>


                <div className="modal fade comment-section" id="loginmodel" tabindex="-1" role="dialog" aria-labelledby="signupmodelLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">User Login</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="col-lg-12 mx-auto">
                                    <div class="row">
                                        <div class="col-md-12 contact-form-wrapper">
                                            <div class="row">
                                                <div class="form-group col-md-12" data-aos="fade-up" data-aos-delay="100">
                                                    <label for="email">EMAIL</label>
                                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email address" />
                                                </div>
                                                <div class="form-group col-md-12" data-aos="fade-up" data-aos-delay="100">
                                                    <label for="subject">Password</label>
                                                    <input type="text" class="form-control" id="password" name="subject" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-12 privacy_policy_div" data-aos="fade-up" data-aos-delay="200">
                                                    <input type="checkbox" class="form-control privacy_policy" id="subject" name="subject" placeholder="Subject" />
                                                    <label className="privacy_policy_text" for="message"> I accept the Terms of Use & Privacy Policy</label>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-warning btn-block" data-aos="fade-up" data-aos-delay="300">Login</button>
                                Looking to <a href="#"  >create an account</a> ?
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade comment-section" id="signupmodel" tabindex="-1" role="dialog" aria-labelledby="signupmodelLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">User SignUp</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="col-lg-12 mx-auto">
                                    <div class="row">
                                        <div class="col-md-12 contact-form-wrapper">
                                            <div class="row">
                                                <div class="form-group col-md-12" data-aos="fade-up">
                                                    <label for="name">NAME</label>
                                                    <input type="text" class="form-control" id="name" name="name" placeholder="Your full name" />
                                                </div>
                                                <div class="form-group col-md-12" data-aos="fade-up">
                                                    <label for="phone">PHONE</label>
                                                    <input type="text" class="form-control" id="phone" name="phone" placeholder="Phone" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-12" data-aos="fade-up" data-aos-delay="100">
                                                    <label for="email">EMAIL</label>
                                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email address" />
                                                </div>
                                                <div class="form-group col-md-12" data-aos="fade-up" data-aos-delay="100">
                                                    <label for="subject">Password</label>
                                                    <input type="text" class="form-control" id="password" name="subject" placeholder="Password" />
                                                </div>
                                                <div class="form-group col-md-12" data-aos="fade-up" data-aos-delay="100">
                                                    <label for="subject">Confirm Password</label>
                                                    <input type="text" class="form-control" id="Confirm password" name="subject" placeholder="Confirm Password" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-12 privacy_policy_div" data-aos="fade-up" data-aos-delay="200">
                                                    <input type="checkbox" class="form-control privacy_policy" id="subject" name="subject" placeholder="Subject" />
                                                    <label className="privacy_policy_text" for="message"> I accept the Terms of Use & Privacy Policy</label>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-warning btn-block" data-aos="fade-up" data-aos-delay="300">Register Now</button>
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            { props.data.modelData.loginModelShow && (<LoginModel />)}
            { props.data.modelData.signUpModelShow && (<SignupModel />)}
            { props.data.modelData.forgotModelShow && (<ForgotModel />)}


        </React.Fragment >
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);