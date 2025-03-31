import React, { useState } from "react";
import Navbar from "./navbar";
import Home from "./home"
import Footer from "./footer";


function Main() {
   
 const [menu, setMenu]=useState("");
    return (
        <div className="grid grid-row-2">
            <Navbar setMenu={setMenu}/>
            <Home  menu={menu}/> 
            <Footer /> 
        </div>
    )
}
export default Main;