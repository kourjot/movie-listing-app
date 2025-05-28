import { Schema,model } from "mongoose";
const movieSchema=new Schema({
    movieName:{type:String,required:true},
    ownerId:{type:Schema.Types.ObjectId,ref:"user"},
    Image:{type:String},
    duration:{type:Number},
    releaseYear:{type:Number},
    genre:{type:String},
    description:{type:String},
    director:{type:String,required:true}
})
const movie=model("movie",movieSchema)
export {movie}