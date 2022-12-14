import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {ResetNewPassword} from './UserActions';
import {  useNavigate, } from 'react-router-dom';
import Icons from '../../Assets/IconCollection/Icons';
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner';
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';


function NewPassword() {
    const [error, setError] = useState(null);
  const userref = useRef();
  const {languageChange }=useSelector(selectCurrentTasks)
  
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { resetPasswordToken,emailForReset,loading } = useSelector(selectCurrentUsers);
  const navigate = useNavigate();
  const [showAndHide, setshowAndHide] = useState(false);
  const resultForNewPassword = async () => {
  console.log(emailForReset,"email inside new password");
    const resultAction = await dispatch(ResetNewPassword({ password:password ,email:emailForReset,token:resetPasswordToken }))
    const promiseResult = unwrapResult(resultAction)
    if (promiseResult) {
       navigate('/login')
    }
    else {
      setError('enter password again')
    }

     
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 chars long');
    }
    if (password !== confirmPassword) {
      setError('pass word does not match')
    }
    if (!error) {
        
      if (password && confirmPassword) {
        resultForNewPassword()
       
      }
        
    }
  }
    

    useEffect(() => {
        userref.current.focus();
    }, []) 
 if (loading) {
  return <LoadingSpiner/>
}
  return (
    <div className='flex flex-col m-16 items-center gap-2'>
          <img  src={TooDoo_logo} alt='logo' className='mt-16 h-14 mb-8' />
          <h1 className='text-center text-3xl font-black'>
              TooDoo
          </h1>
          <h3 className='mt-12 text-2xl mb-4 font-medium'>
             {languageChange?translate.creatNewpassword.eng:translate.creatNewpassword.tg}
      </h3>
      {
        error ? <div className='errorMessag'>
         { error}
        </div> :
          ''
      }
         
          <form className="m-2 flex flex-col gap-4 text-center items-center">
        
        <div
          className='relative'>
           <input
                 ref = {userref}
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                   type={showAndHide ===false? "password":"text"}
                  name="email"
                  id="email"
                  placeholder={languageChange?translate.newPassword:translate.newPassword.tg}
                  className="inputBox"
                  onClick={(e) =>setError('')}
        />
        <div onClick={() => {
            setshowAndHide(!showAndHide)
            console.log(showAndHide)
          }}>
{ showAndHide ?<IconsVisiblel/>:<Icons />}
          </div>
          </div>
         <input
                 ref = {userref}
                  required
                  value={confirmPassword}
                 onChange={e => setconfirmPassword(e.target.value)}
                  type="password"
                  name="email"
                  id="email"
                  placeholder={languageChange?translate.cpassword.eng:translate.cpassword.tg}

          className="inputBox"
          onClick={(e) =>setError('')}
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!password || !confirmPassword ||password !== confirmPassword}
                 onClick={handleSubmit}
                  type="button" className=" btn mt-10">
          { languageChange?translate.save.eng:translate.save.tg}</button>
        
             
              </form>
      </div>
  )
}

export default NewPassword