var express = require('express');
var router = express.Router();
var User = require("../models/controllers/user/user");
var Admin = require("../models/controllers/admin/admin");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

///Admin routes
router.post('/admin',Admin.create_training)
router.post('/dtrain',Admin.delete_training)
router.get('/get_trainings',Admin.view_trainings)
router.post('/restore',Admin.restore_trainings)
router.get('/deleted_trainings',Admin.deleted_trainings)

///Use routes
router.post("/",User.login);// for creating the user
router.post("/signin",User.create_user);// for creating the user
router.post('/register',User.register_training) //for registering user to the training
router.get("/get/:id",User.training_details)
router.get("/view_trainings/:id",User.view)
router.put('/unregister',User.unregister)
 


module.exports = router;
