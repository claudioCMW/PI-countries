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
        countriesNAME_ID: action.payload,
      };
    //_______________________________________________________ORDER ASC
    case _enum.ORDER:
      var aux;
      var array = state.countries.map((e) => e);

      for (var i = 0; i < array.length - 1; i++) {
        for (var j = i + 1; j < array.length; j++) {
          if (action.payload === "asc") {
            if (array[i].name > array[j].name) {
              aux = array[j];
              array[j] = array[i];
              array[i] = aux;
            }
          }
          if (action.payload === "des") {
            if (array[i].name < array[j].name) {
              aux = array[j];
              array[j] = array[i];
              array[i] = aux;
            }
          }
          if (action.payload === "cont") {
            if (array[i].continent > array[j].continent) {
              aux = array[j];
              array[j] = array[i];
              array[i] = aux;
            }
          }
          if (action.payload === "area") {
            if (array[i].area > array[j].area) {
              aux = array[j];
              array[j] = array[i];
              array[i] = aux;
            }
          }
          if (action.payload === "act") {
            if (array[i].ActTurs.length < array[j].ActTurs.length) {
              aux = array[j];
              array[j] = array[i];
              array[i] = aux;
            }
          }
        }
      } //case
      return { ...state, countries: array };

    //_____________________________________________________________________
    default:
      return state;
  }
}

export default reducerRoot;
