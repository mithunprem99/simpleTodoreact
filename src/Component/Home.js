import { useQuery } from '@tanstack/react-query'
import  axios  from 'axios'
import React from 'react'

export const Home = () => {
  const { data } = useQuery(['cat'],()=>{
    return axios.get("https://catfact.ninja/fact").then((resp)=>resp.data)
    
   
  })
  return (
    <div>this is home{data?.fact}</div>
  )
}
