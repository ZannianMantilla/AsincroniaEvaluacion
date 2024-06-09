(async () => {
  // Declara una función anónima asíncrona y la ejecuta inmediatamente

  let response = await fetch('user.json');
  // Hace una solicitud HTTP GET para obtener el archivo 'user.json' y espera la respuesta

  let res = await response.json();
  // Espera a que la respuesta se convierta en un objeto JSON y lo asigna a la variable 'res'

  let repos = [];
  // Declara un array vacío llamado 'repos' para almacenar las promesas de los repositorios

  res.users.forEach(e => {
    // Itera sobre cada elemento 'e' en el array 'res.users'

    let repo = fetch(`https://api.github.com/users/${e.user}/repos`).then(
      // Hace una solicitud HTTP GET para obtener los repositorios del usuario especificado en 'e.user' y guarda la promesa en 'repo'

      successResponse => {
        if (successResponse.status !== 200) {
          return null;
          // Si la respuesta no tiene un estado 200 (éxito), devuelve null
        } else {
          return successResponse.json();
          // Si la respuesta es exitosa (estado 200), convierte la respuesta en JSON y la devuelve
        }
      },

      failResponse => {
        return null;
        // En caso de que la solicitud falle, devuelve null
      }
    );

    repos.push(repo);
    // Añade la promesa 'repo' al array 'repos'
  });

  let results = await Promise.all(repos);
  // Espera a que todas las promesas en el array 'repos' se resuelvan y asigna los resultados a 'results'

  console.log(results);
  // Imprime los resultados en la consola
})();
