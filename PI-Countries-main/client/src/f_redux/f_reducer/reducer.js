import Enum from "../../Enumeradores";

const _enum = new Enum();

const initialState = {
  countries: null,
  countriesNAME_ID: null,
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
    //_______________________________________________________ORDER ASC
    case _enum.ORDER:
     const {countries}=state;
      var array = [];

      for (var i = 0; i < countries.length - 1; i++) {
        for (var j = i + 1; j < countries.length; j++) {
          if (action.payload === "asc") {
            if (countries[i].name > countries[j].name) {
              array[j] = countries[i];
              array[i] = countries[j];
            }
          } else {
            if (countries[i].name < countries[j].name) {
              array[j] = countries[i];
              array[i] = countries[j];
            }
          }
        }
      }
      return { ...state, countries: array };

    //_____________________________________________________________________
    default:
      return state;
  }
}

export default reducerRoot;
