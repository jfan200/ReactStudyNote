const USERNAME = 'userName'
const USERID = 'userId'

function setInfo(userName, userID) {
    sessionStorage.setItem(USERNAME, userName)
    sessionStorage.setItem(USERID, userID)
}

function getUserName() {
    return sessionStorage.getItem(USERNAME)
}

function getUserID() {
    return sessionStorage.getItem(USERID)
}

function removeUserInfo() {
    sessionStorage.removeItem(USERNAME)
    sessionStorage.removeItem(USERID)
}

export {
    setInfo,
    getUserName,
    getUserID,
    removeUserInfo
}