import React from 'react'
import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import  Spinner from '../Spinner'
import { useAuth } from '../context/Auth'
import axios from 'axios'

export default function Private () {

    const [ok,setok]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get("http://localhost:8080/api/v1/auth/user-auth")
            if(res.data.ok){
                setok(true)
            }else{
                setok(false)
            }

        }
        if(auth?.token) authCheck()
    },[auth?.token])
  return ok ? <Outlet/> : <Spinner/> 
 
}

