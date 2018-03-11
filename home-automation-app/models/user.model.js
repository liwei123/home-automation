var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    username: String,
    userPassword: String,
    createdDate: Date
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('user', UserSchema)

module.exports = User;