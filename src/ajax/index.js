import axios from 'axios';
import store from "../store/index"
import { message } from 'antd';

const $AXIOS = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? 'https://final-assignment-cbs5.onrender.com/' : '/dev',
    timeout: 40000,
})

$AXIOS.interceptors.request.use((conf) => {
    const state = store.getState(); // 获取当前的 state
    if (state?.user?.token) {
        conf.headers.token = state.user.token
    }
    return conf
})

$AXIOS.interceptors.response.use(response => {
    const requestCode = response.data.code
    if (requestCode === 401) {
        if (response.data?.error?.msg) {
            message.warning(response.data.error.msg)
        }
        else {
            message.warning(response.data.msg)
        }
    }
    if (requestCode === 402) {
        store.dispatch({ type: 'setUser', payload: { user: {} } })
        // message.warning("Need to log in again")
        message.warning(response.data.msg)
    }


    if (requestCode === 200) {
        message.success(response.data.msg)
    }
    return response
}, async err => {
    const res = err.response
    // console.log("卧槽", err)
    if (res.status === 402 || res.status === 401) {
        message.warning("Please log in first")
    } else {
        if (err.response.data.message) {
            message.warning(err.response.data.message)
        }
    }
    console.error(`ajax error`, err)
})




export {
    axios,
    $AXIOS,
}