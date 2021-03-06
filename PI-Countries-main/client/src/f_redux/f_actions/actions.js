import Enum from "../../Enumeradores";
import axios from "axios";
const _enum = new Enum();

//_____________________________________________________________________GET
export function getCountries() {
  return async function (dispatch) {
    try {
      const result = await axios.get("http://localhost:3001/countries");
      var countries = result.data;
      if (countries.length === 0) {
        countries = null;
      }
      return dispatch({ type: _enum.GET_COUNTRIES, payload: countries });
    } catch (e) {
      console.log(e);
    }
  };
}

//___________________________________________________________________
export function addActi(activity) {
  return async () => {
    try {
      return await axios.post("http://localhost:3001/activity", activity);
    } catch (err) {
      return new Error(err);
    }
  };
}
//_________________________________________________________________________________GET ID
export function getCountryId(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/countries/${id}`);
      if (resp.data.length > 0) {
        return dispatch({ type: _enum.GET_COUNTRY_ID, payload: resp.data });
      } else {
        return dispatch({ type: _enum.GET_COUNTRY_ID, payload: null });
      }
    } catch (e) {
      return new Error(e);
    }
  };
}

//_________________________________________________________________________________GET NAME
export function getCountryName(name) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `http://localhost:3001/Countries?name=${name}`
      );
      if (resp.data.length > 0) {
        return dispatch({ type: _enum.GET_COUNTRY_NAME, payload: resp.data });
      } else {
        return dispatch({ type: _enum.GET_COUNTRY_NAME, payload: null });
      }
    } catch (e) {
      return new Error(e);
    }
  };
}
//________________________________________________________________________________________clear
export function clear() {
  return {
    type: _enum.CLEAR,
    payload: null,
  };
}
//_______________________________________________________________________________________all Countries
export function allCountries() {
  return async function () {
    try {
      await axios.get("http://localhost:3001/allCountries");
    } catch (e) {
      return new Error(e);
    }
  };
}
