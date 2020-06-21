const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem('demo1', 'demo2')
    },
    getAuthToken() {
        return window.sessionStorage.getItem('demo1')
    },
    clearAuthToken() {
        window.sessionStorage.removeItem('demo1')
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    }
}

export default TokenService