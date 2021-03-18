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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
});
// app.use( (req, res,next) => {
//  console.log(req.body);
//  next();
// });

app.use('/api', userRouter);

// app.post('/api/googlesignin', async (req, res) => {
//   //  const token = await client.verifyIdToken({
//   //     idToken: token,
//   //     audience: "707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
//   // });
//     console.log(req.body);
  
//     res.send({
//       hello: "hello"
//     });
//   });

app.listen(5000,()=>{console.log("server started http://localhost:5000")});

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })