import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCountryId, getCountryName } from "../../f_redux/f_actions/actions";
require("./details.css");

function Details(props) {
  const dispath = useDispatch();
  const { id,countriesID } = props;
  console.log(props)
  useEffect(() => {
    if (id) {
      dispath(getCountryId(id))
    }
  }, []);

  if (countriesID) {
    const co = countriesID[0];
    return (
      <div>
        <h2>{co.id}</h2>
        <h2>{co.name}</h2>
        <h2>{co.continent}</h2>
        <h2>{co.cap}</h2>
        <h2>{co.area}</h2>
        <h2>{co.poblation}</h2>
        <img src={co.imgflat}/>
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
