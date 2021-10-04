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
    const { name } = e.target;
    if (name === "asc") {
      dispatch(_order("asc"));
    } else {
      dispatch(_order("des"));
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
            <></>
          ) : (
            <button name="ant" onClick={(e) => changePag(e)}>
              {"<<"}
            </button>
          )}
          {pag + 9 > countries.length ? (
            <></>
          ) : (
            <button name="sig" onClick={(e) => changePag(e)}>
              {">>"}
            </button>
          )}

          <button name="asc" onClick={(e) => orderCountries(e)}>
            A-Z
          </button>
          <button name="des" onClick={(e) => orderCountries(e)}>
            Z-A
          </button>
        </div>
        <div className="divRowColCountries">
          {country.map((ct) => (
            <div className="div-comp-country" key={ct.id}>
              <Link to={`/home/details/${ct.id}`}>
                <h4>{ct.name}</h4>
              </Link>
              <h4>{ct.continent}</h4>
              <Link to={`/home/details/${ct.id}`}>
                <img className="imgFlat" src={ct.imgflat} alt=""></img>
              </Link>
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
