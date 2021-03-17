import React, {useState, Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';


function App() {
  const [data, setData] = useState({
    isAuthenticated : false,
    token : '',
    user : null
})

  const handleLogin = (response) => {
    console.log(response);

    const access_token = response.accessToken;
    const tokenSend = {access_token}

    Axios.post('http://localhost:8000/api/googlesignin', tokenSend)
        .then(response => {
            const token = response.headers;
                setData({
                    ...data, token: token, isAuthenticated: true, user: response.data
                })
        })

   
    // Axios({
    //   method:'POST',
    //   url:'http://localhost:8000/api/googlelogin',
    //   data:{tokenId:response.tokenId}
    // }).then(response=>{
    //   console.log(response);
    // });
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
