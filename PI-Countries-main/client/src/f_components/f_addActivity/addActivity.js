import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { ordenamiento } from "../f_home/logica";
import { addActi, getCountries } from "../../f_redux/f_actions/actions";
require("./addActivity.css");

function AddActivity(props) {
  const history = useHistory();
  const { countries } = props;
  const dispath = useDispatch();

  var [errors, setErrors] = useState({
    input: "",
    act_enviar: true,
  }); //valida y activa input/enviar
  var [country, setCountry] = useState([]);
  var [state, setState] = useState({
    name: "",
    duration: 0,
    season: "",
    countries: [],
    difficulty: 0,
  });
  //________________________________________________cuando se crea el componente
  useEffect(() => {
    if (countries) {
      setCountry(ordenamiento(countries, "asc"));
    }
  }, [countries]);
  //________________________________________________________cuando se desmonta
  useEffect(() => {
    return function () {
      return dispath(getCountries());
    };
  }, [dispath]);
  //______________________________________cambios en los campos
  useEffect(() => {
    //update de estado
    validate({ value: "", name: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  //_______________________________________________________
  function validate({ value, name }) {
    if (name === "input") {
      setErrors({ ...errors, input: "" });
      setState({ ...state, name: value.toLowerCase().replace(" ", "") });
      if (state.name === "") {
        setErrors({ ...errors, act_enviar: true });
      } else {
        if (value.length > 15) {
          setState({ ...state, name: value.slice(0, 15) });
        }
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
      if (state.duration >= 0) {
        setState({ ...state, duration: state.duration + 1 });
      }
    }
    if (name === "menos") {
      if (state.duration >= 1) {
        setState({ ...state, duration: state.duration - 1 });
      }
    }

    if (name === "rango") {
      setState({ ...state, difficulty: value });
    }
    //_______________________________________________________aciva el button enviar

    const { season, duration, difficulty, countries } = state;
    if (
      state.name !== "" &&
      season !== "" &&
      duration > 0 &&
      difficulty > 0 &&
      countries.length > 0
    ) {
      setErrors({ ...errors, act_enviar: false });
    } else {
      setErrors({ ...errors, act_enviar: true });
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
      difficulty: 0,
    });

    setErrors({ input: "", act_enviar: true, select: "DEFAULT" });
    alert("Actividad Creada.");
  }

  //__________________________________________________________________________________valida input name
  function valida(e) {
    if (e.value === "") {
      setErrors({ ...errors, input: "campo obligatorio", act_enviar: true });
    }
  }

  //_____________________________________________________________________
  if (countries) {
    return (
      <div className="div-addAct">
        <button
          className="button-home "
          onClick={() => history.push("/home")}
        ></button>
        <div className="div-set-data">
          <div className="data-enter-left">
            <h3>Nombre:</h3>
            <h3>Duraci??n:</h3>
            <h3>Temporada:</h3>
            <h3>Ciudad:</h3>
            <h3>Dificultad</h3>
          </div>

          <div className="div-out-right">
            <input
              autoComplete="none"
              className="input"
              value={state.name}
              name="input"
              onBlur={(e) => valida(e.target)}
              placeholder={errors.input}
              onChange={(e) => validate(e.target)}
            ></input>

            <></>
            <div className="div-mas-menos">
              <button
                className="button-mas-mas"
                name="mas"
                onClick={(e) => validate(e.target)}
              >
                +
              </button>
              <button
                className="button-mas-menos"
                name="menos"
                onClick={(e) => validate(e.target)}
              ></button>
              <h3 className="h3-horas">{state.duration} horas</h3>
            </div>

            <select
              defaultValue="DEFAULT"
              className="selectt"
              onChange={(e) => setState({ ...state, season: e.target.value })}
            >
              <option value="DEFAULT" disabled>
                seleccionar temporada
              </option>
              <option className="optionss" value="verano">
                verano
              </option>
              <option className="optionss" value="oto??o">
                oto??o
              </option>
              <option className="optionss" value="invierno">
                invierno
              </option>
              <option className="optionss" value="primavera">
                primavera
              </option>
            </select>

            <select
              defaultValue="DEFAULT"
              className="selectt"
              name="select"
              onChange={(e) => {
                validate(e.target);
              }}
            >
              <option value="DEFAULT" disabled>
                seleccionar pais
              </option>
              {country.map((coun, index) => (
                <option className="optionss" key={coun.id} value={coun.name}>
                  {`${index + 1}-${coun.name}`}
                </option>
              ))}
            </select>
            <input
              className="rango-dificultad"
              type="range"
              name="rango"
              value={state.difficulty}
              min="0"
              max="5"
              step="1"
              onChange={(e) => {
                validate(e.target);
              }}
            ></input>
          </div>
          <div className="send-data">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <button
                className={errors.act_enviar ? "button-send2" : "button-send"}
                type="submit"
                disabled={errors.act_enviar}
              ></button>
            </form>
          </div>

          <fieldset className="details-inputs">
            <legend>
              <h3>Datos</h3>
            </legend>
            <h3 className="h3">nombre:</h3>
            <h3 className="h3">
              {state.name.length < 15
                ? state.name
                : state.name.substring(0, 20)}
            </h3>
            <h3 className="h3">duraci??n:</h3>
            <h3 className="h3">
              {state.duration > 0 ? state.duration + " horas" : ""}
            </h3>
            <h3 className="h3">temporada:</h3>
            <h3 className="h3">{state.season}</h3>
            <h3 className="h3">dificultad</h3>
            <h3 className="h3">
              {state.difficulty > 0 ? state.difficulty : ""}
            </h3>
            <h3 className="h3">ciudad/s:</h3>
            <ul className="uli">
              {state.countries.map((e, index) => (
                <li key={e}>
                  <h3 className="h3">
                    {e.length > 15 ? "*" + e.substring(0, 15) : "*" + e}
                  </h3>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    );
  } else {
    dispath(getCountries());

    return <></>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {})(AddActivity);
