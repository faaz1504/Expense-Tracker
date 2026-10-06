import { createSlice } from "@reduxjs/toolkit";
import LoadUser from "../utils/StorageHandle";


const savedUser = JSON.parse(localStorage.getItem("registereduser")) || [];

const authSlice = createSlice({

    name:'auth',

    initialState:{

        user:LoadUser(),

        users:savedUser

    },

    reducers:{

        register:(state,action) => {

            state.users.push(action.payload)
            localStorage.setItem("registereduser",JSON.stringify(state.users));

        },

        signIn:(state,action) =>{

            state.user = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));

        },

        

        logout:(state) => {

            state.user = null;
            localStorage.removeItem("user");

        }

    }

});

export const {register,signIn,logout} = authSlice.actions;
export default authSlice.reducer;