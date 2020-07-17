const mongoose = require('mongoose');

// create the user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

//create, instantiate and export model with schema
const Users = mongoose.model("User", UserSchema);
module.exports = Users;