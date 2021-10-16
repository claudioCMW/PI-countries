import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Nav from "../f_nav/nav";
import { getCountries } from "../../f_redux/f_actions/actions";
import React, { useState, useEffect } from "react";
import img from "../../f_img/create2.png";
import search from "../../f_img/cargando2.gif";
import search2 from "../../f_img/search7.gif";
import { ordenamiento } from "./logica";
import { useHistory } from "react-router";
require("./home.css");

//___________________________________________________________________
function Home({ state }) {
  const dispatch = useDispatch();
  const history = useHistory();
  var { countries } = state;
  var [pag, setPag] = useState(0);
  var [country, setCon] = useState([]); //copia para ser  modificada
  var coun;
  //______________________________________________________
  function changePag(e) {
    const { name } = e.target;
    if (name === "sig") {
      setPag(pag + 9);
    } else {
      setPag(pag - 9);
    }
  }
  //____________________________________reseteo pag por cada ordenamiento
  useEffect(() => {
    setPag(0);
  }, [country]);

  //_________________________________________________________
  function orderCountries(e) {
    const { value } = e.target;

    switch (value) {
      case "asc":
        setCon(ordenamiento(countries, "asc"));
        break;
      case "des":
        setCon(ordenamiento(countries, "des"));
        break;
      case "cont":
        setCon(ordenamiento(countries, "cont"));
        break;
      case "area":
        setCon(ordenamiento(countries, "area"));
        break;
      case "act":
        var actividades = ordenamiento(countries, "act");

        if (actividades.length > 0) {
          console.log("TIENE");
          setCon(actividades);
        } else {
          setCon("none");
        }
        break;
      case "pob":
        setCon(ordenamiento(countries, "pob"));
        break;
      default:
        break;
    }
  }
  //__________________________________________________________orden abecedario
  function abeced(charac) {
    setCon(ordenamiento(countries, "9" + charac));
  }

  //___________________________________________________________
  if (countries) {
    if (country.length) {
      if (country !== "none") {
        coun = country.slice(pag, pag + 9);
      } else {
        return (
          <div className="fondo-details">
            <button
              className="button-home-details"
              onClick={() => setCon(ordenamiento(countries, "asc"))}
            ></button>
            <img className="img-search-no-found" src={search2} alt="" />
            <h1>NOT FOUND ACTIVITIES</h1>
          </div>
        );
      }
    } else {
      setCon(countries.map((e) => e));
      coun = country.slice(pag, pag + 9);
    }

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
              actividades
            </option>
          </select>
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
              asc
            </option>
            <option className="opciones-Select" value="des">
              des
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
              pag + 9 >= country.length ? "button-disabled" : "button-sig-ant"
            }
            name="sig"
            onClick={(e) => changePag(e)}
            disabled={pag + 9 > country.length ? true : false}
          >
            {pag + 9 >= country.length ? "" : ">>"}
          </button>
        </div>
        <div className="container-card">
          <div className="divRowColCountries">
            {coun.map((ct) => (
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
          <div className="div-abc">
            <Abc str="A"></Abc>
            <Abc str="B"></Abc>
            <Abc str="C"></Abc>
            <Abc str="D"></Abc>
            <Abc str="E"></Abc>
            <Abc str="F"></Abc>
            <Abc str="G"></Abc>
            <Abc str="H"></Abc>
            <Abc str="I"></Abc>
            <Abc str="J"></Abc>
            <Abc str="K"></Abc>
            <Abc str="L"></Abc>
            <Abc str="M"></Abc>
            <Abc str="N"></Abc>
            <Abc str="O"></Abc>
            <Abc str="P"></Abc>
            <Abc str="Q"></Abc>
            <Abc str="R"></Abc>
            <Abc str="S"></Abc>
            <Abc str="t"></Abc>
            <Abc str="U"></Abc>
            <Abc str="V"></Abc>
            <Abc str="W"></Abc>
            <Abc str="X"></Abc>
            <Abc str="Y"></Abc>
            <Abc str="Z"></Abc>
          </div>
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
  //__________________________________________________________________________componente abc
  function Abc(props) {
    const { str } = props;
    return (
      <button
        className="button-abc"
        onClick={() => {
          abeced(str.toLowerCase());
        }}
      >
        <h2 className="h2-button-abc">{str}</h2>
      </button>
    );
  }
}
//____________________________________________________
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {})(Home);
