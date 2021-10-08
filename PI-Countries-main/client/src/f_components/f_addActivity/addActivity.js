import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addActi, _order } from "../../f_redux/f_actions/actions";
require("./addActivity.css");

function AddActivity(props) {
  const history = useHistory();
  const { countries } = props;
  const dispath = useDispatch();

  var [errors, setErrors] = useState({ input: "", act_enviar: true }); //valida y activa input/enviar

  var [state, setState] = useState({
    name: "",
    duration: 0,
    season: "",
    countries: [],
  });
  useEffect(() => {
    if (countries) {
      dispath(_order("asc"));
    }
  }, []);
  //______________________________________cambios en los campos
  useEffect(() => {
    validate({ value: "", name: "" });
  }, [state]);

  //_______________________________________________________
  function validate({ value, name }) {
    if (name === "input") {
      setErrors({ ...errors, input: "" });
      setState({ ...state, name: value.toLowerCase() });
      if (value.length > 50) {
        setState({ ...state, name: value.slice(0, 50) });
      }
    }
    if (name === "select") {
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
    //_______________________________________________________aciva el button enviar
    const { season, duration, countries } = state;
    if (
      state.name !== "" &&
      season !== "" &&
      duration > 0 &&
      countries.length > 0
    ) {
      setErrors({ ...errors, act_enviar: false });
    }
  }
  //____________________________________________________________________________submit
  function handleSubmit(e) {
    e.preventDefault();
    dispath(addActi(state));
    setState({
      name: "",
      duration: 0,
      season: "",
      countries: [],
    });
    alert("created");
    (() => history.push("/home"))();
  }
  //__________________________________________________________________________________
  function valida(e) {
    if (e.value === "") {
      setErrors({ ...errors, input: "campo obligatorio", act_enviar: true });
    }
  }
  //_____________________________________________________________________
  if (countries) {
    return (
      <div className="div-addAct">
        <div className="div-set-data">
          <div className="data-enter-left">
            <h3>name</h3>
            <h3>duracion</h3>
            <h3>temporada</h3>
            <h3> ciudad</h3>
          </div>

          <div className="div-out-right">
            <input
              value={state.name}
              name="input"
              onBlur={(e) => valida(e.target)}
              placeholder={errors.input}
              onChange={(e) => validate(e.target)}
            ></input>
           

            <div>
              <button name="mas" onClick={(e) => validate(e.target)}>
                +
              </button>
              <button name="menos" onClick={(e) => validate(e.target)}>
                -
              </button>
            </div>
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
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <button type="submit" disabled={errors.act_enviar}>
                ENVIAR
              </button>
            </form>
          </div>
        </div>
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
