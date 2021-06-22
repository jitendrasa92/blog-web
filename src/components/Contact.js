import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import apiUrl from "../constants/apiPath"
import Helper from "../constants/helper";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

import { connect } from 'react-redux';
import { saveAuthData } from '../Services/actions/authAction';
import Loader from './elements/Loader';

import { useTranslation } from 'react-i18next';

const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    saveAuthData: data => dispatch(saveAuthData(data))
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
const Contact = (props) => {
    console.log("PROP Contact1", props);
    console.log("PROP Contact2", props.data.authData.loader);
    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const { register, handleSubmit, watch, errors } = useForm();

    const onSumbit = async e => {
        props.saveAuthData({ loader: true });
        let jsonData = {
            name: name, email: email, phone: phone, subject: subject, message: message
        }
        let path = apiUrl.contactMail;
        const fr = await Helper.post(jsonData, path);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                Toast.fire({
                    type: "success",
                    title: res.message,
                })

            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
            props.saveAuthData({ loader: false });
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
            props.saveAuthData({ loader: false });
        }
        //props.history.push('/articlelisting');
    }
    return (
        <React.Fragment>
            {/* <div classNam="edica-loader"></div> */}
            {props.data.authData.loader && <Loader></Loader>}
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 mx-auto">
                            <h1 className="edica-page-title" data-aos="fade-up">Contact</h1>
                            <section className="edica-contact py-5 mb-5">
                                <div className="row">

                                    <div className="col-md-8 contact-form-wrapper">
                                        <Form onSubmit={handleSubmit(onSumbit)} >
                                            <h5 data-aos="fade-up">Contact form</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="name" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>{t('Name')}</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="name"
                                                            type="text"
                                                            value={name}
                                                            ref={register({ required: true })}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.name && t('Name is required') + '.'} </span>
                                                    </Form.Group>
                                                </div>
                                                <div className="form-group col-md-6" data-aos="fade-up">
                                                    <Form.Group size="lg" controlId="phone" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>{t('Phone')}</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="phone"
                                                            type="text"
                                                            value={phone}
                                                            ref={register({ required: true })}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.phone && t('Phone is required') + '.'} </span>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6" data-aos="fade-up" data-aos-delay="100">
                                                    <Form.Group size="lg" controlId="email" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>{t('Email')}</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="email"
                                                            type="text"
                                                            value={email}
                                                            ref={register({ required: true })}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.email && t('Email is required') + '.'} </span>
                                                    </Form.Group>
                                                </div>
                                                <div className="form-group col-md-6" data-aos="fade-up" data-aos-delay="100">
                                                    <Form.Group size="lg" controlId="subject" data-aos="fade-up" data-aos-delay="200">
                                                        <Form.Label>{t('Subject')}</Form.Label>
                                                        <Form.Control
                                                            autoFocus
                                                            name="subject"
                                                            type="text"
                                                            value={subject}
                                                            ref={register({ required: true })}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                        />
                                                        <span className="input_error">{errors.subject && t('Subject is required') + '.'} </span>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-12" data-aos="fade-up" data-aos-delay="200">
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>{t('Message')}</Form.Label>
                                                        <Form.Control as="textarea" name="message" placeholder="Message" ref={register({ required: true })} value={message} onChange={(e) => setMessage(e.target.value)} rows={10} />
                                                        <span className="input_error">{errors.message && 'Message is required.'}</span>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <Button className="btn btn-warning btn-lg" type="submit" data-aos="fade-up" data-aos-delay="300">Send Message</Button>
                                        </Form>
                                    </div>

                                    <div className="col-md-4 contact-sidebar" data-aos="fade-left">
                                        <h5>Contact us</h5>
                                        <p>Need assistance? Our customer service is here to assist you Monday through Friday from 9 am EST to 10 pm EST.</p>
                                        <p>56 Livingston Street,<br /> Brooklyn, NY 11201</p>
                                        <div className="embed-responsive embed-responsive-1by1 contact-map">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12090.496282731767!2d-73.98517381282224!3d40.74829681924569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259041366262b%3A0xfdac298467953648!2sMurray%20Hill%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1588137209658!5m2!1sen!2sin" width="600" height="450" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);