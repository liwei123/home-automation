// Accessing the Service that we just created

var userService = require('../services/user.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var users = await userService.getUsers({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: users, message: "Succesfully Users Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createUser = async function(req, res, next){

    // Req.Body contains the form submit values.

    var user = {
        username: req.body.username,
        password: req.body.password
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdUser = await userService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "User Creation was Unsuccessful"})
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
        id,
        username: req.body.username ? req.body.username : null,
        password: req.body.password ? req.body.password : null
    }

    try{
        var updatedUser = await userService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await userService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully user Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}