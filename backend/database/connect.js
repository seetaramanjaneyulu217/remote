const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect('mongodb+srv://SeetaRam217:mernstack@mern-project.cjeobsp.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connection is SuccessFul'))
    .catch(err => console.log(err))
}

module.exports = connect