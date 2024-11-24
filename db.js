const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/mydatabase'


mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongoDB server:');
});

db.on('disconnected',()=>{
    console.log('mongoDB disconnected:');
});

db.on('error',(err)=>{
    console.error('error in mongoDB connection',err);
});

// export mongodb connection so that the main file can import that abnd run on the server...
module.exports = db;