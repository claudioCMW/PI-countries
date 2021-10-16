//______________________________________________________________ordenamiento
export function ordenamiento(array,by) {
    var newArray = [];
    if (by[0] === "9") {
    //__________________________________________ordena por abecedario
    for (let i = 0; i < array.length; i++) {
      if (array[i].name[0] === by[1]) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  } else {
    //_________________________________________________________________orden por select
    newArray = array.map(e=>e)
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
        if (by === "act") {
          if (newArray[i].ActTurs.length < newArray[j].ActTurs.length) {
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
}
