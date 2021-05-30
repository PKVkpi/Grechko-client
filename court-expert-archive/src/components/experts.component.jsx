import React, { useState } from 'react';
import axios from '../axios';
import ExpertItem from './expert-item.component'
const url = 'http://localhost:8080';

export default function Experts(props){
    const [experts, setExperts] = useState([]);

    React.useEffect(async ()=>{
        let res = await axios.get(url + '/courtExperts');
        const expArr = res.data;

        const arr = expArr.map((expert)=>{

            return(<ExpertItem id={expert.id} name={expert.name} secondName={expert.secondname} surname={expert.surname} 
                    expertiseType={expert.expertisetype} phone={expert.phone} workplace={expert.workplace}/>);
        });
        console.log(arr);
        setExperts(arr);
    }, [])

    return (
        <div>
            <div>Court Experts</div>
              <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SecondName</th>
                            <th>Surname</th>
                            <th>Expertise Type</th>
                            <th>Phone</th>
                            <th>Workplace</th>
                        </tr>
                    </thead>
                    <tbody>{experts}</tbody>
              </table>
        </div>
    )
}