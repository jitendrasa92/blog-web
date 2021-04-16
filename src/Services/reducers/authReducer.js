import constant from '../constants';
let initialState = {
    setIsLogin: false,
    lng: 'en'
}
if (JSON.parse(localStorage.getItem('isLogin'))) {
    initialState = {
        setIsLogin: true

    }
}
if (JSON.parse(localStorage.getItem('lng'))) {
    initialState = {
        lng: JSON.parse(localStorage.getItem('lng'))

    }
}


export default function authData(state = initialState, action) {
    console.log("Auth Data Reducer", action);
    switch (action.type) {
        case constant.SaveAuthData:
            return {
                ...state,
                ...action.data

            }
        default:
            return state
    }
}
