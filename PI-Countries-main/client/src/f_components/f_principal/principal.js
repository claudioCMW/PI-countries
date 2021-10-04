import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allCountries } from "../../f_redux/f_actions/actions";

export default function Principal() {
const dispatch=useDispatch();
useEffect(()=>{
     dispatch(allCountries())
},[])

  return (
    <div>
      <h3>principal</h3>
    </div>
  );
}
