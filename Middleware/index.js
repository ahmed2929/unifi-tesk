const express=require('express');
const bodyParser=require('body-parser');
var cors = require('cors');
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const ToDo =require('../Routes/ToDo/index')



module.exports=(app)=>{ 
    app.use(bodyParser.json());
   //HTTP headers
    app.use(helmet());
    //Enable cors
    app.use(cors());

//Against brute attack
const rateLimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", rateLimiter);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

//NoSQL query injection -Data Sanitization
app.use(mongoSanitize());

//xss attack - Data Sanitization
app.use(xss());

//HTTP parament pollution
app.use(hpp());
 
// log coming requests
app.use((req,res,next)=>{
  // log request info and its body data ?
  console.log("request info ",req.method,req.url)
  console.log("request body ",req.body)
  console.log("request params ",req.params)
  console.log("request query ",req.query)
  console.log("request headers ",req.headers)
  

  next();
})
  
 
  app.use("/api/v1/todo",ToDo);

  



  //Handling unhandled routes
    app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "Error 404",
      message: `path not found. Can't find ${req.originalUrl} on this server`,
    });
    });
   


//error handler 
app.use((error,req,res,next)=>{
   const status    = error.statusCode || 500 ;
   const message   = error.message           ;
   const data      = error.data              ;
   if(status===500){
    console.log(error)
   return res.status(status).json({message:"internal server error",data:data});
   }
   res.status(status).json({message:message,data:data});
});


return app;
}