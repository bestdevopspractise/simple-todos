import mongoose from "mongoose";

import { StartUpError } from "@jaypeeblogs/common";
import app from "./app";

const start = async (port?:number)=> {

    if(!process.env.JWT){
        throw new StartUpError('JWT expression env variable not set')
    }

    if(!process.env.MongoUrl){
        throw new StartUpError('Mongodb Database Error is not set')
    }

    try {
    await mongoose.connect(process.env.MongoUrl)
    console.log('connection to database established')
    }catch(err) {
        console.log(err)
        process.exit(1)
    }

    const PORT = process.env.PORT || port
    app.listen(PORT, ()=>{
        console.log(`server listening on port: ${PORT}`)
    })

};

start(4000)

