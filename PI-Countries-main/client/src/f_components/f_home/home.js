import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React from "react";
import Nav from "../f_nav/nav";
import { getCountries, _order } from "../../f_redux/f_actions/actions";
import { useState } from "react";
import img from "../../f_img/create2.png";
import search from "../../f_img/cargando2.gif";
require("./home.css");

//___________________________________________________________________
function Home({ state }) {
  var { countries } = state;
  const dispatch = useDispatch();
  var [pag, setPag] = useState(0);
  var country;
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
        dispatch(_order("cont"));
        break;
      case "area":
        dispatch(_order("area"));
        break;
      case "act":
        dispatch(_order("act"));
        break;
      case "pob":
        dispatch(_order("pob"));
        break;
      default:
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
          <button
            className={pag === 0 ? "button-disabled" : "button-sig-ant"}
            disabled={pag === 0 ? true : false}
            name="ant"
            onClick={(e) => changePag(e)}
          >
            {pag === 0 ? "" : "<<"}
          </button>
          <select
            defaultValue={"DEFAULT"}
            className="select"
            name="select"
            onChange={(e) => orderCountries(e)}
          >
            <option value="DEFAULT" disabled>
              orden
            </option>
            <option className="opciones-Select" value="asc">
              a-z
            </option>
            <option className="opciones-Select" value="des">
              z-a
            </option>
            <option className="opciones-Select" value="area">
              area
            </option>
            <option className="opciones-Select" value="act">
              actividad
            </option>
            <option className="opciones-Select" value="pob">
              población
            </option>
            <option className="opciones-Select" value="cont">
              continente
            </option>
          </select>
          <button
            className={
              pag + 9 > countries.length ? "button-disabled" : "button-sig-ant"
            }
            name="sig"
            onClick={(e) => changePag(e)}
            disabled={pag + 9 > countries.length ? true : false}
          >
            {pag + 9 > countries.length ? "" : ">>"}
          </button>
        </div>
        <div className="divRowColCountries">
          {country.map((ct) => (
            <div key={ct.id} className="div-comp-country">
              <Link to={`/home/details/${ct.id}`}>
                <img className="imgFlat" src={ct.imgflat} alt=""></img>
              </Link>
              <Link className="link-home" to={`/home/details/${ct.id}`}>
                <h4>{`Nombre: ${ct.name.toUpperCase()}`}</h4>
              </Link>
              <h4>{`Continente: ${ct.continent.toUpperCase()}`}</h4>
              {ct.ActTurs.length > 0 ? (
                <img className="country-mas-act" src={img} alt="" />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    dispatch(getCountries());
    return (
      <div className="fondo-details">
        <img className="img-search-no-found" src={search} alt="" />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {})(Home);
