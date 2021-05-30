import React, { useState } from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie';
import {useParams} from 'react-router-dom';
const url = 'http://localhost:8080';

export default function UpdateUser(props){
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
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

    React.useEffect(async ()=>{
        let res = await axios.get(url + '/users/' + id);
        const user = res.data;
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
      }, [])

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
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const user = {
          name,
          surname,
          registrationDate,
          location,
          passportSeries,
          passportNumber,
          passportIssuingAuthority,
          passportIssuingDate,
          identificationCode,
          workplace,
          secondName        
        }
        console.log(user)
        let res = await axios.put(url + '/users/' + id + '/update', user)
        console.log(res)
        // props.history.push("/");
      }
      catch{
        console.log("Not logged in");
      }
    }, [ name,surname,registrationDate,location, passportSeries, passportNumber, 
        passportIssuingAuthority, passportIssuingDate, identificationCode, workplace, secondName])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <div>Update user</div>
            <form>
              <div>  
                <div>Name:</div>
                <input type="text" name="name" value={name} onChange={onChangeName} />
                <div>Surname:</div>
                <input type="text" name="surname" value={surname} onChange={onChangeSurname} />
                <div>Second Name:</div>
                <input type="text" name="secondname" value={secondName} onChange={onChangeSecondName} />
                <div>Registration Date:</div>
                <input type="date" name="registrationDate" value={registrationDate} onChange={onChangeRegistrationDate} />
                <div>Location:</div>
                <input type="text" name="location" value={location} onChange={onChangeLocation} />
                <div>Passport Serial Number:</div>
                <input type="text" name="passportSeria" value={passportSeries} onChange={onChangePassportSeria} />
                <div>Passport Number:</div>
                <input type="number" name="passportNumber" value={passportNumber} onChange={onChangePassportNumber} />
                <div>Passport Issuing Authority:</div>
                <input type="text" name="passportIssuingAuthority" value={passportIssuingAuthority} onChange={onChangePassportIssuingAuthority} />
                <div>Passport Issuing Date:</div>
                <input type="date" name="passportIssuingDate" value={passportIssuingDate} onChange={onChangePassportIssuingDate} />
                <div>Identification Code:</div>
                <input type="number" name="identificationCode" value={identificationCode} onChange={onChangeIdentificationCode} />
                <div>Workplace</div>
                <select name="workplaceList" value={workplace} onChange={onChangeWorkplace}>
                    <option value='minjust'>Ministry of Justice</option>
                    <option value='minInternalAffairs'>Ministry of Internal Affairs</option>
                    <option value='minForeignAffairs'>Ministry of Foreign Affairs</option>
                    <option value='minHealth'>Ministry of Health</option>
                    <option value='another'>Another workplace</option>
                </select>
                

              </div>
              <button onClick={onSubmit} type="button">Confirm</button>
              <button onClick={onBackClick}>Back</button>
            </form>      
        </div>
    )
}