import { createSlice } from "@reduxjs/toolkit";
import { GetAllTasks } from "./TaskActions";
const initialState = {
    tasks: '',
    loading:false,
    success:false,
    error: null,
}
const TasksSlice = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {},
    extraReducers: {
        //get all tasks
        [GetAllTasks.pending]:(state)=>{
            state.loading = true;
    
        },
        [GetAllTasks.fulfilled]:(state,{payload})=>{
            state.tasks = payload;
            
            state.loading = false;
            state.success = true;
            console.log("succes signup",state.success);
                
        },
        [GetAllTasks.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log(payload);
    
        },

    }
})


export const selectCurrentTasks = state => state.Tasks
export default TasksSlice.reducer