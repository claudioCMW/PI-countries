import { useDispatch } from "react-redux";
import React, { createFactory, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { getCountryId, getCountryName } from "../../f_redux/f_actions/actions";

require("./nav.css");

export default function Nav() {
  var [input, setInput] = useState("");
  var dispatch = useDispatch();
  var history = useHistory();
  //______________________________________________________
  function validate(value) {
    setInput(value.toLowerCase().replace(" ", ""));

    if (value.length > 3 && value.length <= 20) {
      var newValue = "";
      for (var i = 0; i < value.length; i++) {
        if (!parseInt(value[i])) {
          newValue += value[i];
        }
      }
      setInput(newValue);
    }
  }

  //______________________________________________________________submit
  function handleSubmit(e) {
    e.preventDefault();
    if (input === "") {
      alert("Ingrese nuevamente");
    } else {
      history.push(`/home/details/${input}`);
    }
  }
  //____________________________________________________________
  function createFactory(){
       history.push("/home/createActivity");
  }
  //___________________________________________________________________
  return (
    <header>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={input}
            onInput={(e) => validate(e.target.value)}
          ></input>
          <button type="submit">BUSCAR</button>
        </form>
        <div>
          <h3>Crear actividad</h3>
          <button onClick={()=>createFactory()}>CREAR</button>
        </div>
      </div>
    </header>
  );
}
