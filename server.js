const express=require('express')
const app=express()
const db=require('./db');// file name..

const bodyparser=require('body-parser');
app.use(bodyparser.json());



// now import model or schema here inside the main














app.get('/muskan',(req,res)=>{
    res.send("hello guys how u doing.");
});

const personroutes=require('./routes/personrouter');
const menuroutes=require('./routes/menuroutes');
// to use the routes...
app.use('/person',personroutes);
app.use('/menu',menuroutes);

app.listen(3401,()=>{
    console.log('listening on port:3401');
});