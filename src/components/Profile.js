import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import apiUrl from "../constants/apiPath"
import Helper from "../constants/helper";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

import { connect } from 'react-redux';
import { saveAuthData } from '../Services/actions/authAction';
import { loginShow, signUpShow, forgotShow } from '../Services/actions/modelAction';


const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    // saveAuthData: data => dispatch(saveAuthData(data))
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
const Profile = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countrycode, setCountryCode] = useState("");
    const [mobile, setMobile] = useState("");
    const [userprofile, setUserprofile] = useState('');
    const [token, setToken] = useState(false);
    const [userData, setUserData] = useState('');
    const [profileImgShow, setProfileImgShow] = useState('');

    const { register, handleSubmit, watch, errors } = useForm();
    if (!props.data.authData.setIsLogin) {
        props.history.push('/');
    }
    useEffect(() => {
        if (props.data.authData.setIsLogin) {
            setToken(props.data.authData.setIsLogin ? JSON.parse(localStorage.getItem('userData'))[1].accessToken : 0);
            setUserData(JSON.parse(localStorage.getItem('userData'))[0]);
            setName(JSON.parse(localStorage.getItem('userData'))[0].name);
            setEmail(JSON.parse(localStorage.getItem('userData'))[0].email);
            setCountryCode(JSON.parse(localStorage.getItem('userData'))[0].country_code);
            setMobile(JSON.parse(localStorage.getItem('userData'))[0].mobile);
            // setUserprofile(JSON.parse(localStorage.getItem('userData'))[0].image);
            setProfileImgShow(JSON.parse(localStorage.getItem('userData'))[0].image);
        } else {
            props.history.push('/');
        }
    }, [])

    const onSumbit = async e => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('img', userprofile);
        formData.append('country_code', countrycode);
        formData.append('mobile', mobile);
        let path = apiUrl.profileUpdate;
        const fr = await Helper.formPost(formData, path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                Toast.fire({
                    type: "success",
                    title: res.message,
                })
                props.history.push('/');
            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
        }
    }
    const handleSelectedFile = e => {
        setUserprofile(e.target.files[0]);
    }

    return (
        <React.Fragment>
            <div classNam="edica-loader"></div>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 mx-auto">

                            <section className="edica-contact py-5 mb-5">
                                <div className="row">
                                    <div className="col-md-12 contact-form-wrapper">
                                        <div class="row">
                                            <div class="form-group col-md-12 profile_img_align" data-aos="fade-up" >
                                                <img src={process.env.REACT_APP_API_BASE_URL + profileImgShow} width="50" className="profile_page rounded-circle mr-2" />
                                            </div>
                                        </div>
                                        <Form onSubmit={handleSubmit(onSumbit)}>


                                            <div class="row">
                                                <div class="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="name" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="name"
                                                            type="text"
                                                            ref={register({ required: true })}
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.name && 'Email is required.'}</span>
                                                    </Form.Group>

                                                </div>
                                                <div class="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="email" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="email"
                                                            type="email"
                                                            ref={register({ required: true })}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            disabled
                                                        />
                                                        <span className="input_error">{errors.email && 'Email is required.'}</span>
                                                    </Form.Group>

                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="countrycode" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>Country Code</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="countrycode"
                                                            type="number"
                                                            ref={register({ required: true })}
                                                            value={countrycode}
                                                            onChange={(e) => setCountryCode(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.countrycode && 'Country Code is required.'}</span>
                                                    </Form.Group>

                                                </div>
                                                <div class="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="mobile" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>Mobile Number</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="mobile"
                                                            type="text"
                                                            ref={register({ required: true })}
                                                            value={mobile}
                                                            onChange={(e) => setMobile(e.target.value)}

                                                        />
                                                        <span className="input_error">{errors.mobile && 'Mobile is required.'}</span>
                                                    </Form.Group>

                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="userprofile" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>User Profile</Form.Label>
                                                        <Form.Control
                                                            onChange={handleSelectedFile}
                                                            name="img"
                                                            type="file"
                                                            id="img"
                                                            accept="image/*"
                                                        //value={userprofile}
                                                        // validators={['isFile', 'maxFileSize:' + 1 * 1024 * 1024,]}
                                                        // errorMessages={['File is not valid', 'Size must not exceed 1MB']}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <Button className="btn btn-warning btn-block" size="lg" type="submit" >Update</Button>
                                        </Form>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);