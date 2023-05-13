import axios from "axios";

axios.defaults.withCredentials = false // 不主动携带cookie 

// ins是一个新的axios的实例
const ins = axios.create({
    baseURL: 'http://localhost:3001/api'
})

// 请求拦截器 
ins.interceptors.request.use((config) => {
    if (config && config.headers) {
        config.headers['token'] = localStorage.getItem('token')
    }
    return config
}, (err) => {
    console.log('请求拦截器没有生效')
})

// 响应拦截器 
ins.interceptors.response.use((res) => {
    return res
}, (err) => {
    console.log('响应出错')
})


export default ins

