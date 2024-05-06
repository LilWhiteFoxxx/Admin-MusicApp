import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
});

// request.interceptors.request.use(function (config) {
//     const userLocalstorage = JSON.parse(
//         localStorage.getItem("persist:shop/user")
//     );
//     const token = JSON.parse(userLocalstorage.token);
//     config.headers.token = token ? `Bearer ${token}` : "";
//     return config;
// });

export default request;
