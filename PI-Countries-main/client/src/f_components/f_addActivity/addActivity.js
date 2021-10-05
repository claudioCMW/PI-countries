import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

require("./addActivity.css");

export default function AddActivity() {
  var [state, setState] = useState({
    name: "",
    duration: 0,
    season: [],
    countries: [],
  });

  return (
    <div>
      <form onSubmit={() => {}}>
        <h3>name</h3>
        <input value={state.name}></input>
        <h3>duracion</h3>
        <div>
          <button>+</button>
          <button>-</button>
        </div>
        <h3>temporada</h3>
        <div>
          <button name="invierno">invierno</button>
          <button name="verano">verano</button>
          <button >otoño</button>
          <button>primavera</button>
        </div>

        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}
