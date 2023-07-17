import { useQuery } from '@tanstack/react-query'
import  axios  from 'axios'
import React from 'react'

export const Home = () => {
  const { data,isLoading,refetch } = useQuery(['cat'],()=>{
    return axios.get("https://catfact.ninja/fact").then((resp)=>resp.data)
    
   
  })
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <div>this is home{data?.fact}
    <button onClick={refetch}>update</button>
    </div> 
  )
}
