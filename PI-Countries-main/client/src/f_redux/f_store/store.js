import reducerRoot from "../f_reducer/reducer";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  reducerRoot,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
