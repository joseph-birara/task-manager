import React, { useEffect } from 'react'
import { RiHome2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import NotificationIcone from '../../Assets/IconCollection/NotificationIcone'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import { GetAllNotifications } from '../tasks/TaskActions'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import { selectCurrentUsers } from '../user/userSlice'
import NotificationCard from './NotificationCard'
import homeImage from '../../Assets/AcountIcons/home.svg'
import translate from '../../Assets/translationLanguga'





const NotificationPage = () => {
    const {languageChange} = useSelector(selectCurrentTasks)

  const dispatch = useDispatch()
  const { userToken } = useSelector(selectCurrentUsers)
  const {notifications} =useSelector(selectCurrentTasks)

  useEffect(() => {
    dispatch(GetAllNotifications({userToken}))
   
  }, [dispatch,userToken])
  
   return (
      <div className='  lg:mt-1  lg:ml-10 lg:mr-12 overflow-hidden'>
      <div className='flex justify-between mr-10 sm:mr-5 lg:ml-20 lg:mr-24 '>
                <div className='mt-7 md:ml-10'>
                    
                   
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          
             
                    <div className='flex flex-col gap-1 mt-11'>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
             className='iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-1 w-[45px] h-[45px]'>
              <Link to='/'>
              <img src={homeImage}  alt='home' className='text-white text-xl text-center -mt-[7px] px-1 w-12 h-8'/>
            
            </Link>
                        
                
                        </div>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                        className='iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-1 w-[45px] h-[45px]'>
             <Link to='/account'>
               <AccountIcon/>
             </Link>  
                
              </div>

                   
                    
              
              
          </div>
          
            </div>
            <div className='text-center text-xl font-black -mt-18 -ml-32 md:-ml-0 lg:-ml-0'>
         {
           languageChange?translate.notifications.eng:translate.notifications.tg
                }
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
           {
           notifications && notifications.length>0? notifications.map(((notify,index) => <NotificationCard status={notify.status} title={notify.title} _id={notify._id} key={index} />)):languageChange?translate.noNotifications.eng:translate.noNotifications.tg
           
                    }
                    
           
                    
            </div>

            </div>
            
            
            
            </div>
  )
}

export default NotificationPage