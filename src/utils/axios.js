import axios from "axios";

/**
 * Create an axios instance
 * @function
 * @params {object} baseURL: value
 */
const axiosInstance = axios.create({
    baseURL: "http://c4f2.acsight.com:7770/api/system/",
    //   config,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (!token) {
        return config;
    }
    const newConfig =
    {
        ...config,
        headers: { Authorization: `Bearer ${token}` }
    }
    return newConfig;
})

export default axiosInstance;