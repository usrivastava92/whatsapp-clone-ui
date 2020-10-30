import {LoginResponse, Message} from "../interfaces/interfaces";
import URLS from '../constants/Urls';

const handleAuth = (loginResponse: LoginResponse, history: any) => {
    console.log("HandleAuth : loginResponse.token -> " + loginResponse.token + " loginResponse.user -> " + JSON.stringify(loginResponse.userProfile));
    if (loginResponse.token && loginResponse.userProfile) {
        localStorage.token = loginResponse.token;
        localStorage.loggedInUser = JSON.stringify(loginResponse.userProfile);
        history.push("/chat");
        window.location.reload();
    }
};

export {handleAuth};
