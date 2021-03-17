import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';


function App() {
  const handleLogin = (response) => {
    console.log(response);
    Axios({
      method:'POST',
      url:'http://localhost:8000/api/googlelogin',
      data:{tokenId:response.tokenId}
    }).then(response=>{
      console.log(response);
    });
  }
  
    return (
      
        <GoogleLogin
    clientId="707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/>
       
    );
  
}

export default App;
