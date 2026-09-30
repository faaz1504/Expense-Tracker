import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavBar";
import Footer from "./Footer";

function PublicLayout(){

    return(
        
        <div>

        <PublicNavbar/>

        <Outlet/>

        <Footer/>

        </div>

    )

}
export default PublicLayout;