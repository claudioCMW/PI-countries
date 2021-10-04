import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
require("./nav.css");


export default function Nav(){

    return (<header>
           <div >
               <form onSubmit={()=>{}}>
                   <input value=""></input>
                   <button type="submit">BUSCAR</button>
               </form>

           </div>
    </header>
    )
}