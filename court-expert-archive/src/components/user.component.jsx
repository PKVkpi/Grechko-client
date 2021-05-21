import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const url = 'http://localhost:8080';

// export function useCookie()  {
//   const [cookie, setCookie] = React.useState("")

//   React.useEffect(() => {
//       // only execute all the code below in client side
//       if (typeof window !== 'undefined') {
//           function loadCookie() {
//               setCookie(document.cookie);
//           }

//           loadCookie()
//       }
//   }, []);

//   const setUpdatedCookie = React.useCallback((cookie) => {
//       document.cookie = cookie
//   }, []);

//   return { cookie, setUpdatedCookie };
// }

export default function User(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    const onSubmit = React.useCallback(async() => {
      try{
        const cookie = cookies['id']
        console.log('cokies: ');
        console.log(cookies);
        console.log('---------');
        // if(cookie){
            // const reqOptions = {
            //     headers: {Authorization : `Bearer ${cookie}`}
            // }
            
            // console.log(reqOptions);
            axios.defaults.withCredentials = true;
            let res = await axios.get(url + '/search', {withCredentials: true });
            console.log(res.data);
            // setUsers(res.data); //error
            props.history.push("/");
        // }
        // else{
        //     console.log("Cookie is empty");
        // }
      }
      catch{
        console.log("Not logged in here");
      }
    }, [cookies, props.history])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <div>Users Info</div>
              <div>
                <div>{users}</div>
              </div>
              <button onClick={onSubmit} type="button">Log out</button>
              <button onClick={onBackClick}>Back</button>     
        </div>
    )
}