export default class PROD_URLS {
    static BASE_URL = "https://whatsapp-api-gateway.herokuapp.com"
    static SESSIONS_SERVICE = `${PROD_URLS.BASE_URL}/sessions-service`;
    static GATEWAY_SERVICE = `${PROD_URLS.BASE_URL}/gateway-service`;
    static PROFILE_SERVICE = `${PROD_URLS.BASE_URL}/profile-service`;
    static LOGIN_URL = `${PROD_URLS.PROFILE_SERVICE}/auth/login`;
    static GET_PROFILE_URL = `${PROD_URLS.PROFILE_SERVICE}/profile/get`;
    static CREATE_TOKEN_URL = `${PROD_URLS.PROFILE_SERVICE}/token/create`;
    static VALIDATE_TOKEN_URL = `${PROD_URLS.PROFILE_SERVICE}/token/validate`;
    static SOCKET_CONNECT_URL = `${PROD_URLS.GATEWAY_SERVICE}/websocket`;
    static GET_CONNECTIONS_URL = `${PROD_URLS.PROFILE_SERVICE}/profile/get/connections`;
}

class DEV_URLS {
    static BASE_URL = "http://localhost:9204";
    static SESSIONS_SERVICE = `${DEV_URLS.BASE_URL}/sessions-service`;
    static GATEWAY_SERVICE = `${DEV_URLS.BASE_URL}/gateway-service`;
    static PROFILE_SERVICE = `${DEV_URLS.BASE_URL}/profile-service`;
    static LOGIN_URL = `${DEV_URLS.PROFILE_SERVICE}/auth/login`;
    static GET_PROFILE_URL = `${DEV_URLS.PROFILE_SERVICE}/profile/get`;
    static CREATE_TOKEN_URL = `${DEV_URLS.PROFILE_SERVICE}/token/create`;
    static VALIDATE_TOKEN_URL = `${DEV_URLS.PROFILE_SERVICE}/token/validate`;
    static SOCKET_CONNECT_URL = `${DEV_URLS.GATEWAY_SERVICE}/websocket`;
    static GET_CONNECTIONS_URL = `${DEV_URLS.PROFILE_SERVICE}/profile/get/connections`;
}

