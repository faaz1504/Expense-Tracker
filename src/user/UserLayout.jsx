import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavBar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function UserLayout(){

    const user = useSelector(
        (state) => state.auth.user
    )

    if(!user){
        return <Navigate to="/sign-in"/> 
    }

    if(user.role !== "user"){
        return <Navigate to="/user-dashboard"/>
    }

    return(

        <div>

        <UserNavbar/>
        <Outlet/>
        <Footer/>

        </div>

    )

}
export default UserLayout;