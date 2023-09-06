import { combineReducers, createStore } from "redux"; /// creating store 

//// initial states of Reducer 


const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//// reducer function 


/////
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}



/////////// then we put all reducer in store 

const store = createStore(customerReducer);







export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

 export function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Jonas Schmedtmann", "24343434"));
console.log(store.getState());
