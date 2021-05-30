import React, { useEffect, useState } from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie'
import {useParams} from 'react-router-dom'
const url = 'http://localhost:8080';

export default function User(props){
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies('id');
    const [registrationDate, setRegistrationDate] = useState();
    const [location, setLocation] = useState('');
    const [passportSeries, setPassportSeries] = useState('');
    const [passportNumber, setPassportNumber] = useState(0);
    const [passportIssuingAuthority, setPassportIssuingAuthority] = useState('');
    const [passportIssuingDate, setPassportIssuingDate] = useState();
    const [identificationCode, setIdentificationCode] = useState(0); 
    const [workplace, setWorkplace] = useState('');
    const [secondName, setSecondName] = useState('');
    const id = useParams().id;

    useEffect(async ()=>{
      let res = await axios.get(url + '/users/' + id);
      const user = res.data;
      console.log(user)
      setEmail(user.email);
      setName(user.name);
      setSurname(user.surname);
      setRegistrationDate(user.registrationdate);
      setLocation(user.location);
      setPassportSeries(user.passportseries);
      setPassportNumber(user.passportnumber);
      setPassportIssuingAuthority(user.passportissuingauthority);
      setPassportIssuingDate(user.passportissuingdate);
      setIdentificationCode(user.identificationcode);
      setWorkplace(user.workplaceid);
      setSecondName(user.secondname);
    })

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <div>User Info</div>
              <div>
                <div>Email: {email}</div>
                <div>Surname: {surname}</div>
                <div>Name: {name}</div>
                <div>Second Name: {secondName}</div>
                <div>Registration Date: {registrationDate}</div>
                <div>Location: {location}</div>
                <div>Passport Serial Number: {passportSeries}</div>
                <div>Passport Number: {passportNumber}</div>
                <div>Passport Issuing Authority: {passportIssuingAuthority}</div>
                <div>Passport Issuing Date: {passportIssuingDate}</div>
                <div>Identification Code: {identificationCode}</div>
                <div>Workplace: {workplace}</div>
              </div>
              <button onClick={async () => {
                    try{
                      props.history.push("/users/" + id +  "/update");
                    }
                    catch{
                      console.log("Not logged in here");
                    }}} type="button">Update</button>
              <button onClick={onBackClick}>Back</button>     
        </div>
    )
}