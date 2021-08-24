import axios from 'axios'
import Cookies from 'js-cookie'
const config = {
    baseURL: '/api',
    timeout: 1000,
}

const instance = axios.create(config);
instance.interceptors.request.use(function(config) {
    // Check if there is a token in the cookies
    if (typeof Cookies.get("access-token") != "undefined") {
        const accessToken = Cookies.get("access-token")
        config["headers"] = { 'Authorization': `Bearer ${accessToken}` }
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

export default instance