import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  allCountries,
  getCountries,
  _order,
} from "../../f_redux/f_actions/actions";

require("../f_principal/principal.css");

export default function Principal() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(allCountries());
    dispatch(getCountries());
  }, []);

  return (
    <div className="divPrincipal">
      <button
        className="button-ingresar"
        onClick={() => history.push("/home")}
      ></button>
      <h4 className="h4">BIENVENIDO</h4>
    </div>
  );
}
