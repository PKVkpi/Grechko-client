import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from '../axios';
const url = 'http://localhost:8080';

export default function Expert(props){
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
    const [cookies, setCookie] = useCookies();
    const id = useParams().id;


    React.useEffect(async ()=>{
        let res = await axios.get(url + '/courtExperts/' + id);
        const e = res.data[0];
        console.log(e);
        setName(e.name);
        setSecondName(e.secondname);
        setSurname(e.surname);
        setEkkName(e.ekkname);
        setEkkDate(e.ekkdate);
        setEkkNumber(e.ekknumber);
        setQualDate(e.qualdate);
        setQualNumber(e.qualnumber);
        setExpertiseType(e.expertisetype);
        setExpertSpeciality(e.expertisespeciality);
        setLocation(e.location);
        setEmail(e.email);
        setPhone(e.phone);
        res = await axios.get(url + '/positions/' + e.workplaceid);
        console.log(res.data[0].name)
        setWorkplace(res.data[0].name);
    }, [])


    return (         
        <div>
            <h2>Expert Info</h2>
            <div>Name : {name}</div>
            <div>SecondName : {secondName}</div>
            <div>Surname : {surname}</div>
            <div>EkkName : {ekkName}</div>
            <div>EkkDate : {ekkDate}</div>
            <div>EkkNumber : {ekkNumber}</div>
            <div>QualDate : {qualDate}</div>
            <div>QualNumber : {qualNumber}</div>
            <div>Expertise Type : {expertiseType}</div>
            <div>Expert Speciality : {expertSpeciality}</div>
            <div>Location : {location}</div>
            <div>E-mail : {email}</div>
            <div>Phone : {phone}</div>
            <div>Workplace : {workplace}</div>
            {cookies['id'] ? 
                <button className="btn btn-dark" onClick={async () => {
                    try{
                      props.history.push("/experts/" + id +  "/update");
                    }
                    catch{
                      console.log("Not logged in here");
                    }
                }}>Update
                </button> :
                <div></div>}
        </div>

    )
}