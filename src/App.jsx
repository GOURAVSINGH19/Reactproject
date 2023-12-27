import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './Store.js/authSlice';
import Footer from './Component/Footer/Footer'
import { Outlet } from 'react-router-dom';
import Header from './Component/Header/Header';

function App() {
  const[loading,setloading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(login({userdata}));
      }
      else{
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    })
    .finally(()=>{
      setloading(false);
    })
  },[])


  return (
    <div>
      <div>
         {!loading ? (
          <div className='min-h-sc flex-wrap flex bg-slate-600'> 
          <div className='w-full block'>
            <Header />
            <h1>helllo</h1>
            <div>
              <Outlet/>
            </div>
            <Footer/>
          </div>
          </div>
         ):null}
      </div>
    </div>
  )
}

export default App
