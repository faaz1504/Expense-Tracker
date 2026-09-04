import NavBar from "./components/NavBar";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/Sign-In";
import SignUp from "./pages/Sign-Up";
import { useState } from "react";
import Footer from "./components/Footer";
import UserDashboard from "./user/UserDashboard";
import Transactions from "./user/Transactions/Transactions";
import AddTransactions from "./user/Transactions/AddTransactions";
import EditTransaction from "./user/Transactions/EditTransaction";
import UserProfile from "./user/UserProfile";


function App(){

  const [user,setUser] = useState(null);

  return(

    <div>

    <BrowserRouter>
    
    <NavBar user={user} setUser={setUser}/>

    <Routes>
       
        {/* user */}

        <Route path="/" element={<Home/>}/>

        <Route path="/user-dashboard" element={<UserDashboard/>}/>

        <Route path="/user-transactions" element={<Transactions/>}/>

        <Route path="/Add-transactions" element={<AddTransactions/>}/>

        <Route path="/Edit-transaction" element={<EditTransaction/>}/>

        <Route path="/User-Profile" element={<UserProfile/>}/>

        <Route path="/sign-in" element={<SignIn setUser={setUser}/>}/>

        <Route path="/sign-up" element={<SignUp setUser={setUser}/>}/>
        


    </Routes>

    <Footer/>
    
    </BrowserRouter>


    </div>


  )

}
export default App;