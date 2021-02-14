import Repository from './Repository'
import axios from 'axios'

export  const AUTH_TOKEN_KEY = 'cocusToken'

export function login (username, password) {
    return new Promise((resolve, reject) => {
        Repository.post('/api/auth/login', {
            username,
            password,
        })
            .then(res => {
                setAuthToken(res.data.access_token)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function refreshToken () {
    Repository._refreshToken = true
    return new Promise((resolve, reject) => {
        Repository.post('/api/auth/refresh')
            .then(res => {
                const token = res.headers.authorization.replace('Bearer ', '')
                setAuthToken(token)
                resolve(token)
            })
            .catch((err) => {
                clearAuthToken()
                reject(err)
            })
    })
}

export function getUser () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const userRes = await Repository.post('/api/auth/me')
            const user = userRes.data
            resolve(user)
        } catch (err) {
            reject(err)
        }
    })
}

export function logoutUser () {
    return new Promise((resolve, reject) => {
        Repository.post('/api/auth/logout')
            .then(res => {
               setAuthToken(null)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
}


export function setAuthToken (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken () {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token === 'undefined' || token === 'null') {
        return null
    }
    return token
}

export function clearAuthToken () {
    Repository.defaults.headers.common.Authorization = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn () {
    const authToken = getAuthToken()

    if (!authToken) { return false }
    // setAuthToken(authToken);
    return !!authToken
}

