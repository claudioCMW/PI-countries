const { Countrie, ActTur, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Countrie.sync({ force: false }));
    describe("actividad and country", () => {
      it("should throw an error if name is null", (done) => {
        Countrie.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Countrie.create({
          id: 044,
          name: "Argentina",
          imgflat: "img",
          continent: "asia",
          cap: "nose",
        });
      });

      it("no deberia agregar si existe un name en null", function (done) {
        let actividad = { name: null };
        ActTur.create(actividad)
          .then(() => done("no deberia haberse creado"))
          .catch(() => done());
      });

      it('deberia ser season ["invierno","otoño","primavera","verano"] ', function (done) {
        let actividad = {
          name: "surff",
          duration: 2,
          season: ["feriado"], //mal
          difficulty: 3,
        };
        ActTur.create(actividad)
          .then(() => done("no deberia haberse creado"))
          .catch(() => done());
      });

      it("deberia existir todos los campos de una actividad", function () {
        let actividad = { name: "peru" };

        ActTur.create(actividad)
          .then((done) => {
            return done("no debio haberse creado");
          })
          .catch(() => done());
      });
    });
  });
});
