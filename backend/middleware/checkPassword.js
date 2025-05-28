const checkPassword=async(req,res,next)=>{
    try{
        const {password}=req.body
        if(password.length<6){
            return res.status(400).json({message:"Password length less then 6"})
        }
        console.log(password);
        let specialCharcters="@!#$%^&*?"
        let flag=false
        for(let i=0;i<specialCharcters.length;i++){
            for(let j=0;j<password.length;j++){
                if(specialCharcters[i]==password[j]){
                    flag=true
                    break
                }
            }
            if(flag){
                break
            }
        }
        if(flag){
            next()
        }else{
           return res.status(400).json({message:"Password not containes any special character"})
        }
    }catch(err){
        res.status(400).json({message:"password not container special characters"})
    }
}
export {checkPassword}