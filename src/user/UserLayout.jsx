import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavBar";
import Footer from "../components/Footer";

function UserLayout(){

    return(

        <div>

        <UserNavbar/>
        <Outlet/>
        <Footer/>

        </div>

    )

}
export default UserLayout;