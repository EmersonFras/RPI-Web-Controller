import axios from 'axios'

const axiosPrivate = axios.create({
    baseURL: 'https://rpi-display.duckdns.org:3000/api',
    withCredentials: true,
})

axiosPrivate.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                await axios.get('https://rpi-display.duckdns.org:3000/api/auth/refresh', {
                    withCredentials: true
                })
                return axiosPrivate(originalRequest)
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError)
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(err)
    }
)

export default axiosPrivate
