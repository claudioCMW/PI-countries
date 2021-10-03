import Enum from "../../Enumeradores";

const _enum = new Enum();

const initialState = {
  countries:null,
  countriesNAME_ID:null,

};

function reducerRoot(state = initialState, action) {
  switch (action.type) {

    // Aca va tu codigo;
    //________________________________________________________GET
    case _enum.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    //______________________________________________GET ID
    case _enum.GET_COUNTRY_ID:
      return {
        ...state,
        countriesNAME_ID: action.payload,
      };

    //____________________________________________________GET NAME
    case _enum.GET_COUNTRY_NAME:
      return {
        ...state,
        countriesNAME_NAME: action.payload,
      };

    default:
      return state;
  }
}

export default reducerRoot;
