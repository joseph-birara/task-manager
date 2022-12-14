import { createSlice } from "@reduxjs/toolkit";
import {
    RegisterUser,
    Login,
    ResetNewPassword,
    EmailForCode,
    SendCode,
    DeleteUserAccount,
    GetProfileInfo,
    UpdateProfile,
    ChangePassword,

} from "./UserActions";


const initialState = {
    userInfo:{},
    userToken: "",
    error:'',
    loading:false,
    success:false,
    resetPasswordToken: '',
    emailForReset: '',
    codeForReset: '',
    RequestMessageForLogIn: '',
    RequestMessageForRegister: '',
    emailRejected: '',
    codeRejected: '',
    profileInfo: '',
    deleting: '',
    profileLoding:false,
}

const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers: {
        emailRejectedReset: (state) => {
            state.emailRejected =''
        },
        codeRejectedReset: (state) => {
            state.codeRejected=''
        },
        logeOutAndNullToken: (state) => {
            state.userToken=''
        },
        logInMessageNull: (state) => {
            state.RequestMessageForLogIn=''
        },
        registerMessageNull: (state) => {
            state.RequestMessageForRegister=''
        }

    },
    extraReducers:{
        //register user
        [RegisterUser.pending]:(state)=>{
            state.loading = true;
    
        },
        [RegisterUser.fulfilled]:(state,{payload})=>{
            state.userInfo=payload.data.email;
            state.userToken=payload.data.Token
            state.loading = false;            
            state.RequestMessageForRegister=''
            
                
        },
        [RegisterUser.rejected]:(state,{payload})=>{
            state.loading = false;
            state.RequestMessageForRegister = "Email is already taken"       
            
    
        },
        //login user
        [Login.pending]:(state) =>{
            state.loading = true;
           console.log("log in loading ....");
        },
        [Login.fulfilled]:(state,{payload}) =>{
            
            
            state.userInfo=payload.data.email;
            state.userToken=payload.data.Token            
            state.loading = false;
            state.RequestMessageForLogIn =''            
            console.log("token from login slice =", state.userToken);
            
        },
        [Login.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.RequestMessageForLogIn = payload
            console.log(state.RequestMessageForRegister,payload,"lo");
            
        },
        //email for reset user password
        [EmailForCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
            console.log("sent email loading .....");
        },
        [EmailForCode.fulfilled]:(state,{payload}) =>{
            
            
            state.emailForReset=payload.data.email;
            
            state.loading = false;
            state.success = true 
            
            console.log("sent email slice paylode", payload.data.email);
            state.emailRejected=''
        },
        [EmailForCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
            console.log("sent email rejected", payload);
            state.emailRejected="email not found"
        },
        //sending code to reset user password
        [SendCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [SendCode.fulfilled]:(state,{payload}) =>{
            
            
            state.resetPasswordToken=payload.token;
            
            state.loading = false;
            state.success = true //registered
            console.log("code recived inside slice", payload.token);
            state.codeRejected=''
            
        },
        [SendCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
            state.codeRejected="invalid code!"
        },
        //sending new password to reset user password
        [ ResetNewPassword.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [ResetNewPassword.fulfilled]:(state,{payload}) =>{
            
            const{resetPassword} = payload;
            state.resetPassword={resetPassword};
            
            state.loading = false;
            state.success = true //registered
            console.log("reset new password",state.userInfo);
        },
        [ResetNewPassword.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        },
         [DeleteUserAccount.pending]:(state) =>{
            state.deleting= "loading";
            state.error = null
            console.log("deleting loading ....");
        },
        [DeleteUserAccount.fulfilled]:(state,{payload}) =>{
            state.deleting="done"
            
            console.log("delete account accepted");
            
        },
        [DeleteUserAccount.rejected]:(state,{payload}) =>{
            console.log("rejected");
            state.deleting="rejected"
        },
         [GetProfileInfo.pending]:(state)=>{
            state.profileLoding = true;
             console.log("from get profile  slice loading");
    
        },
        [GetProfileInfo.fulfilled]:(state,{payload})=>{
            
            state.profileInfo=payload.data
            
            state.profileLoding = false;
            
            console.log("from profile slice accepted,=",payload.data);
            
                
        },
        [GetProfileInfo.rejected]:(state,{payload})=>{
            state.profileLoding = false            
            console.log("from profile info rejected");
           
    
        },
        [UpdateProfile.pending]:(state)=>{
            state.profileLoding = true;
             console.log("from get profile  slice loading");
    
        },
        [UpdateProfile.fulfilled]:(state,{payload})=>{           
            
            
            state.profileLoding = false;
            
            console.log("from profile slice accepted");
            
                
        },
        [UpdateProfile.rejected]:(state,{payload})=>{
            state.profileLoding = false            
            console.log("from profile info rejected");
           
    
        },
        [ChangePassword.pending]:(state)=>{
            state.loading = true;
             console.log("from get profile  slice loading");
    
        },
        [ChangePassword.fulfilled]:(state,{payload})=>{           
            
            
            state.loading = false;
            
            console.log("from profile slice accepted");
            
                
        },
        [ChangePassword.rejected]:(state,{payload})=>{
            state.loading = false            
            console.log("from profile info rejected");
           
    
        },






    }

})

export const selectCurrentUsers = (state) => state.User;
export const {emailRejectedReset,codeRejectedReset,logeOutAndNullToken, registerMessageNull, logInMessageNull} =UserSlice.actions
export default UserSlice.reducer;