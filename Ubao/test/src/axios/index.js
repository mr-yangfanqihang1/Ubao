import axios from 'axios';

// 创建一个Axios实例
const apiClient = axios.create({
    baseURL: 'https://localhost:8080/api',
    timeout: 1000,
});

// 添加请求拦截器
// apiClient.interceptors.request.use(
//     config => {
//         // 从localStorage中获取token
//         const token = localStorage.getItem('token');
//         if (token) {
//             // 在请求头中添加token
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// 添加响应拦截器
// apiClient.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         // 处理token过期或无效的情况 todo
//         if (error.response.status === 401) {
//             // 重定向到登录页面或其他处理逻辑
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;