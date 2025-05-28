import { connect } from "mongoose";
import "dotenv/config"
const connection =async function () {
    try{
        await connect(process.env.MONGO_URI);
        console.log("connected to mongoDb");
    }catch(err){
        console.log("error in mongo db connection");
    }
}
export default connection