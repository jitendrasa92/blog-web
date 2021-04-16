import constant from '../constants';

export const saveAuthData = (data) => {
    console.log("Auth Action => ", data);
    if (data.setIsLogin) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem('userData', JSON.stringify(data.userData));
    } else {
        localStorage.removeItem("isLogin");
        localStorage.removeItem('userData');
    }
    if (data.lng) {
        localStorage.setItem("lng", JSON.stringify(data.lng));
    }
    return {
        type: constant.SaveAuthData,
        data: data
    }
}

