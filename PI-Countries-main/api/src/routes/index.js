const { default: axios } = require("axios");
const { Router } = require("express");
const { Op } = require("sequelize");
const { Countrie, ActTur } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//_____________________________________________________________________________________________post activity
router.post("/activity", (req, res, next) => {
  var { name, difficulty, duration, season, countries } = req.body;
  var actCreated = [];
  ActTur.create({ name, difficulty, duration, season })
    .then((act) => {
      actCreated = act;
      return countries.map((acty) => {
        return Countrie.findOne({
          where: {
            name: acty.toLowerCase(),
          },
        });
      });
    })
    .then((res) => {
      return Promise.all(res);
    })
    .then((fin) => {

      actCreated.addCountries(fin.filter(e=>e!==null));
      res.json("create");
    })
    .catch((e) => {
      // res.status(500).send([]);
      next(e);
    });
});

//_____________________________________________________________________________________________get countries BD
router.get("/countries", (req, res, next) => {
  var { name } = req.query;

  if (typeof name !== "undefined") {
    next(); // delego la ruta si tengo query
  } else {
    Countrie.findAll({ include: ActTur })
      .then((res) => {
        return res.map((elem) => {
          return {
            ...elem.dataValues,
            ActTurs:
              elem.dataValues.ActTurs.length > 0
                ? elem.dataValues.ActTurs.map((e) => {
                    return {
                      name: e.name,
                      difficulty: e.difficulty,
                      duration: e.duration,
                      season: e.season,
                    };
                  })
                : [],
          };
        });
      })
      .then((e) => {
        res.status(200).send(e);
      })
      .catch(() => {
        // res.status(500).send([]);
        next(e);
      });
  }
});
//_____________________________________________________________________________________________get countries query
router.get("/countries", async (req, res, next) => {
  var { name } = req.query;
  var countries = Countrie.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
    include: ActTur,
  });

  Promise.all([countries])
    .then((e) => {
      const [result] = e;
      return result.map((elem) => {
        return {
          ...elem.dataValues,
          // ActTur:elem.ActTur.map
        };
      });
    })
    .then((e) => {

      res.status(200).send(e);
    })
    .catch(() => {
      // res.status(500).send([]);
      next(e);
    });
});
//_____________________________________________________________________________________________get countries BD ID
router.get("/countries/:id", (req, res, next) => {
  const { id } = req.params;
  
  var countries = Countrie.findAll({
    where: { id: id.toUpperCase() },
    include: ActTur,
  });

  Promise.all([countries])
    .then((e) => {
      const [result] = e;
      return result.map((elem) => {
        return {
          ...elem.dataValues,
          // ActTur:elem.ActTur.map
        };
      });
    })
    .then((e) => {
      res.status(200).send(e);
    })
    .catch(() => {
      // res.status(500).send([]);
      next(e);
    });
});

//_______________________________________________________________________________ get countries first instance
router.get("/allCountries", async (req, res, next) => {
  await Countrie.destroy({
    where: { imgflat: { [Op.like]: "%https://upload%" } },
  });

  axios
    .get("https://restcountries.com/v3/all")
    .then((resp) => {
      return resp.data.map((elem) => {
        return Countrie.create({
          name: elem.name.common.toLowerCase(),
          id: elem.ccn3 || elem.ccn2 || elem.cca3 || elem.cioc,
          imgflat: elem.flags[1],
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
