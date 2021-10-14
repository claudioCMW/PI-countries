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
    //__________________________________________________________CLEAR
    case _enum.CLEAR:
      return {
        ...state,
        countriesNAME_ID: action.payload,
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
      const { payload } = action;
      if (payload[0] === "9") {
        //__________________________________________ordena por abecedario
        var aux1 = [];
        var aux2 = [];
        for (let i = 0; i < state.countries.length; i++) {
          if (state.countries[i].name[0] === payload[1]) {
            aux1.push(state.countries[i]);
          } else {
            aux2.push(state.countries[i]);
          }
        }
        return { ...state, countries: [...aux1, ...aux2] };
      } else {
        //_________________________________________________________________orden por select
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
            if (action.payload === "pob") {
              if (array[i].poblation < array[j].poblation) {
                aux = array[j];
                array[j] = array[i];
                array[i] = aux;
              }
            }
          }
        } //case

        return { ...state, countries: array };
      }
    //_____________________________________________________________________
    default:
      return state;
  }
}

export default reducerRoot;
