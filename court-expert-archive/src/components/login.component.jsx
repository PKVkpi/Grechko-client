import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
// import {useCookies} from './user.component' 
const url = 'http://localhost:8080';

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    // const { cookie, setUpdatedCookie } = useCookies();
    const onChangeEmail = React.useCallback((event) =>{
      setEmail(event.currentTarget.value);
    },[])

    const onChangePassword = React.useCallback((event) =>{
      setPassword(event.currentTarget.value);
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const user = {
          email : 'asd@gmail.com',
          password : 'pass'
        }
        // console.log(user)
        axios.defaults.withCredentials = true;
        let res = await axios.post(url + '/login',  {
          email: 'asd@gmail.com',
          password: 'pass'
        });
        // console.log(res.headers);
        // console.log(res);
        // setCookie('id', res.data, { path: '/' });
        props.history.push("/users/1");
      }
      catch{
        console.log("Not logged in login");
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
              <button onClick={onSubmit} type="button">Confirm</button>
              <button onClick={onBackClick}>Back</button>
            </form>      
        </div>
    )
}