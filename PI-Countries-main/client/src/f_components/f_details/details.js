import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCountryId, getCountryName } from "../../f_redux/f_actions/actions";
require("./details.css");

function Details(props) {
  const dispath = useDispatch();
  const { id, countriesID } = props;
  console.log(props);
  useEffect(() => {
    if (id) {
      dispath(getCountryId(id));
    }
  }, []);

  if (countriesID) {
    const { id, imgflat, name, continent, cap, area, poblation, ActTurs } =
      countriesID[0];

    console.log(ActTurs);
    if (ActTurs.length > 0) {
      const { name,difficulty, season, duration } = ActTurs[0];
      const nam =name ;
    }
    return (
      <div>
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
  } else {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
}

//_____________________________________________________________
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(Details);
