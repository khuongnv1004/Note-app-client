import React from 'react'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();

    if(!localStorage.getItem('accessToken')) {
        navigate('/login')
        return;
    }

  return (
    <Outlet/>
  )
}
