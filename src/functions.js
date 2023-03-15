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

export async function loadUserDetails(token) {
    console.log('user details:')
        // DELETE USER

    const response = await fetch(process.env.REACT_APP_URL + '/users/' + token, {
        method: 'GET'
    })

    const resData = await response.json()

    return resData;

    /*
    Object.keys(resData).forEach(key => {
      if (key === 'deletedCount') {
        if (resData.deletedCount === 0) {
          setMsg({ msg: 'Nothing delete.', style: 'text-orange-500' });
        } else {
          setReload(true);
        }
      }
    })
    */
}