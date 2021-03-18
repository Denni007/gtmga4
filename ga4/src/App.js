import React, { useState, Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin ,GoogleLogout} from 'react-google-login';


function App() {
  const [data, setData] = useState({
    isAuthenticated: false,
    token: '',
    user: null
  });
  const [isLoggedIn, setisLoggedIn] = useState(false)

  const handleLogin = (response) => {
    console.log();

    const code =response['code'];
  

    Axios.post('http://127.0.0.1:5000/api/googlesignin', response).then(response => {
      const token = response.headers;
      setData({
        ...data, token: token, isAuthenticated: true, user: response.data
      });
      setisLoggedIn(true);
      console.log(isLoggedIn);
    })


    // // Axios({
    // //   method:'POST',
    // //   url:'http://localhost:8000/api/googlelogin',
    // //   data:{tokenId:response.tokenId}
    // // }).then(response=>{
    // console.log(response);
    // // });
    // Axios({
    //   method: 'POST',
    //   url:'http://localhost:5000/api/googlesignin',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ response }),
    // }).then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     return Promise.reject(res);
    //   }
    // });
  }

  const logout = () =>{
    setisLoggedIn(false);
    return "bye"
  }
  return (<div>
    {isLoggedIn ? <GoogleLogout
      clientId="707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout> : <GoogleLogin
      clientId="707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com"
      responseType="code"
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={'single_host_origin'}
    />}
  </div>


  );

}

export default App;
