import React, {useState} from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie'
const url = 'http://localhost:8080';

export default function CreateExpert(props){
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [surname, setSurname] = useState('');
    const [ekkName, setEkkName] = useState('');
    const [ekkDate, setEkkDate] = useState('');
    const [ekkNumber, setEkkNumber] = useState('');
    const [qualDate, setQualDate] = useState('');
    const [qualNumber, setQualNumber] = useState('');
    const [expertiseType, setExpertiseType] = useState('');
    const [expertSpeciality, setExpertSpeciality] = useState('');
    const [location, setLocation] = useState(''); 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [workplace, setWorkplace] = useState('');

    const onChangeEmail = React.useCallback((event) =>{
      const value = event.currentTarget.value;
      setEmail(value);
    },[])

    const onChangeEkkName = React.useCallback((event) =>{
      setEkkName(event.currentTarget.value);
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

    const onChangeEkkDate = React.useCallback((event) =>{
        setEkkDate(event.currentTarget.value);
    },[])

    const onChangeLocation = React.useCallback((event) =>{
        setLocation(event.currentTarget.value);
    },[])

    const onChangeEkkNumber = React.useCallback((event) =>{
        setEkkNumber(event.currentTarget.value);
    },[])

    const onChangeQualDate = React.useCallback((event) =>{
        setQualDate(event.currentTarget.value);
    },[])

    const onChangeQualNumber = React.useCallback((event) =>{
        setQualNumber(event.currentTarget.value);
    },[])

    const onChangeExpertiseType = React.useCallback((event) =>{
        setExpertiseType(event.currentTarget.value);
    },[])

    const onChangeExpertSpeciality = React.useCallback((event) =>{
        setExpertSpeciality(event.currentTarget.value);
    },[])

    const onChangePhone = React.useCallback((event) =>{
        setPhone(event.currentTarget.value);
    },[])

    const onChangeWorkplace = React.useCallback((event) =>{
        setWorkplace(event.currentTarget.value);
    },[])

    const onSubmit = React.useCallback(async() => {
      try{
        const courtExpert = {
          name,
          surname,
          secondName,
          EKKDate : ekkDate,
          EKKName : ekkName,
          EKKNumber : ekkNumber,
          qualDate,
          qualNumber,
          expertiseType,
          expertSpeciality,
          location,
          email,
          phone,
          workplaceId : Number(workplace) || 1,
                  
        }
        console.log(courtExpert)
        let res = await axios.post(url + '/courtExperts/add', courtExpert)
        console.log(res)
        props.history.push("/");
      }
      catch{
        console.log("Not created");
      }
    }, [name,surname,secondName,ekkDate,ekkName,ekkNumber,qualDate,qualNumber,
        expertiseType,expertSpeciality,location,email,phone,workplace ])

    const onBackClick = React.useCallback(() => {
      props.history.push("/");
    }, [])

    return (
        <div>
            <h2>Court Expert Creation</h2>
            <form>
              <div>
                <div>Name:</div>
                <input type="text" name="name" onChange={onChangeName} />
                <div>Surname:</div>
                <input type="text" name="surname" onChange={onChangeSurname} />
                <div>Second Name:</div>
                <input type="text" name="secondname" onChange={onChangeSecondName} />
                <div>EKK Name:</div>
                <input type="text" name="ekkName" onChange={onChangeEkkName} />
                <div>EKK Date:</div>
                <input type="date" name="ekkDate" onChange={onChangeEkkDate} />
                <div>EKK Number:</div>
                <input type="number" name="ekkNumber" onChange={onChangeEkkNumber} />
                <div>Quality Document Date:</div>
                <input type="date" name="qualDate" onChange={onChangeQualDate} />
                <div>Quality Document Number:</div>
                <input type="number" name="qualNumber" onChange={onChangeQualNumber} />
                <div>Expertise Type:</div>
                <input type="text" name="expertiseType" onChange={onChangeExpertiseType} />
                <div>Expertise Speciality:</div>
                <input type="text" name="expertSpeciality" onChange={onChangeExpertSpeciality} />
                <div>Location:</div>
                <input type="text" name="location" onChange={onChangeLocation} />
                <div>Email:</div>
                <input type="email" name="email" onChange={onChangeEmail} />
                <div>Phone:</div>
                <input type="phone" name="phone" onChange={onChangePhone} />
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