const ValidateUserUpdate = (user) => {
    const { firstname, lastname, gender } = user;

    if(firstname === '' ||
       lastname === '' || 
       gender === ''
    ) {
        return { msg: 'Fields should not be empty' }
    }
}

module.exports = ValidateUserUpdate