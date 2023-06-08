const validateuserSigningUp = ( user ) => {
    const { firstname, lastname, gender, email, password, confirmpassword } = user;

    if(firstname === '' ||
       lastname === '' || 
       gender === '' ||
       email === '' || 
       password === '' ||
       confirmpassword === '') {
        return { msg: 'Fill all the details' }
    }

    else if(!email.includes('@')) {
        return {msg: 'Email should contain "@"'}
    }

    else if(password.length < 8) {
        return {msg: 'password should be of length >= 8'}
    }

    else if(password !== confirmpassword) {
        return {msg: 'password and confirmpassword are not matching'}
    }
    
}

module.exports = validateuserSigningUp
