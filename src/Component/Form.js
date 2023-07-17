import React from 'react'
import { useForm } from "react-hook-form"
import *  as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
export const Form = () => {
  const schema = yup.object().shape({
    fullName:yup.string().required(),
    email:yup.string().email().required(),
    age:yup.number().positive().integer().required(),
    password:yup.string().min(4).max(20).required(),
    confirm : yup.string().min(4).max(20).oneOf([yup.ref("password"),null]).required(),
  })

  const { register,handleSubmit } = useForm({
    resolver:yupResolver(schema)
  });

  const onSubmit = (data) =>{
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' placeholder='FullName' {...register("fullName")}/><br/>
        <input type='text' placeholder='Email..' {...register("email")}/><br/>
        <input type='number' placeholder='Age' {...register("age")}/><br/>
        <input type='password' placeholder='Password' {...register("password")}/><br/>
        <input type='password' placeholder='confirm Password..' {...register("confirm")}/><br/>
        <input type='submit'/>

    </form>
  )
}
