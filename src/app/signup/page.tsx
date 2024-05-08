'use client'

import React, { useCallback, useState } from 'react'
import {useRegisterUser } from '../../../hooks/user'

const Page = () => {
  const {mutate} = useRegisterUser()

  const [formData , setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e: any) => {
    const {value} = e.target;
    setFormData({...formData , [e.target.name]: value});
  };

  const handleRegisterForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
       mutate({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterForm}>
        <input onChange={handleChange} value={formData.firstname} name='firstname' type="text" placeholder='firstname'/> <br />
        <input onChange={handleChange} value={formData.lastname} name='lastname' type="text" placeholder='lastname'/> <br />
        <input onChange={handleChange} value={formData.username} name='username' type="text" placeholder='username'/> <br />
        <input onChange={handleChange} value={formData.email} name='email' type="text" placeholder='email'/> <br />
        <input onChange={handleChange} value={formData.password} name='password' type="password" placeholder='password'/> <br />
        <button type='submit'>Register</button>
      </form>
      
    </div>
  )
}

export default Page