import React, { useState, Component } from 'react';
import Axios from 'axios';
import GoogleLogin from 'react-google-login';


function Googlelogin() {
  const [data, setData] = useState({
    isAuthenticated: false,
    token: '',
    user: null
  });
  
  const  responseGoogle = (response) => {
    console.log(response);

  const access_token = response.tokenId;
  const tokenSend = { access_token };

  Axios.post('http://127.0.0.1:5000/api/googlesignin', {access_token}, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(response => {
    const token = response.headers;
    setData({
      ...data, token: token, isAuthenticated: true, user: response.data
    })
  })
  console.log(response);
}   
return (<div className="login-page">
        <GoogleLogin
          // use your client id here
          clientId="707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
          buttonText="Login with google"
          responseType="code"
        
          redirectUri="postmessage"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  };

export default Googlelogin;