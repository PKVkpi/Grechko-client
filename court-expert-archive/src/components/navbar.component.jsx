import axios from '../axios';
import React, {useState} from 'react';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';
const url = 'http://localhost:8080';

export default function Navbar(props){
  const [search_string, setSearchString] = useState('');
  const [cookies, setCookies, removeCookie] = useCookies();
  let email;
  let a = async ()=>{
    const user = await axios.get(url + '/users/' + cookies['id']);
    console.log(user)
    return user.email
  }
  const search = (
      <form class="form-inline my-2 my-lg-0" action={"/search/" + search_string}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchString(e.target.value)} required />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
  )

  return (
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Court Expert Archive</Link>
      {search}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        {
          cookies['id'] ?
          <React.Fragment>
            <Link className="nav-link"
                to={{ pathname: `/users/${cookies['id']}`}}>{a()
                }</Link>
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
                
          </React.Fragment> :
          <React.Fragment>
            <button className="btn btn-dark" onClick={() => window.location = "/login"}>Log In</button>
            <button className="btn btn-dark" onClick={() => window.location = "/signup"}>Sign Up</button>
          </React.Fragment>
        }
        </div>
        </li>
      </ul>
  </nav>
  )
}