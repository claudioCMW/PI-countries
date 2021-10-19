//______________________________________________________________ordenamiento
export function ordenamiento(array, by) {
  var newArray = [];

 if(array===null){
     return [];
 }

  //__________________________________________ordena por abecedario
  if (by[0] === "9") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name[0] === by[1]) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  //_______________________________________________________ordena por un tipo de actividad en especial

  if (by[0] === "8") {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].ActTurs.length; j++) {
        if (array[i].ActTurs[j].name === by.substring(1)) {
          newArray.push(array[i]);
        }
      }
    }
    return newArray;
  }
  //______________________________________________________________array de nombres activities
  if (by === "nameAct") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].ActTurs.length > 0) {
        for (let j = 0; j < array[i].ActTurs.length; j++) {
          if (!newArray.includes(array[i].ActTurs[j].name)) {
            newArray.push(array[i].ActTurs[j].name);
          }
        }
      }
    }
    return newArray;
  }

  //____________________________________________________ordenar por actividad
  if (by === "act") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].ActTurs.length > 0) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  //_________________________________________________________________orden por select
  newArray = array.map((e) => e);
  var aux;

  for (var i = 0; i < newArray.length - 1; i++) {
    for (var j = i + 1; j < newArray.length; j++) {
      if (by === "asc") {
        if (newArray[i].name > newArray[j].name) {
          aux = newArray[j];
          newArray[j] = newArray[i];
          newArray[i] = aux;
        }
      }
      if (by === "des") {
        if (newArray[i].name < newArray[j].name) {
          aux = newArray[j];
          newArray[j] = newArray[i];
          newArray[i] = aux;
        }
      }
      if (by === "cont") {
        if (newArray[i].continent > newArray[j].continent) {
          aux = newArray[j];
          newArray[j] = newArray[i];
          newArray[i] = aux;
        }
      }
      if (by === "area") {
        if (newArray[i].area > newArray[j].area) {
          aux = newArray[j];
          newArray[j] = newArray[i];
          newArray[i] = aux;
        }
      }
      if (by === "pob") {
        if (newArray[i].poblation < newArray[j].poblation) {
          aux = newArray[j];
          newArray[j] = newArray[i];
          newArray[i] = aux;
        }
      }
    }
  }

  return newArray;
}
