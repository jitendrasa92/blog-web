import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import apiUrl from "../../constants/apiPath"
import Helper from "../../constants/helper";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";


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

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
const SignupModel = (props) => {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");


    const { register, handleSubmit, watch, errors } = useForm();

    const onSumbit = async e => {
        let jsonData = {
            name: name, email: email, password: password
        }
        let path = apiUrl.register;
        const fr = await Helper.post(jsonData, path);
        const res = await fr.response.json();
        console.log(res);
        if (fr.status === 200) {
            if (res.status) {
                setName("");
                setEmail("");
                setPassword("");
                setconfirmPassword("");
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
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
        }
        //props.history.push('/articlelisting');
    }
    return (
        <>
            <Modal
                {...props}
                show={props.data.modelData.signUpModelShow}
                onHide={() => props.signUpShow(false)}
                size="sx"
                className="mentor_modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleSubmit(onSumbit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('SignUp')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="Login">

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
                            <Form.Group size="lg" controlId="email" data-aos="fade-up" data-aos-delay="200">
                                <Form.Label>{t('Email')}</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    ref={register({ required: true })}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="input_error">{errors.email && t('Email is required') + '.'}</span>
                            </Form.Group>
                            <Form.Group size="lg" controlId="password" data-aos="fade-up" data-aos-delay="200">
                                <Form.Label>{t('Password')}</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    ref={register({ required: true })}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="input_error">{errors.password && t('Password is required') + '.'}</span>
                            </Form.Group>
                            <Form.Group size="lg" controlId="confirmpassword" data-aos="fade-up" data-aos-delay="200">
                                <Form.Label>{t('Confirm Password')}</Form.Label>
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    ref={register({ required: true })}
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                />
                                <span className="input_error">{errors.confirmPassword && t('Confirm password is required') + '.'}</span>
                            </Form.Group>
                            <div class="row">
                                <div class="form-group col-12 privacy_policy_div" data-aos="fade-up" data-aos-delay="200">
                                    <input type="checkbox" class="form-control privacy_policy" ref={register({ required: true })} id="i_accept" name="i_accept" placeholder="Subject" />
                                    <label className="privacy_policy_text" for="message">{t('I accept the Terms of Use & Privacy Policy')}</label><br />

                                </div>
                                <span className="input_error">{errors.i_accept && t('I accept the Terms of Use & Privacy Policy') + '.'}</span>

                            </div>


                        </div>
                    </Modal.Body>
                    <Modal.Footer >
                        <Button className="btn btn-warning btn-block" size="lg" type="submit" >{t('Login')}</Button>
                        {t('Back to')} <a href="#" onClick={() => { props.loginShow(true); }}  > {t('Login')} </a> ?
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupModel);
