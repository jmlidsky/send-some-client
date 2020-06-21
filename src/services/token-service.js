const TokenService = {
    saveAuthToken(token) {
        window.localStorage.setItem('demo1', 'demo2')
    },
    getAuthToken() {
        return window.localStorage.getItem('demo1')
    },
    clearAuthToken() {
        window.localStorage.removeItem('demo1')
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    }
}

export default TokenService