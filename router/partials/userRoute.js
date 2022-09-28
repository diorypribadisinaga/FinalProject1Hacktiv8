const userRoute = require("express").Router();
const UserController = require("./../../app/controller");
const { authentication } = require("../../app/middleware");

userRoute.post("/register", UserController.api.v1.userController.register);
userRoute.post("/login", UserController.api.v1.userController.login);



module.exports = userRoute