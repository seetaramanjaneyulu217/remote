const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const bycrypt = require("bcryptjs");
const path = require("path");
const PORT = 4000;


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connect = require('./database/connect.js');
const users = require('./models/UserModel.js');
const validateuserSigningUp = require('./validation/validation.js')
const ValidateUserUpdate = require('./validation/UserUpdateValidation.js')

connect();

app.post('/signup', async (req, res) => {

    
    //validating the details given by the user
    const msg = validateuserSigningUp(req.body);
    if (msg !== undefined) {
        return res.json(msg);
    }

    
    //destructuring the object that came through the request
    const { firstname, lastname, gender, privacy, email, password } = req.body;

    //checking if any user exists already with the given email
    const user = await users.findOne({ email: email });

    if(user) {
        return res.json({ msg: 'User present with this email already' });
    }
    
    
    //if user is not present with the given email we will create new user with the given details
    try {
        const encryptedPassword = await bycrypt.hash(password, 10);
        const user = {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            privacy: privacy,
            email: email,
            password: encryptedPassword,
        };

        await new users(user).save();
        res.json({ msg: "Profile Created" });
    } catch (error) {
        res.json({ msg: "Error creating profile" });
    }
})



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //validating the user details
    if(email === '' || password === '') {
        return res.json({ msg: 'Fill the details' })
    }

    //checking whether the user is present or not
    try {
        const user = await users.findOne({ email: email });

        if(user) {
        const userPresent = await bycrypt.compare(password, user.password);

        if(userPresent) {
            return res.json({ msg: 'Login successful' })
        }

           res.json({ msg: 'No user present with these credentials' });
        }
    } catch (error) {
        res.json({ msg: 'Error logging in' })
    }

})


app.post('/getuser', async(req, res) => {
    const { email } = req.body;

    try {
        const user = await users.findOne({ email: email });

        res.json({ user: user })
    } catch (error) {
        res.json({ user: 'Error' })
    }
})


app.post('/getallusers', async (req, res) => {
    const { email } = req.body;

    try {
        const allusers = await users.find({ email: { $ne: email } });
        res.json({ users: allusers })
    } catch (error) {
        res.json({ users: 'Error getting users' })
    }
})


app.post('/updateuserprofile', async (req, res) => {

    const { firstname, lastname, gender, privacy, email } = req.body;

    // we will be checking the validation of the inputs given 
    // by the user using the function "ValidateUserUpdate()" present in
    // the folder "validation" and the file "UserUpdateValidation.js"
    const errorMessage = ValidateUserUpdate(req.body);

    // if we get any error msg we will return from this api call and tell the user 
    // the obtained error
    if(errorMessage) {
        return res.json({ msg: 'Details should not be empty' });
    }

    
    // else if there is no error we will be finding the user in the database using the
    // unique field i.e. user's email and update the user details given by the user.
    try {
        await users.findOneAndUpdate(
            { email: email },
            { $set: { firstname: firstname, lastname: lastname, gender: gender, privacy: privacy }}
        )

        // after updating we will be sending a success message to the user.
        res.json({ msg: 'Profile Updated SuccessFully' })
    } catch (error) {
        // while updating if there is any error we will be telling what that error is.
        res.json({ msg: 'Error updating profile' })
    }
    
})



app.post('/getuserprivacystatus', async (req, res) => {
    
    // for example user-A wants to view the profile of user-B.
    // the email below is the user-B's email users-A wants to visit.
    const { email } = req.body

    
    // using the above email we will be finding the user-B's privacy status in the 
    // database and we will return it to the frontend.
    // based on the privacy we will be taking action in the frontend.
    try {
        const user = await users.findOne({ email: email });
        res.json({ privacy: user.privacy })
    } catch (error) {
        res.json({ privacy: 'Error' })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:4000`);
})