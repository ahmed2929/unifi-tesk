let app =require("express")();
require('dotenv').config();
const  {ConnectToDB} =require("./DB/Server/index")
const SetMiddleWares=require('./Middleware/index')
const port = process.env.PORT || 4000
const User =require("./DB/Schema/Users")
const {RegisterDummyUserForTesting}=require("./RegisterUserToDbForTesting")
//Connect to DB
ConnectToDB();
app=SetMiddleWares(app)
 
// Start the server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
RegisterDummyUserForTesting()
.then(user=>{
    console.log("dummy user id is :",user._id.toString())
})
.catch(err=>{
    console.log("failed to create dummy user")
    console.log(err)
})