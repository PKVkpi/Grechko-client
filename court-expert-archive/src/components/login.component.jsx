import React, { useState } from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie'
const url = 'http://localhost:8080';

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    const onChangeEmail = React.useCallback((event) =>{
      const value = event.currentTarget.value;
      setEmail(value);
      console.log(email);
    },[])

    const onChangePassword = React.useCallback((event) =>{
      setPassword(event.currentTarget.value);
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const user = {
          email,
          password
        }
        console.log(user)
        let res = await axios.post(url + '/login', user)
        setCookie('id', res.data, { path: '/' });
        props.history.push("/");
      }
      catch{
        console.log("Not logged in");
      }
    }, [email, password])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <h2>Log in</h2>
            <form>
              <div>
                <div>Email:</div>
                <input type="email" name="email" onChange={onChangeEmail} />
                <div>Password:</div>
                <input type="password" name="password" onChange={onChangePassword} />
              </div>
              <button className="btn btn-success" onClick={onSubmit} type="button">Confirm</button>
              <button className="btn btn-danger" onClick={onBackClick}>Back</button>
            </form>      
        </div>
    )
}