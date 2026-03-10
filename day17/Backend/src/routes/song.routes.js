const express=require("express")
const songController=require("../controllers/song.controller")
const upload = require("../middlewares/upload.middleware")

const songRouter=express.Router()


/**
 * POST /api/songs
 */

songRouter.post("/",upload.single("song"),songController.postSongs)

/**
 * GET /api/songs
 */

songRouter.get("/",songController.getSongs)




module.exports=songRouter