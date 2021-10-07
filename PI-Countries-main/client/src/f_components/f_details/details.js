import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";

import {
  getCountryId,
  getCountryName,
} from "../../f_redux/f_actions/actions";
import search from "../../f_img/search gif.gif";
require("./details.css");

function Details(props) {
  const dispath = useDispatch();
  const { id, countriesNAME_ID } = props;
  useEffect(() => {

    if (id.length > 3) {
      dispath(getCountryName(id));
    } else {
      dispath(getCountryId(id));
    }
  }, []);

  if (countriesNAME_ID) {
    return (
      <div>
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
                <div key={elem.id}>
                  <h2>{id}</h2>
                  <h2>{name}</h2>
                  <h2>{continent}</h2>
                  <h2>{cap}</h2>
                  <h2>{area}</h2>
                  <h2>{poblation}</h2>
                  <h2>{}</h2>
                  <img src={imgflat} />
                  {ActTurs.length > 0 ? (
                    <div>
                      <h3>Actividad turistica</h3>
                      <h1>{ActTurs[0].difficulty}</h1>
                      <h1>{ActTurs[0].season}</h1>
                      <h1>{ActTurs[0].duration}</h1>
                      <h1>{ActTurs[0].name}</h1>
                    </div>
                  ) : (
                    <></>
                  )}
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
      </div>
    );
  }
}

//_____________________________________________________________
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(Details);
