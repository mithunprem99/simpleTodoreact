import React, { useState } from 'react'
import Axios from 'axios';
export const Excuse = () => {
    const [party,setPartyExcuse] = useState({})
    const [family,setFamilyExcuse] = useState({})
    
    const [office,setofficeExcuse] = useState({})
    

    const handleParty =()=>{
        Axios.get("https://excuser-three.vercel.app/v1/excuse/party/").then((resp)=>{
            console.log(resp.data)
            setPartyExcuse(resp.data[0])
        })
    }
    const handleFamily =()=>{
        Axios.get("https://excuser-three.vercel.app/v1/excuse/family/").then((resp)=>{
            console.log(resp.data)
            setFamilyExcuse(resp.data[0])
        })
    }
  const handleOffice =()=>{
        Axios.get("https://excuser-three.vercel.app/v1/excuse/office/").then((resp)=>{
            console.log(resp.data)
            setofficeExcuse(resp.data[0])
        })
    }
  return (
    <div className='excuse_predict'>
    <button onClick={handleParty}>Party</button>
    <p>{party.excuse}</p>
    <button onClick={handleFamily}>Family</button>
    <p>{family.excuse}</p>
    <button onClick={handleOffice}>Office</button> 
     <p>{office.excuse}</p>
    
    </div>
    
  )
}
