const BASICAUTH = 'basicAuth'

function setBasicAuth(basicAuth) {
    sessionStorage.setItem(BASICAUTH, basicAuth)
}

function getBasicAuth() {
    return sessionStorage.getItem(BASICAUTH)
}

function removeBasicAuth() {
    sessionStorage.removeItem(BASICAUTH)
}

export {
    setBasicAuth,
    getBasicAuth,
    removeBasicAuth
}