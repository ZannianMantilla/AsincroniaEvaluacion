// // Define una función constante llamada 'filtrar' que toma un argumento 'x' y retorna true si 'x.name' es igual a "Evaluacion"
// const filtrar = x => x.name === "Evaluacion";

// (async() => { // Declara una función asíncrona autoejecutable

//   // Realiza una solicitud para leer un archivo JSON llamado 'user.json'
//   let response = await fetch('user.json');

//   // Espera la respuesta de la solicitud anterior y la convierte en un objeto JavaScript
//   let user = await response.json();

//   // Utiliza el nombre de usuario obtenido del archivo 'user.json' para hacer una solicitud a la API de GitHub
//   let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);

//   // Espera la respuesta de la solicitud a GitHub y la convierte en un objeto JavaScript (una lista de repositorios)
//   let usuariogithub = await respuestGithub.json();

//   // Recorre cada elemento (repositorio) de la lista de repositorios del usuario de GitHub
//   usuariogithub.forEach(element => {
//     // Si el nombre del repositorio es "Evaluacion", lo imprime en la consola
//     if (element.name === "Evaluacion") {
//       console.log(element);
//     }
//   });


//   // Intenta filtrar la lista de repositorios usando la función 'filtrar' y guarda el resultado en 'data'
//   // let data = usuariogithub.filtrer(filtrar)

//   // Imprime el resultado filtrado en la consola
//   //console.log(data)

//   // Imprime la lista completa de repositorios en la consola
//   //console.log(usuariogithub)
// })();


// Define una función constante de nombre filtrar la cual se le coloca el operador de asignacion que vale x luego con un arrow function decimos que el elemento x busca name
// la cual agarra el objeto x como si fuera un argumento nos devuelve true si x.name llega a ser igual a "Evaluacion", si no lo es retornaria false
const filtrar = x => x.name === "Evaluacion";

// Con fetch llamo al archivo user.json para obtener la informacion(datos) que este contiene resolviendo la promesa usando .then junto a una array function realizando una funcion
// anonima autoejecutable asi y de esta manera se logre imprimir mas adelante en consola
fetch('user.json')
  .then(response => {
    // Se analiza el archivo y se devuleve este mismo JSON
    return response.json();
  })
  .then(user => {
    // retorno y llamo con fech usando el api publica de github consumiendola para que de esta manera utilizando los datos que estan en el JSON pueda buscar por medio del
    //user.name solucionando la promesa para que de esta manera me muestre sus repositorios publicos de github
    return fetch(`https://api.github.com/users/${user.name}/repos`);
  })
  .then(responseGithub => {
    // Se recibe la respuesta del api anterior de github resolviendo de esta manera la promesa y se devuelve como datos json 
    return responseGithub.json();
  })
  .then(usuariogithub => {
    // Con forEach iteramos entre el array que contiene los repositorios de github
    usuariogithub.forEach(element => {
      // Al realizar la iteracion empleando un condicional if se buscara que un elemento de nombre estrictamente igual al de Evaluacion si se cumple se imprimira por consola cual es
      if (element.name === "Evaluacion") {
        console.log(element);
      }
    });

    const data = usuariogithub.filter(filtrar);
    console.log(data);

  })
  .catch(error => {
    // Con el catch capturamos algun error que llegue a ocurrir en el momento de la ejecucion del codigo imprimiendolo con el console.error y asignandole un valor que se necesite mostrar
    console.error('Error:', error);
  });





