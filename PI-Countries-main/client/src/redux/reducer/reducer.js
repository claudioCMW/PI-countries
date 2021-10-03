import Enum from "../../Enumeradores";

const _enum = new Enum();

const initialState = {
  countries:[],
  countriesNAME_ID:[]
};

function reducerRoot(state = initialState, action) {
  switch (action.type) {
    // Aca va tu codigo;
    case _enum.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
     
      };
    //______________________________________________
    

    //____________________________________________________
  

    //_____________________________________________________________
    

    default:
      return state;
  }
}

export default reducerRoot;
