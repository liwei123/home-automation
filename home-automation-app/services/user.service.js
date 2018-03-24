// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/user.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var users = await User.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return users;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating users')
    }
}

exports.createUser = async function(user){
    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({
        username: user.username,
        userPassword: user.userPassword,
        createdDate: new Date()

    })
	
    try{

        // Saving the user 
        var savedUser = await newUser.save()

        return savedUser;
    }catch(e){
  
        // return a Error message describing the reason             
    }
}

exports.updateUser = async function(user){
    var id = user.id

    try{
        //Find the old User Object by the Id
    
        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the user")
    }

    // If no old user Object exists return false
    if(!oldUser){
        return false;
    }

    console.log(oldUser)

    //Edit the user Object
    oldUser.username = user.username
    oldUser.userPassword = user.userPassword


    console.log(oldUser)

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occurred while updating the user");
    }
}

exports.deleteUser = async function(id){
    
    // Delete the user
    try{
        var deleted = await User.remove({_id: id})
        // if(deleted.result.n === 0){
        //     throw Error("User Could not be deleted")
        // }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the user")
    }
}