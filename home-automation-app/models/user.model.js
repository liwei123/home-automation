var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var userSchema = new mongoose.Schema({
    username: String,
    passord: String,
    createdDate: Date
})

userSchema.plugin(mongoosePaginate)
const user = mongoose.model('user', userSchema)

module.exports = user;