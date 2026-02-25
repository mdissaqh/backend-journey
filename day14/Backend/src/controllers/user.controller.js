const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")



async function followController(req,res) {
    const followerUsername=req.user.username
    const followeeUsername=req.params.username
    if(followerUsername===followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }
    const isFolloweeExists=await userModel.findOne({username:followeeUsername})
    if(!isFolloweeExists){
        return res.status(404).json({
            message:"Followee doesn't exists"
        })
    }
    const isAlreadyFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already following ${followeeUsername}`
        })
    }
    const followingData=await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`You are now following ${followeeUsername}`,
        followingData
    })
}


async function unfollowController(req,res) {
    const followerUsername=req.user.username
    const followeeUsername=req.params.username
    const isUserFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)
    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
}


module.exports={
    followController,
    unfollowController
}