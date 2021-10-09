import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Nav from "../f_nav/nav";
import { getCountries, _order } from "../../f_redux/f_actions/actions";
import { useState } from "react";
require("./home.css");

//___________________________________________________________________
function Home({ state }) {
  var { countries } = state;
  const dispatch = useDispatch();
  var [pag, setPag] = useState(0);
  var country;
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  //______________________________________________________
  function changePag(e) {
    const { name } = e.target;

    if (name === "sig") {
      setPag(pag + 9);
    } else {
      setPag(pag - 9);
    }
  }
  //_________________________________________________________
  function orderCountries(e) {
    const { value } = e.target;

    switch (value) {
      case "asc":
        dispatch(_order("asc"));
        break;
      case "des":
        dispatch(_order("des"));
        break;
      case "cont":
        break;
      case "area":
        break;
      case "act":
        break;
    }
  }

  //___________________________________________________________
  if (countries) {
    country = countries.slice(pag, pag + 9);
    return (
      <div className="homeDiv">
        <Nav></Nav>
        <div className="divButtonsPage">
          {pag === 0 ? (
            <button hidden={true}></button>
          ) : (
            <button
              className="button-sig-ant"
              name="ant"
              onClick={(e) => changePag(e)}
            >
              {"<<"}
            </button>
          )}
          {pag + 9 > countries.length ? (
            <button hidden={true}></button>
          ) : (
            <button
              className="button-sig-ant"
              name="sig"
              onClick={(e) => changePag(e)}
            >
              {">>"}
            </button>
          )}

          <select
            className="select"
            name="select"
            onChange={(e) => orderCountries(e)}
          >
            <option disabled selected>
              orden
            </option>
            <option className="opciones-Select" value="asc">
              a-z
            </option>
            <option className="opciones-Select" value="des">
              z-a
            </option>
            <option className="opciones-Select" value="cont">
              continente
            </option>
            <option className="opciones-Select" value="actividad">
              actividad
            </option>
          </select>
        </div>
        <div className="divRowColCountries">
          {country.map((ct) => (
            <div key={ct.id} className="div-comp-country">
              <Link to={`/home/details/${ct.id}`}>
                <img className="imgFlat" src={ct.imgflat} alt=""></img>
              </Link>
              <Link className="link-home" to={`/home/details/${ct.id}`}>
                <h4>{`Name:${ct.name.toUpperCase()}`}</h4>
              </Link>
              <h4>{`Continente:${ct.continent.toUpperCase()}`}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="homeDiv">
        <Nav></Nav>
        <h4>cargando</h4>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {})(Home);
