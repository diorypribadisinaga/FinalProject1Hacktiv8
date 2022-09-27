const userRoute = require("express").Router();
const controller = require("../../app/controller")
const { authentication } = require("../../app/middleware")

userRoute.get("/all", authentication,controller.api.v1.userController.GetUsers)
userRoute.post("/register", controller.api.v1.userController.registerUser)
userRoute.post("/login", controller.api.v1.userController.loginUser)



module.exports = userRoute