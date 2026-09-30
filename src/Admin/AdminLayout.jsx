import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNav";
import AdminSidebar from "./AdminSidebar";

function AdminLayout(){

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