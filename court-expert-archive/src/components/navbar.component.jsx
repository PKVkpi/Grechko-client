import axios from '../axios';
import React, {useState} from 'react';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';
const url = 'http://localhost:8080';

export default function NavbarComp(props){
  const [search_string, setSearchString] = useState('');
  const [cookies, setCookies, removeCookie] = useCookies();
  const [email, setEmail] = useState();

  const e = ()=>{
    let email;
    axios.get(url + '/users/' + cookies['id'])
    .then((res)=>{
      email = res.data.email;
      console.log(email)
    })
    .catch((err)=>{
      console.log(err);
    })
    return email;
  }

  

  React.useEffect(()=>{
    let email;
    axios.get(url + '/users/' + cookies['id'])
    .then((res)=>{
      email = res.data.email;
      console.log(email)
    })
    .catch((err)=>{
      console.log(err);
    })
    setEmail(email)
  }, [])
  
  const search = (
      <ul className="navbar-nav mx-auto">
        <li className="navbar-item">
            <input type="text" className="form-control" onChange={e => setSearchString(e.target.value)} value={search_string} required />
        </li>
        <li className="navbar-item">
            <form action={"/search/" + search_string}>
                <input id="searchInput" type="submit" value="Search" className="btn btn-outline-success my-2 my-sm-0"  />
            </form>
        </li>
      </ul >
  )

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
      <Link to="/" className="navbar-brand">Court Expert Archive</Link>
      
          {search}
        <ul className="navbar-nav navbar-right">
        
        {
          cookies['id'] ?
          <React.Fragment>
            <li className="nav-item">
            <Link className="nav-link"
                to={{ pathname: `/users/${cookies['id']}`}}>User Page</Link>
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-dark" onClick={async () => {
                    try{
                      removeCookie('id', { path: '/' });
                      props.history.push("/");
                      window.location.reload();
                    }
                    catch{
                      console.log("Not logged in here");
                    }
                }}>
                    LogOut
                </button>
            </li>
          </React.Fragment> :
          <React.Fragment>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => window.location = "/login"}>Log In</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => window.location = "/signup"}>Sign Up</button>
            </li>
          </React.Fragment>
        }
        
      </ul>
      </div>
  </nav>
  )
}