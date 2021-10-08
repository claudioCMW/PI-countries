import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { allCountries } from "../../f_redux/f_actions/actions";
import img from "../../f_img/fondo2kPaises.jpg";
require("../f_principal/principal.css")

export default function Principal() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(allCountries());
  }, []);

  return (
    <div className="divPrincipal">
      <button onClick={() => history.push("/home")}>ENTRAR</button>
    </div>
  );
}
