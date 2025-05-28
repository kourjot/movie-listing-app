import { movie } from "../models/movie.js";
import {v2} from "cloudinary"
import fs from "fs"
import "dotenv/config"
  v2.config({
 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  });
export const addMovie=async(req,res)=>{
    const {movieName,duration,releaseYear,genre,description,director}=req.body
    
    try{
      let url;
      if (req.file) {
              // Upload the new photo to Cloudinary if provided
              const uploadResponse = await v2.uploader.upload(req.file.path);
              url = uploadResponse.secure_url;
              fs.unlinkSync(req.file.path)
          }
        let newMovie=new movie({
          movieName,duration,releaseYear,genre,description,director,
          Image:url||"",
          ownerId:req.user.id
        })
        await newMovie.save()
        res.status(201).json({message:"new movie is uploaded sucessfully"})
    }catch(err){
      // console.log(err);
        return res.status(500).json({message:"error in adding movies"})
    }
}

export const allMovies=async(req,res)=>{
  // console.log(req.header.authorization);
  try{
    const allMovies=await movie.find()
    res.status(200).json({message:allMovies})
  }catch(err){
    res.status(500).json({message:"Internal server error in getting error"})
  }
}

export const myMovies=async(req,res)=>{
  // console.log("my movies");
  try{
    const myMoviesExist=await movie.find({ownerId:req.user.id})
    // console.log(myMoviesExist);
    return res.status(200).json({movies:myMoviesExist})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Internal server error in myMovies"})
  }
}

export const deleteMovies=async(req,res)=>{
  const {movieId}=req.params
  try{
    const myMoviesExist=await movie.findById(movieId)
    if(!myMoviesExist){
      return res.status(404).json({message:"Movie not exist"})
    }
    if(myMoviesExist.ownerId==req.user.id){
      await movie.deleteOne({_id:movieId})
      return res.status(200).json({message:"Movie deleted sucessfully"})
    }
    return res.status(403).json({message:"You can delete only your Movies"})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Internal server error in deleteMovies"})
  }
}