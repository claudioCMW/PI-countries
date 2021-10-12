/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Countrie, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  id: 044,
  name: "Argentina",
  imgflat: "img",
  continent: "asia",
  cap: "nose",
};

describe(" routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Countrie.sync({ force: true }).then(() => Countrie.create(country))
  );
  describe("GET /countries", () => {
    it("deberia devolver 200 si obtuvo repuesta", () =>
      agent.get("/countries").expect(200));
    it("deberia devolver 404 si no obtuvo repuesta", () =>
      agent.get("/countr").expect(404));

    describe("POST /", () => {
      it('responde con un mensaje "create" si creo', () =>
        agent
          .post("/activity")
          .send({
            name: "a campar",
            duration: 3,
            season: "verano",
            countries: ["argentina"],
            difficulty: 3,
          })
          .then((res) => {
            expect(res.body).to.be.equal("create");
          }));
    });


    

    it("error llave duplicada", function (done) {
      Countrie.create({
        name: "argen",
      })
        .then(() => {
          return Countrie.create({ name: "argen" });
        })
        .then(() => done("No deberia haberse creado"))
        .catch(() => done());
    });

    it("campo nombre no puede ser null", function (done) {
      let country = {
        name: null,
      };
      Countrie.create(country)
        .then(() => done("no deberia crearse"))
        .catch(() => done());
    });

    it("campo dificultad deber ser entre 1-5", function (done) {
      let country = {
        name: "brazil",
        difficulty: 9,
      };
      Countrie.create(country)
        .then(() => done("no deberia crearse"))
        .catch(() => done());
    });
  });
});
