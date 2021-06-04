import React, { useState } from 'react';

export default function ExpertItem(props){
    return (
        <tr>
            <td><a href={'http://localhost:3000/experts/' + props.id}>{props.name}</a></td>
            <td>{props.secondName}</td>
            <td>{props.surname}</td>
            <td>{props.phone}</td>
        </tr>
    )
}