var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var userController = require('../../controllers/users.controller');


// Map each API to the Controller FUnctions

router.get('/', userController.getUsers)

router.post('/', userController.createUser)

router.put('/', userController.updateUser)

router.delete('/:id',userController.removeUser)


// Export the Router

module.exports = router;