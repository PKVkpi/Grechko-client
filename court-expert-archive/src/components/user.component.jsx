import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const url = 'http://localhost:3000/';

export default function User(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    const onSubmit = React.useCallback(async() => {
      try{
        const cookie = cookies.get('id');
        if(cookie){
            const reqOptions = {
                headers: {Authorization : `Bearer ${cookie}`}
            }
            let res = await axios.get(url + '/search', reqOptions)
            console.log(res.json());
            setUsers(res.data);
            props.history.push("/");
        }
        else{
            console.log("Cookie is empty");
        }
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
            <div>Users Info</div>
              <div>
                <div>{users}</div>
              </div>
              <button onSubmit={onSubmit} type="button">Log out</button>
              <button onClick={onBackClick}>Back</button>     
        </div>
    )
}