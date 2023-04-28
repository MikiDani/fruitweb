export function checkLength(textName, textValue, textMin, textMax) {
    if (typeof textValue == 'undefined') {
        throw new Error('The ' + textName + ' is empty.');
    }
    if (textValue.length < textMin) {
        throw new Error('The ' + textName + ' length is too short.');
    }
    if (textValue.length > textMax) {
        throw new Error('The ' + textName + ' length is too long.');
    }
}

export function emailCheck(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// LOAD USER DETAILS
export async function loadUserDetails(token) {

    const response = await fetch(process.env.REACT_APP_URL + '/users/token/' + token, {
        method: 'GET'
    })

    const resData = await response.json()

    const userData = {
        username: resData.username,
        email: resData.email,
        rank: resData.rank,
    }

    return userData;
}