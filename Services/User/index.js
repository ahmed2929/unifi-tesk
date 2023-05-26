const User =require("../../DB/Schema/Users")

const getUser =async (userId)=>{
    try {
        const user = await User.findById(userId)
        if(user){
           return user
        }else{
           return false
        }
    } catch (error) {
        console.log(error)
        return false
    }


}

module.exports={
    getUser
}