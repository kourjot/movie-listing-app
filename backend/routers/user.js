import { Router } from "express";
import { signInUser } from "../controller/user.js";
import { checkPassword } from "../middleware/checkPassword.js";
import { login } from "../controller/user.js";
import { tokenVerify } from "../middleware/token.js";
import { addMovie ,allMovies,myMovies,deleteMovies} from "../controller/movies.js";
import { profileMulter } from "../middleware/multer.js";
const userRouter=Router()
userRouter.get("/",(req,res)=>{
    res.send("healt check")
})

userRouter.post("/signIn",checkPassword,signInUser)
userRouter.post("/login",login)
userRouter.post("/addMovie",profileMulter.single("photo"),tokenVerify,addMovie)
userRouter.get("/allMovies",allMovies)
userRouter.get("/myMovies",tokenVerify,myMovies)
userRouter.delete("/deleteMymovie/:movieId",tokenVerify,deleteMovies)
export {userRouter}