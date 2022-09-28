const reflectionRoute = require("express").Router();
const controller = require("../../app/controller")


reflectionRoute.get("/", controller.api.v1.reflectionController.findAllReflectionsUser)

reflectionRoute.post("/", controller.api.v1.reflectionController.createReflection)

reflectionRoute.put("/:id", controller.api.v1.reflectionController.update);

reflectionRoute.delete("/:id", controller.api.v1.reflectionController.del);

module.exports = reflectionRoute;

