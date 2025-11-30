const mongoose=require('mongoose')
const Env = require('../config/envCon fig')
const connectToDb=()=>{
    try{
        mongoose.connect(Env().DATABASE_URL).then(console.log("Connected to Database"))
    }catch(e){
        console.log('unable to connect to database')
    }
}
module.exports=connectToDb