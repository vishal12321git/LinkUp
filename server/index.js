const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

// const allowedOrigins = process.env.NODE_ENV === 'production' 
//     ? [process.env.FRONTEND_URL]  // Production URL (frontend on Render)
//     : ['http://localhost:3000'];  // Development URL (localhost)

// app.use(cors({
//     origin: allowedOrigins,  // Allow the frontend URL to make requests
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true  // Allow cookies to be sent with requests
// }));

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})

//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("MongoDB connected successfully " + PORT)
    })
})
