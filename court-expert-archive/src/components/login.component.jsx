import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const url = 'http://localhost:3000/';

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    const onChangeEmail = React.useCallback((event) =>{
      setEmail(event.currentTarget.value);
    },[])

    const onChangePassword = React.useCallback((event) =>{
      setPassword(event.currentTarget.value);
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const user = {
          email : email,
          password : password
        }
        console.log(user)
        let res = await axios.post(url + '/login', user)
        console.log(res.json());
        setCookie('id', res.data.connect.sid, { path: '/' });
        props.history.push("/");
      }
      catch{
        console.log("Not logged in");
      }
    }, [])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <div>Log in</div>
            <form>
              <div>
                <div>Email:</div>
                <input type="email" name="email" onChange={onChangeEmail} />
                <div>Password:</div>
                <input type="password" name="password" onChange={onChangePassword} />
              </div>
              <button onSubmit={onSubmit} type="button">Confirm</button>
              <button onClick={onBackClick}>Back</button>
            </form>      
        </div>
    )
}