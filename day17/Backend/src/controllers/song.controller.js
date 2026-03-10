const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")


async function postSongs(req, res) {
    const songBuffer = req.file.buffer
    const {mood}=req.body

    const tags = id3.read(songBuffer)
    console.log(tags)
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "moodify/posters"
        })
    ])
    const song=await songModel.create({
        url:songFile.url,
        posterUrl:posterFile.url,
        title:tags.title,
        mood
    })
    res.status(201).json({
        song
    })
}

async function getSongs(req,res) {
    const {mood}=req.query
    const song=await songModel.findOne({mood})
    res.status(200).json({
        message:"Song fetched successfully",
        song
    })
}


module.exports = {
    postSongs,
    getSongs
}