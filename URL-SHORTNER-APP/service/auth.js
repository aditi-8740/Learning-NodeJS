const sessionIdToUserMap = new Map();   // It is a diary basically.... Here, sessionIdToUserMap is a Map instance with key-value pairs... 
        //Server ke restart hone pr ye Map khaali ho jata ha....
function setUser(id, user){
    sessionIdToUserMap.set(id, user);
}                //SessionID , full User Object jiski ID ha ye..

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
} 