import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";



export default function AdminMaster(){
   
    return(
        <>
        <div className=''>
      <Header />
      <SideBar >
      <Outlet/>
      </SideBar>
      
    </div>
        </>
    )
}

