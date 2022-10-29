import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateTask } from './TaskActions'

function AddTask() {
    const [state, setState] = useState({
        catagory: 'Others',
        duration: '',
        priority: 1,
      dateTime: new Date(),
      status: 'Upcoming',
      note: '',
      title: '',
      reminder:'30 mins'
        
        
        
    })
  const {userToken} = useSelector(selectCurrentUsers)
  const dispatch = useDispatch()
  const { title, note, dateTime, duration, category, priority, reminder } = state
  const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
    dispatch(CreateTask({title,note,dateTime,duration,category,priority,reminder,userToken}))
  }
    
    
  return (
      <div className=''>
      <form className='flex flex-col gap-2 w-32 m-10'>
         <input
                 
                  required
                  value={state.title}
                 onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title of the task "
          className="inputBox"
          
        />
        <textarea
                 
                  required
                  value={state.note}
                 onChange={handleChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="note of the task "
          className="inputBox"
          
        />
        <input
                 
                  required
                  value={state.duration}
                 onChange={handleChange}
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="duration of the task "
          className="inputBox"
          
        />
        <select
          name='category'
          onChange={handleChange}>
          <option>
            Others
          </option>

          <option >
            Family
          </option>
          
          <option>
            Work
          </option>
          <option>
            Education
          </option>
          <option>
            Shoping
          </option>
        </select>
        <select
          name='priority'
          onChange={handleChange}>
          <option>
            1
          </option>

          <option >
            2
          </option>
          
          <option>
            3
          </option>
          <option>
           4
          </option>
          <option>
            5
          </option>
        </select>
        <select
          name='reminder'
          onChange={handleChange}>
          <option >
            15 mins
          </option>
          <option>
            30 mins
          </option>         
          
          <option>
            1 hrs
          </option>
          <option>
           2 hrs
          </option>
        </select>
        <input
                 
                  required
                  value={state.dateTime}
          onChange={handleChange}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                  placeholder="dateTime of the task "
          className="inputBox"
          
        />
        
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                  // disabled = {!email || password.length<8}
                 onClick={handleSubmit}
                  type="button" className=" btn mt-10">
                  Save Task</button>
        
        </form>
    </div>
  )
}

export default AddTask