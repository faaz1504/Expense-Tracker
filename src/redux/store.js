import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import transactionReducer from './transaction/transactionSlice'

export const store = configureStore({

    reducer:{

        auth:authReducer,

        transactions:transactionReducer

    }

})