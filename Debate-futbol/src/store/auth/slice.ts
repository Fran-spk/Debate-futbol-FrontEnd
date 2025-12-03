import { authService } from "../../services/authServices";
import type { user } from "../../types/user";
import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthState{
    User: user | null
}

const initialState: AuthState = {
    User : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.User = null;
            authService.logout();
        },
        login:(state, action: PayloadAction<user>)=>{
            state.User = action.payload;
        },
    },
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer