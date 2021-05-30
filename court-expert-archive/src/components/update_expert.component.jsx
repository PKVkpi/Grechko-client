import React, {useState} from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie';
import {useParams} from 'react-router-dom';
const url = 'http://localhost:8080';

export default function UpdateExpert(props){
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
    const id = useParams().id;
    
    React.useEffect(async ()=>{
        let res = await axios.get(url + '/courtExperts/' + id);
        const e = res.data[0];
        setName(e.name);
        setSecondName(e.secondname);
        setSurname(e.surname);
        setEkkName(e.ekkname);
        setEkkDate(e.ekkdate);
        setEkkNumber(e.ekknumber);
        setQualDate(e.qualdate);
        setQualNumber(e.qualnumber);
        setExpertiseType(e.expertisetype);
        setExpertSpeciality(e.expertspeciality);
        setLocation(e.location);
        setEmail(e.email);
        setPhone(e.phone);
        res = await axios.get(url + '/positions/' + e.workplaceid);
        setWorkplace(res.data[0].name);
    }, [])

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
          workplaceId : 1,
                  
        }
        let res = await axios.put(url + `/courtExperts/${id}/update`, courtExpert)
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
            <div>Court Expert Update</div>
            <form>
              <div>
                <div>Name:</div>
                <input type="text" name="name" value={name} onChange={onChangeName} />
                <div>Surname:</div>
                <input type="text" name="surname" value={surname} onChange={onChangeSurname} />
                <div>Second Name:</div>
                <input type="text" name="secondname" value={secondName} onChange={onChangeSecondName} />
                <div>EKK Name:</div>
                <input type="text" name="ekkName" value={ekkName} onChange={onChangeEkkName} />
                <div>EKK Date:</div>
                <input type="date" name="ekkDate" value={ekkDate} onChange={onChangeEkkDate} />
                <div>EKK Number:</div>
                <input type="number" name="ekkNumber" value={ekkNumber} onChange={onChangeEkkNumber} />
                <div>Quality Document Date:</div>
                <input type="date" name="qualDate" value={qualDate} onChange={onChangeQualDate} />
                <div>Quality Document Number:</div>
                <input type="number" name="qualNumber" value={qualNumber} onChange={onChangeQualNumber} />
                <div>Expertise Type:</div>
                <input type="text" name="expertiseType" value={expertiseType} onChange={onChangeExpertiseType} />
                <div>Expert Speciality:</div>
                <input type="text" name="expertSpeciality" value={expertSpeciality} onChange={onChangeExpertSpeciality} />
                <div>Location:</div>
                <input type="text" name="location" value={location} onChange={onChangeLocation} />
                <div>Email:</div>
                <input type="email" name="email" value={email} onChange={onChangeEmail} />
                <div>Phone:</div> 
                <input type="phone" name="phone" value={phone} onChange={onChangePhone} />
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
