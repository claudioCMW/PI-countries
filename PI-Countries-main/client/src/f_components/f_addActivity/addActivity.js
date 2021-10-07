import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { _order } from "../../f_redux/f_actions/actions";
require("./addActivity.css");

function AddActivity(props) {
  const history = useHistory();
  const { countries } = props;
  const dispath = useDispatch();
  useEffect(() => {
    if (countries) {
      dispath(_order("asc"));
    }
  }, []);

  var [state, setState] = useState({
    name: "",
    duration: 0,
    season: "",
    countries: [],
  });

  //_______________________________________________________
  function validate({ value, name }) {
    if (name === "input") {
      if (value !== "" || value !== " ") {
        setState({ ...state, name: value.toLowerCase() });
        if (value.length > 50) {
          setState({ ...state, name: value.slice(0, 50) });
        }
      } else {
        alert("rellenar campo");
      }
    }
    if (name === "select") {
      console.log(value);
      if (state.countries.includes(value)) {
        setState({
          ...state,
          countries: state.countries.filter((e) => e !== value),
        });
      } else {
        setState({ ...state, countries: state.countries.concat(value) });
      }
    }

    if (name === "mas") {
      if (state.duration >= 0 && state.duration <= 30) {
        setState({ ...state, duration: state.duration + 1 });
      }
    }
    if (name === "menos") {
      if (state.duration >= 1 && state.duration <= 30) {
        setState({ ...state, duration: state.duration - 1 });
      }
    }
  }
  //____________________________________________________________________________submit
  function handleSubmit(e) {
         e.preventDefault()
       
  }
//__________________________________________________________________________________
  function valida(e) {
  
    if (e.value === "") {
      alert("error");
    }
  }
  //_____________________________________________________________________
  if (countries) {
    return (
      <div>
        <h3>name</h3>
        <input
          value={state.name}
          name="input"
          onBlur={(e) => valida(e.target)}
          onChange={(e) => validate(e.target)}
        ></input>
        <h3>duracion</h3>
        <div>
          <button name="mas" onClick={(e) => validate(e.target)}>
            +
          </button>
          <button name="menos" onClick={(e) => validate(e.target)}>
            -
          </button>
        </div>
        <h3>temporada</h3>
        <div>
          <button
            name="invierno"
            onClick={(e) => setState({ ...state, season: e.target.name })}
          >
            invierno
          </button>
          <button
            name="verano"
            onClick={(e) => setState({ ...state, season: e.target.name })}
          >
            verano
          </button>
          <button
            name="otoño"
            onClick={(e) => setState({ ...state, season: e.target.name })}
          >
            otoño
          </button>
          <button
            name="primavera"
            onClick={(e) => setState({ ...state, season: e.target.name })}
          >
            primavera
          </button>
        </div>
        <h3> ciudad</h3>
        <select
          name="select"
          onChange={(e) => {
            validate(e.target);
          }}
        >
          {countries.map((coun) => (
            <option key={coun.id} value={coun.name}>
              {coun.name}
            </option>
          ))}
        </select>

        <form onSubmit={() => {}}>

          <button type="submit" disabled={false}>ENVIAR</button>
        </form>
      </div>
    );
  } else {
    history.push("/home");

    return <></>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(AddActivity);
