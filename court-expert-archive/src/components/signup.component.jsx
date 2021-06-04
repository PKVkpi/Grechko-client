import React, { useState } from 'react';
import axios from '../axios';
const url = 'http://localhost:8080';

export default function Signup(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [registrationDate, setRegistrationDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [passportSeries, setPassportSeries] = useState('');
    const [passportNumber, setPassportNumber] = useState(0);
    const [passportIssuingAuthority, setPassportIssuingAuthority] = useState('');
    const [passportIssuingDate, setPassportIssuingDate] = useState(new Date());
    const [identificationCode, setIdentificationCode] = useState(0); 
    const [workplace, setWorkplace] = useState('');
    const [secondName, setSecondName] = useState('');

    const onChangeEmail = React.useCallback((event) =>{
      const value = event.currentTarget.value;
      setEmail(value);
      console.log(email);
    },[])

    const onChangePassword = React.useCallback((event) =>{
      setPassword(event.currentTarget.value);
    },[])

    const onChangeName = React.useCallback((event) =>{
        setName(event.currentTarget.value);
    },[])

    const onChangeSurname = React.useCallback((event) =>{
        setSurname(event.currentTarget.value);
    },[])

    const onChangeSecondName = React.useCallback((event) =>{
        setSecondName(event.currentTarget.value);
    },[])

    const onChangeRegistrationDate = React.useCallback((event) =>{
        setRegistrationDate(event.currentTarget.value);
    },[])

    const onChangeLocation = React.useCallback((event) =>{
        setLocation(event.currentTarget.value);
    },[])

    const onChangePassportSeria = React.useCallback((event) =>{
        setPassportSeries(event.currentTarget.value);
    },[])

    const onChangePassportNumber = React.useCallback((event) =>{
        setPassportNumber(event.currentTarget.value);
    },[])

    const onChangePassportIssuingAuthority = React.useCallback((event) =>{
        setPassportIssuingAuthority(event.currentTarget.value);
    },[])

    const onChangePassportIssuingDate = React.useCallback((event) =>{
        setPassportIssuingDate(event.currentTarget.value);
    },[])

    const onChangeIdentificationCode = React.useCallback((event) =>{
        setIdentificationCode(event.currentTarget.value);
    },[])

    const onChangeWorkplace = React.useCallback((event) =>{
        setWorkplace(event.currentTarget.value);
        console.log(workplace)
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const user = {
          email,
          password,
          name,
          surname,
          registrationDate,
          location,
          passportSeries,
          passportNumber,
          passportIssuingAuthority,
          passportIssuingDate,
          identificationCode,
          workplaceId : Number(workplace) || 1,
          secondName        
        }
        console.log(user)
        let res = await axios.post(url + '/signup', user)
        props.history.push("/login");
      }
      catch{
        console.log("Not logged in");
      }
    }, [email, password, name,surname,registrationDate,location, passportSeries, passportNumber, 
        passportIssuingAuthority, passportIssuingDate, identificationCode, workplace, secondName ])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <div>Sign Up</div>
            <form>
              <div>  
                <div>Email:</div>
                <input type="email" name="email" onChange={onChangeEmail} />
                <div>Password:</div>
                <input type="password" name="password" onChange={onChangePassword} />
                <div>Name:</div>
                <input type="text" name="name" onChange={onChangeName} />
                <div>Surname:</div>
                <input type="text" name="surname" onChange={onChangeSurname} />
                <div>Second Name:</div>
                <input type="text" name="secondname" onChange={onChangeSecondName} />
                <div>Registration Date:</div>
                <input type="date" name="registrationDate" onChange={onChangeRegistrationDate} />
                <div>Location:</div>
                <input type="text" name="location" onChange={onChangeLocation} />
                <div>Passport Serial Number:</div>
                <input type="text" name="passportSeria" onChange={onChangePassportSeria} />
                <div>Passport Number:</div>
                <input type="number" name="passportNumber" onChange={onChangePassportNumber} />
                <div>Passport Issuing Authority:</div>
                <input type="text" name="passportIssuingAuthority" onChange={onChangePassportIssuingAuthority} />
                <div>Passport Issuing Date:</div>
                <input type="date" name="passportIssuingDate" onChange={onChangePassportIssuingDate} />
                <div>Identification Code:</div>
                <input type="number" name="identificationCode" onChange={onChangeIdentificationCode} />
                <div>Workplace</div>
                <select name="workplaceList" value={workplace} onChange={onChangeWorkplace}>
                    <option value='1'>Ministry of Justice</option>
                    <option value='2'>Ministry of Internal Affairs</option>
                    <option value='3'>Ministry of Foreign Affairs</option>
                    <option value='4'>Ministry of Health</option>
                    <option value='5'>Another workplace</option>
                </select>
                

              </div>
              <button className="btn btn-success" onClick={onSubmit} type="button">Confirm</button>
              <button className="btn btn-danger" onClick={onBackClick}>Back</button>
            </form>      
        </div>
    )
}