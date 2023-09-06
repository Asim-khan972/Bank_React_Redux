
//// initial states of Reducer 
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading :false
};


//// reducer function 

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload , isLoading : false  };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
      case "amount/convertingCurrency" : return {
        ...state , isLoading : true
      }

    default:
      return state;
  }
}




//// these are action handler which we used to perform task 

export function deposit(amount , currency) {
   
  if (currency === "USD") return { type: "account/deposit", payload: amount };

    return async function(dispatch , getState){
        dispatch({type : "amount/convertingCurrency"})

     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        //  console.log(res)
     const data = await res.json()
    //  console.log(data)
     const converted = data.rates.USD;
        dispatch({ type: "account/deposit", payload: converted });
    }
}

 export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

 export function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// console.log(store.getState());

// store.dispatch(requestLoan(1000, "Buy a cheap car"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());





















// const accountSlice = createSlice({
//     name :"account", 
//     initialStateAccount , 
//     reducers : {
//         deposit(state , action){
//             state.balance+=action.payload
//         },  withdraw(state , action){
//             state.balance-=action.payload
//         }, requestLoan(state , action){
//             if(state.loan >0) return ;
//           state.loan = action.payload.amount;
//           state.loanPurpose= action.payload.purpose; 
//           state.balance = state.balance + action.payload.amount;
//         },
//         payLoan(state , action){
//             state.loan = 0 ;
//             state.loanPurpose="";
//             state.balance -= state.loan
//         }

//     }
// })
// export const {deposit , withdraw , requestLoan , payLoan}  = accountSlice.actions;

// export default accountSlice.reducer;