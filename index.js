require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require('./config/db');

const app = express();
app.use(express.json())
connectDb();

app.use(cors());

const PORT = process.env.PORT

if(process.env.NODE_ENV === 'development'){
    // app.use(cors({
    //     origin:process.env.CLIENT_URL
    // }))
    app.use(morgan('dev'))
}


// load all router
const authroutes = require('./route/authRoutes');
const todoroutes = require('./route/todo.route');


//use all routes
app.use("/api/auth",authroutes);
app.use("/api/todo",todoroutes);


app.use((req,res,next)=>{
    res.status(400).json({
        success:false,
        message:"not found"
    })
})

app.listen(PORT,()=>{
    console.log('app listning at ',PORT);
})
