import React, { useState } from 'react';
import axios from '../axios';
import {useCookies} from 'react-cookie';
import {useParams} from 'react-router-dom';
import ExpertItem from './expert-item.component'
const url = 'http://localhost:8080';

export default function Search(props){
    const [experts, setExperts] = useState([]);
    const search_string = useParams().searchString;


    React.useEffect(async ()=>{
        let res = await axios.get(url + '/courtExperts');
        const result = res.data;
        let sArr = [];
        result.forEach(ex => {
            let keys = Object.keys(ex);
            for(let i of keys){
                console.log(i)
                if(ex[i] == search_string){
                    sArr.push(ex);
                    break;
                }
            }
        });
        setExperts(sArr);
    }, [])

    const wrapper = experts.map((expert)=>{
        return <ExpertItem id={expert.id} name={expert.name} secondName={expert.secondname} surname={expert.surname} 
        expertiseType={expert.expertisetype} phone={expert.phone} workplace={expert.workplace}/>
    })

    return (
        <div>
            <div>Search Info</div>
              <table class="table">
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
                    <tbody>{wrapper}</tbody>
              </table>
        </div>
    )
}