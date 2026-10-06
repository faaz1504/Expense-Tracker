import { Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNav";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";

function AdminLayout(){

    const user = useSelector(
        (state) => state.auth.user
    )

    if(!user){
        return <Navigate to="/sign-in"/> 
    }

    if(user.role !== "admin"){
        return <Navigate to="/AdminDashboard"/>
    }
    return(

        <div>

            <AdminNavbar/>
            <AdminSidebar/>

            <div
        style={{
          marginLeft: "250px",
          padding: "30px"
        }}
      >
        <Outlet/>
        {/* <h1>Admin Dashboard</h1>

        <p>Welcome Admin</p> */}
      </div>


        </div>

    )

}
export default AdminLayout;