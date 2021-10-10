import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";

import {
  clear,
  getCountries,
  getCountryId,
  getCountryName,
} from "../../f_redux/f_actions/actions";
import search from "../../f_img/search gif.gif";
import { useHistory } from "react-router";
require("./details.css");

function Details(props) {
  const history = useHistory();
  const dispath = useDispatch();
  const { id, countriesNAME_ID } = props;

  useEffect(() => {
    if (id.length > 3) {
      dispath(getCountryName(id));
    } else {
      dispath(getCountryId(id));
    }
  }, []);

  useEffect(() => {
    return () =>  history.push("/home");
     
   
  }, []);

  if (countriesNAME_ID) {
    return (
      <div className="fondo-details">
        <button
          className="button-home-details"
          onClick={() => {
            history.push("/home");
          }}
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
                    <h2>{id}</h2>
                    <h2>NOMBRE:</h2>
                    <h2>{name}</h2>
                    <h2>CONTINENTE:</h2>
                    <h2>{continent}</h2>
                    <h2>CAPITAL:</h2>
                    <h2>{cap}</h2>
                    <h2>AREA:</h2>
                    <h2>{area}</h2>
                    <h2>POBLACION:</h2>
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
                            <h2>Duración: {e.duration}</h2>
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
    return (
      <div>
        <img src={search} alt="" />
        <button className="button-home"></button>
      </div>
    );
  }
}

//_____________________________________________________________
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(Details);
