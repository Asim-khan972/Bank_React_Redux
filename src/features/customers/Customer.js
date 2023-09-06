import { useSelector } from "react-redux";

function Customer() {
  const customer1 = useSelector((store)=>store.customer)
// console.log(customer1)
  return(
  <>
  <h1>👋 Welcome, {customer1.fullName} </h1>;
  <h1></h1>
  </>)

}

export default Customer;
