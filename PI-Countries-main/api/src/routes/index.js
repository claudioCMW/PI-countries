const { default: axios } = require("axios");
const { Router } = require("express");
const { Countrie, ActTur } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//_____________________________________________________________________________________________
router.get("/countries", (req, res, next) => {
  var { name } = req.query;

  if (typeof name !== "undefined") {
    next(); // delego la ruta si tengo query
  } else {
    Countrie.findAll({ include: ActTur }).then((res) => {
        return res.map(elem=>{
             return {
                  ...elem.dataValues,
                  ActTur:elem.ActTur.map
             }
        })
    });
  }
});

//_______________________________________________________________________________ get countries first instance
router.get("/allCountries", (req, res, next) => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((resp) => {
      return resp.data.map((elem) => {
        return Countrie.create({
          name: elem.name.common,
          id: elem.ccn3 || elem.ccn2 || elem.cca3 || elem.cioc,
          imgflat: elem.flags.svg,
          continent: elem.region,
          cap: elem.capital ? elem.capital.toString() : "No found capital",
          subRegion: elem.subregion,
          area: elem.area,
          poblation: elem.population,
        });
      });
    })
    .then((resp) => {
      return Promise.all(resp);
    })
    .then(() => {
      res.status(200).send("the request was made correctly");
    })
    .catch((e) => next(e));
});

module.exports = router;
