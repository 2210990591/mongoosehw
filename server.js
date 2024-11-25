const express=require('express')
const app=express()
const db=require('./db');// file name..
require('dotenv').config();

const bodyparser=require('body-parser');
app.use(bodyparser.json());



// now import model or schema here inside the main
// i am muskan










// middleware function..
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to:${req.originalUrl}`);
    next(); // move to the next middleware phase..
}


app.use(logRequest);// use this middleware..

app.get('/muskan',(req,res)=>{
    res.send("hello guys how u doing.");
});

const personroutes=require('./routes/personrouter');
const menuroutes=require('./routes/menuroutes');
// to use the routes...
app.use('/person',personroutes);
app.use('/menu',menuroutes);

// app.listen(3401,()=>{
//     console.log('listening on port:3401');
// });
const port = process.env.PORT || 3401;  // Use the PORT variable from .env, or default to 3401
app.listen(port, () => {
    console.log(`listening on port:${port}`);
});
