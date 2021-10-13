import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

require("./nav.css");

export default function Nav() {
  var [input, setInput] = useState("");
  var history = useHistory();

  //______________________________________________________
  function validate(value) {
    if (value.length < 20) {
      if (value.length > 3) {
        var newValue = "";
        for (var i = 0; i < value.length; i++) {
          if (!parseInt(value[i]) && value[i] !== "0") {
            newValue += value[i];
          }
        }
        setInput(newValue);
      } else {
        setInput(value.toLowerCase().replace(" ", ""));
      }
    }
  }

  //______________________________________________________________submit
  function handleSubmit(e) {
    e.preventDefault();
    if (input === "") {
      alert("Ingrese nuevamente" );
    } else {
      history.push(`/home/details/${input}`);
    }
  }
  //____________________________________________________________
  function createFactory() {
    history.push("/home/createActivity");
  }
  //___________________________________________________________________
  return (
    <header>
      <div className="div-nav">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="div-form-inp-but">
            <input
              autoComplete="off"
              name="input"
              className="input-nav"
              value={input}
              onInput={(e) => validate(e.target.value)}
            ></input>
            <button className="button-input-nav" type="submit"></button>
          </div>
        </form>
        <div></div>
        <div className="div-createAct">
          <h3>Crear actividad</h3>
          <button
            className="button-create-nav"
            onClick={() => createFactory()}
          ></button>
        </div>
      </div>
    </header>
  );
}
