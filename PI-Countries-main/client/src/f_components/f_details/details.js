import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";

import {
  clear,
  getCountryId,
  getCountryName,
} from "../../f_redux/f_actions/actions";
import search from "../../f_img/search7.gif";
import { useHistory } from "react-router";
require("./details.css");

function Details(props) {
  const history = useHistory();
  const dispath = useDispatch();
  var { id, countriesNAME_ID } = props;

  useEffect(() => {
    return () => dispath(clear());
  }, [dispath]);

  if (countriesNAME_ID) {
    countriesNAME_ID = countriesNAME_ID.slice(0,1);
    return (
      <div className="fondo-details">
        <button
          className="button-home-details"
          onClick={() => history.push("/home")}
        ></button>
        {
          countriesNAME_ID.map(
            (elem) => {
              const {
                id,
                imgflat,
                name,
                continent,
                cap,
                area,
                poblation,
                ActTurs,
              } = elem;

              return (
                <div className="div-details-country" key={elem.id}>
                  <div className="div-left-details">
                    <img className="img-details" src={imgflat} alt="" />
                    <h2>ID:</h2>
                    <h2>{id.toUpperCase()}</h2>
                    <h2>NOMBRE:</h2>
                    <h2>{name.toUpperCase()}</h2>
                    <h2>CONTINENTE:</h2>
                    <h2>{continent.toUpperCase()}</h2>
                    <h2>CAPITAL:</h2>
                    <h2>{cap.toUpperCase()}</h2>
                    <h2>AREA:</h2>
                    <h2>{area + "Km2"}</h2>
                    <h2>POBLACIÓN:</h2>
                    <h2>{poblation}</h2>
                  </div>
                  <fieldset className="details-activity-tur">
                    <legend>
                      <h3>Actividad turistica</h3>
                    </legend>
                    {ActTurs.length > 0 ? (
                      <div>
                        {ActTurs.map((e) => (
                          <div key={e.id} className="div-activity">
                            <h2>Nombre: {e.name}</h2>
                            <h2>Dificultad: {e.difficulty}</h2>
                            <h2>Temporada: {e.season}</h2>
                            <h2>Duración: {e.duration} horas</h2>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </fieldset>
                </div>
              );
            } //map
          ) //map
        }
      </div>
    );
  } else {
    if (id.length > 3) {
      dispath(getCountryName(id));
    } else {
      dispath(getCountryId(id));
    }
    return (
      <div className="fondo-details">
        <button
          className="button-home-details"
          onClick={() => history.push("/home")}
        ></button>
        <img className="img-search-no-found" src={search} alt="" />
        <h1>NOT FOUND</h1>
      </div>
    );
  }
}

//_____________________________________________________________
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(Details);
