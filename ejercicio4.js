(async () => {
  // Declara una función asíncrona autoejecutable

  let response = await fetch('user.json');
  // Realiza una solicitud HTTP GET para obtener el archivo 'user.json' y espera la respuesta

  let res = await response.json();
  // Convierte la respuesta a formato JSON y la asigna a la variable 'res'

  let repos = [];
  // Declara un array vacío llamado 'repos' para almacenar las promesas de los repositorios

  res.users.forEach(e => {
    // Itera sobre cada elemento 'e' en el array 'res.users'

    let repo = fetch(`https://api.github.com/users/${e.user}/repos`).then(
      // Realiza una solicitud HTTP GET para obtener los repositorios del usuario especificado en 'e.user' y guarda la promesa en 'repo'

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

  let filteredResults = results.filter(result => result.length < 5);
  // Filtra los resultados para encontrar usuarios con menos de 5 repositorios públicos

  console.log("Repositorios con menos de 5 repositorios públicos:");
  // Imprime un mensaje en la consola

  console.table(filteredResults.map(result => ({ user: result[0]?.owner?.login, repos: result.length })));
  // Muestra una tabla en la consola con los usuarios que tienen menos de 5 repositorios públicos
  // (se usa '?.' para manejar posibles valores null o undefined)

  let jsResults = results.flatMap(result => result.filter(repo => repo.name.includes("JavaScript")));
  // Crea un array aplanado que contiene solo los repositorios cuyo nombre incluye "JavaScript"

  jsResults.sort((a, b) => a.name.localeCompare(b.name));
  // Ordena los repositorios alfabéticamente por su nombre

  console.log("\nRepositorios con JavaScript en su nombre:");
  // Imprime un mensaje en la consola

  console.table(jsResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
  // Muestra una tabla en la consola con los repositorios que tienen "JavaScript" en su nombre

  let longNameResults = results.flatMap(result => result.filter(repo => repo.name.length > 5));
  // Crea un array aplanado que contiene solo los repositorios cuyos nombres tienen más de 5 letras

  console.log("\nRepositorios con más de 5 letras en su nombre:");
  // Imprime un mensaje en la consola

  console.table(longNameResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
  // Muestra una tabla en la consola con los repositorios cuyos nombres tienen más de 5 letras
})();
