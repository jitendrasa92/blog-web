import constant from '../constants';
const initialState = {
    loginModelShow: false,
    signUpModelShow: false,
    forgotModelShow: false
}
export default function modelData(state = initialState, action) {
    console.log("Model Data Reducer", action.data);
    console.log("Type", constant.LoginShow);
    switch (action.type) {
        case constant.LoginShow:
            return {
                ...state,
                ...action.data

            }
            break;
        case constant.SignUpShow:
            return {
                ...state,
                ...action.data

            }
            break;
        case constant.ForgotShow:
            return {
                ...state,
                ...action.data

            }
            break;
        default:
            return state
    }
}
