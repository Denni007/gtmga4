import express from 'express';
import User from '../model/userModel';

const router = express.Router();
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client("707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com");



router.post('/googlesignin', async (req, res) => {

  console.log(req.body);
  res.send({
    hello: "hello"
  });
});



export default router;