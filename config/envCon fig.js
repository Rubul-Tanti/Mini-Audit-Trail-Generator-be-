const env=require("dotenv")
env.config()
const Env=()=>{
return {
  Port: process.env.PORT,
  DATABASE_URL:process.env.MONGODBURL
}
}
module.exports =Env