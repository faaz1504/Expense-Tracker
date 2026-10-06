// import NavBar from "./components/NavBar";
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
import UserLayout from "./user/UserLayout";
import AdminLayout from "./Admin/AdminLayout";
import AdminSidebar from "./Admin/AdminSidebar";
import AdminNavbar from "./Admin/AdminNav";
import AdminDashboard from "./Admin/AdminDashboard";
import PublicLayout from "./components/PublicLayout";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";


function App(){

  // const [user,setUser] = useState(null);

  return(

    <div>

    <BrowserRouter>
    
    

    <Routes>
       
        {/* Public section */}

        <Route element={<PublicLayout/>}>

        <Route path="/" element={<Home/>}/>

        <Route path="/sign-in" element={<SignIn/>}/>

        <Route path="/sign-up" element={<SignUp/>}/>

        <Route path="/About" element={<About/>}/>

        </Route>

        

        {/* User Section */}

        <Route  element={<UserLayout/>}>

        

        <Route path="/user-dashboard" element={<UserDashboard/>}/>

        <Route path="/user-transactions" element={<Transactions/>}/>

        <Route path="/Add-transactions" element={<AddTransactions/>}/>

        <Route path="/edit-transaction/:id" element={<EditTransaction/>}/>

        <Route path="/User-Profile" element={<UserProfile/>}/>

       

        </Route>    

        {/* Admin Section */}

        <Route  element={<AdminLayout/>}>

          <Route path="/AdminSidebar" element={<AdminSidebar/>}/>

          <Route path="/AdminNavbar" element={<AdminNavbar/>}/>

          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>




        </Route>

      <Route path="*" element={<PageNotFound/>}/>
    </Routes>

    
    
    </BrowserRouter>


    </div>


  )

}
export default App;