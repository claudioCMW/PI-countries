async function getServices(req, res, next) {
  var { title, order, offSet } = req.query;
  if (!offSet) {
    offSet = 0;
  }
  console.log(title, offSet, order);
  var dbServices = [];
  try {
    dbServices = await Service.findAll({
      //Traigo todo de la db
      include: [
        {
          model: Users,
          through: { attributes: [] },
        },
        Qualification,
        {
          model: Category,
          include: {
            model: Group,
          },
        },
      ],
    });
  } catch (err) {
    next(err);
  }

  if (dbServices.length > 0) {
    //compruebo si hay en BD
    if (title !== "undefined" && title) {
      //si pasan un title

      if (order !== "undefined" && order) {
        //si pasan un orden
        // dbServices = filterBy(dbServices, title, order); //ordenar
      } else {
        console.log("entre a title sin order");
        dbServices = dbServices.filter((service) => {
          return service.title.toLowerCase().includes(title.toLowerCase());
        });
        return res.send(dbServices); //Si coincide mando el servicio con ese title
      }
    } else {
      res.send(dbServices); //Si no pasaron un title devuelvo como viene de BD
    }
  } else {
    res.send(dbServices); //Si no hay en BD, devuelvo el array vacio del findAll
  }
}
