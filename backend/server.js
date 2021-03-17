import express from 'express';
import dotenv from 'dotenv';
import config from '../backend/config';
import userRouter from './routers/userRouter'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
dotenv.config();

const mongodbUrl = config.MONGODB_URL;
console.log(mongodbUrl);

mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log('Connected to database ');
    
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
});


const app = express();

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',userRouter);



app.listen(8000,()=>{console.log("server started http://localhost:8000")});

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })