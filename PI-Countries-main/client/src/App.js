import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Principal from "./f_components/f_principal/principal";
import Home from "./f_components/f_home/home";
import Details from "./f_components/f_details/details";
import AddActivity from "./f_components/f_addActivity/addActivity";
require("../src/App.css")
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Principal}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/home/details/:id" render={({match})=><Details id={match.params.id}></Details>}></Route>
      <Route exact path="/home/createActivity" component={AddActivity}></Route>
    </div>
  );
}

export default App;
