import express from 'express';
import User from '../model/userModel';

// const {google} = require('googleapis');
// const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];

// const TOKEN_PATH = 'token.json';
const googleOAuth = require('../utill/googleOAuth');

const router = express.Router();
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client("707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com");



router.post('/googlesignin', async (req, res) => {

  try {
    console.log(req.body.code);
    const code = req.body.code;
     const profile = await googleOAuth.getProfileInfo(code);

    const Guser = {
      googleId: profile.sub,
      displayName: profile.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      image: profile.picture,
    };
    try{
      let user = await User.findOne({googleId : profile.sub});
      console.log("no user"+user);
      if(user) {
        console.log("existing user:-"+user);
      }
      else {
        user= await User.create(Guser)
        console.log("new user created:-"+user);
      }
    }catch(err) {
      console.log(err);
    }

    
    res.send({ user });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
});


// router.post('/googlesignin', async (req, res) => {
// //  const token = await client.verifyIdToken({
// //     idToken: token,
// //     audience: "707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
// // });
//   console.log(req.body);
//   console.log(token);
//   res.send({
//     hello: "hello"
//   });
// });


export default router;  