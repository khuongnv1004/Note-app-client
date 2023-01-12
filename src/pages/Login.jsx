import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export default function Login() {

    const auth = getAuth();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const handleLoginWithGoogle = async ()=>{
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
    }

    if(user?.uid){
        navigate('/home')
        return;
    }
  return (
    <>

        <Typography variant='h5' sx={{marginBottom:'10px'}}>Note App</Typography>
        <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  )
}
