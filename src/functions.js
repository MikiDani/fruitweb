export function checkLength(textName, textValue, textMin, textMax) {
    if (typeof textValue == 'undefined') {
        throw ('The ' + textName + ' is empty.');
    }
    if (textValue.length < textMin) {
        throw ('The ' + textName + ' length is too short.');
    }
    if (textValue.length > textMax) {
        throw ('The ' + textName + ' length is too long.');
    }
}

export function emailCheck(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}