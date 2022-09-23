const router=require("express").Router();
const {userRoute,reflectionRoute}=require("./partials")
const controllrer=require("../app/controller")

router.use(userRoute)
router.use(reflectionRoute)

router.use(controllrer.api.main.onLost)
router.use(controllrer.api.main.onError)


module.exports=router;