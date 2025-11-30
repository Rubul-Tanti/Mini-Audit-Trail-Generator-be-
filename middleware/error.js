class ApiError extends Error {
    constructor(statusCode,message){
        super(message)
        this.statusCode=statusCode;
        this.message=message;
    }
}
const asyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler=(err,req,res,next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            status:"Error",
            message:err.message
        });
    }
    else if(err.name==="ValidationError"){
        return res.status(400).json({
            status:"Error",
            message:"Validation Error"
        });
    }
   else if (err.name === "NotFoundError") {
    return res.status(404).json({
      status: "Error",
      message: "Invalid route: " + req.url,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: "An unexpected error occurred",
  });
}
module.exports={ApiError,asyncError,globalErrorHandler};