import { createSlice } from "@reduxjs/toolkit";

const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

const transactionSlice = createSlice({

    name:"transactions",

    initialState:{

        transactions:savedTransactions

    },

    reducers:{

        addTransaction:(state,action) =>{
            
            state.transactions.push(action.payload);

            localStorage.setItem(
                "transactions",JSON.stringify(state.transactions))

        },

    

    deleteTransaction:(state,action) =>{

        state.transactions = state.transactions.filter(
            (transaction) => transaction.id !== action.payload
        );

        localStorage.setItem(
                "transactions",JSON.stringify(state.transactions))  

        
    },

    updateTransaction:(state,action) =>{

        const index = state.transactions.findIndex(
            (transaction) => transaction.id === action.payload.id
        );
        
        if(index !== -1){

            state.transactions[index] = action.payload;

            localStorage.setItem(
                "transactions",JSON.stringify(state.transactions))

        }

    }

}

});

export const {addTransaction,deleteTransaction,updateTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;