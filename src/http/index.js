import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.142.128:32768'
//http://101.43.213.15:8099
//请求拦截
axios.interceptors.request.use(config=>config);
//响应拦截
axios.interceptors.response.use(
    //请求成功
    res=>res,
    //请求失败
    err=>Promise.reject(err)
);
export default axios