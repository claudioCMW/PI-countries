import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { allCountries } from "../../f_redux/f_actions/actions";
import { Link } from "react-router-dom";
require("../f_principal/principal.css");

export default function Principal() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() =>  dispatch(allCountries())
  ,[dispatch]);
  
  return (
    <div className="divPrincipal">
      <button
        className="button-ingresar"
        onClick={() => history.push("/home")}
      ></button>
      <Link className="Link" to="/home">
      <h4 className="h4">BIENVENIDO</h4>
      </Link>
    </div>
  );
}
