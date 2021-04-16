import constant from '../constants';

export const loginShow = (data) => {
    console.log("Login Model Action ", data);
    let dataD = {}
    if (data) {
        dataD = {
            loginModelShow: true,
            signUpModelShow: false,
            forgotModelShow: false
        }
    } else {
        dataD = {
            loginModelShow: false,
            signUpModelShow: false,
            forgotModelShow: false
        }
    }
    return {
        type: constant.LoginShow,
        data: dataD
    }
}

export const signUpShow = (data) => {
    console.log("SignUp Model Action ", data);
    let dataD = {}
    if (data) {
        dataD = {
            loginModelShow: false,
            signUpModelShow: true,
            forgotModelShow: false
        }
    } else {
        dataD = {
            loginModelShow: false,
            signUpModelShow: false,
            forgotModelShow: false
        }
    }
    return {
        type: constant.SignUpShow,
        data: dataD
    }
}

export const forgotShow = (data) => {
    console.log("Forgot Model Action ", data);
    let dataD = {}
    if (data) {
        dataD = {
            loginModelShow: false,
            signUpModelShow: false,
            forgotModelShow: true
        }
    } else {
        dataD = {
            loginModelShow: false,
            signUpModelShow: false,
            forgotModelShow: false
        }
    }
    return {
        type: constant.ForgotShow,
        data: dataD
    }
}