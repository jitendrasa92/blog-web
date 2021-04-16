import React, { useState } from "react";
import { Modal, Button, Row, Col, } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { connect } from 'react-redux';
import { saveAuthData } from '../../Services/actions/authAction';
import { loginShow, signUpShow, forgotShow } from '../../Services/actions/modelAction';

import { useTranslation } from 'react-i18next';


const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    saveAuthData: data => dispatch(saveAuthData(data)),
    loginShow: data => dispatch(loginShow(data)),
    signUpShow: data => dispatch(signUpShow(data)),
    forgotShow: data => dispatch(forgotShow(data))
});

const ForgotModel = (props) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <>
            <Modal
                {...props}
                show={props.data.modelData.forgotModelShow}
                onHide={() => props.forgotShow(false)}
                size="sx"
                className="mentor_modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('Forgot Password')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Login">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email" data-aos="fade-up" data-aos-delay="200">
                                <Form.Label>{t('User SignUp')}</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password" data-aos="fade-up" data-aos-delay="200">
                                <Form.Label>{t('Password')}</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <div class="row">
                                <div class="form-group col-12 privacy_policy_div" data-aos="fade-up" data-aos-delay="200">
                                    <input type="checkbox" class="form-control privacy_policy" id="subject" name="subject" placeholder="Subject" />
                                    <label className="privacy_policy_text" for="message">{t('I accept the Terms of Use & Privacy Policy')} </label>
                                </div>
                            </div>

                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <Button className="btn btn-warning btn-block" size="lg" type="submit" disabled={!validateForm()}>{t('Login')}</Button>
                    {t('Back to')} <a href="#" onClick={() => { props.loginShow(true) }}  >{t('Login')}</a> ?
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotModel);
