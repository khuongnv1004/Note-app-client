import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { graphqlRequest } from '../utils/request';


export default function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const handleLoginWithGoogle = async ()=>{
        const provider = new GoogleAuthProvider();

       const {user:{uid, displayName}} =  await signInWithPopup(auth, provider)

       const data =  await graphqlRequest({query: `mutation register($uid: String!, $name: String!){
          register(uid: $uid, name:$name ){
            uid
            name
          }
        }`, variables:{uid, name:displayName}})

    }

    if(localStorage.getItem("accessToken")){
        return <Navigate to="/"/>;
    } 
  return (
    <>
        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', mt:'100px'}}>
        <Typography variant='h5' sx={{marginBottom:'10px'}}>Note App</Typography>
        <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
        </Box>
    </>
  )
}
