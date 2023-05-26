const User=require("./DB/Schema/Users")
exports.RegisterDummyUserForTesting=async ()=>{
   await User.deleteMany({
        email:"test@user.com"
    })
    const user =new User({
        firstName:"test",
        lastName:"user",
        email:"test@user.com",
        password:"123456789",

    })
    await user.save()
    return user
}