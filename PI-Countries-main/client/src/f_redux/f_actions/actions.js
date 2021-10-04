import Enum from "../../Enumeradores";
import axios from "axios";
const _enum = new Enum();
//___________________________________________________________________order asc
export function _order(arg) {
  return { type: _enum.ORDER, payload: arg };
}

//_____________________________________________________________________GET
export function getCountries() {
  return async function (dispatch) {
    try {
      const result = await axios.get("http://localhost:3001/Countries");
      const countries = result.data;
      return dispatch({ type: _enum.GET_COUNTRIES, payload: countries });
    } catch (e) {
      console.log(e);
    }
  };
}

//__________________________________________________________________POST
export async function addCountries(activity) {
  try {
    return axios.post("http://localhost:3001/activity", activity);
  } catch (e) {
    return new Error(e);
  }
}
//_________________________________________________________________________________GET ID
export async function getCountryId(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({ type: _enum.GET_COUNTRY_ID, payload: resp.data });
    } catch (e) {
      return new Error(e);
    }
  };
}

//_________________________________________________________________________________GET NAME
export async function getCountryName(name) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `http://localhost:3001/Countries?name=${name}`
      );
      return dispatch({ type: _enum.GET_COUNTRY_NAME, payload: resp.data });
    } catch (e) {
      return new Error(e);
    }
  };
}
//_______________________________________________________________________________________all Countries
export function allCountries() {
  return async function () {
    try {
      const result = await axios.get("http://localhost:3001/allCountries");
      const countries = result.data;
    } catch (e) {
      return new Error(e);
    }
  };
}
