const mongoose = require('mongoose');

const connectDB = async ()=>{
    const connection = await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:true,
        useUnifiedTopology:true
    })
    console.log('connection extablist');
}

module.exports = connectDB;