function findIndex(array, callback) { //
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i])) {
        return i;
      }
    }
    return undefined;
  }
  
  // Ejemplo de uso:
  const array = [1, 2, 3, 4, 5];
  
  const index = findIndex(array, (element) => element > 3);
  
  console.log(index); // Output: 3
  