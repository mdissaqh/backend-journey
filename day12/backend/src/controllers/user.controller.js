const followModel=require("../models/follow.model")
const userModel=require("../models/user.model")



async function followUserController(req,res) {
    const followerUsername=req.user.username
    const {username}=req.params
    if(followerUsername==username){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }
    const isFolloweeExists=await userModel.findOne({username})
    if(!isFolloweeExists){
        return res.status(404).json({
            message:"The user you are trying to follow doesn't exist"
        })
    }
    const isAlreadyFollowed=await followModel.findOne({
        follower:followerUsername,
        followee:username
    })
    if(isAlreadyFollowed){
        return res.status(200).json({
            message:`You are already following ${username}`
        })
    }
    const follow=await followModel.create({
        follower:followerUsername,
        followee:username
    })

    res.status(200).json({
        message:`You are now following ${username}`,
        follow
    })
}



async function unfollowUserController(req,res) {
    const followerName=req.user.username
    const followeeName=req.params.username
    const isUserFollowing=await followModel.findOne({
        follower:followerName,
        followee:followeeName
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeName}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)
    res.status(200).json({
        message:`You have successfully unfollowed ${followeeName}`
    })
}



module.exports={
    followUserController,
    unfollowUserController
}