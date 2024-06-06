const filtrador = x => x.aprendiz === true; //Creo una constante la cual  se llama filtrador la cual se asigna el valor de x para que sea variable y tiene que ser true el valor
//del aprendiz

// Permite leer el archivo json de user para poder analizar los datos
fetch('user.json')
//Utilizamos then para poder solucionar la promesa y convertirlo en un nuevo json
  .then(response => response.json())
//Se filtran usuarios los cuales sean aprendices de adso no dentra aca instructores o demas creando la constante aprendices los cuales se pasan por el filtrador
  .then(data => {
    const aprendices = data.users.filter(filtrador);

    //Con map recorremos la array de aprendices para poder de esta manera retornando al fetch linkeando el api de github colocando que se interpole el aprendiz.user
    const promesas = aprendices.map(aprendiz => {
      return fetch(`https://api.github.com/users/${aprendiz.user}`)
      //Resolvemos la promesa respondiendo convirtiendolo en un json
        .then(response => response.json())
        .then(githubUser => {
          //Retornamos el nombre de git del aprendiz junto a la url de su avatar mas no el avatar 
          return {
            name: githubUser.name,
            avatar_url: githubUser.avatar_url
          };
        });
    });

    // Este return devuelve todas las promesas resuelstas
    return Promise.all(promesas);
  })
  //Resolvemos imprimiendo la informacion de los usuarios en una tabla
  .then(usersData => {
    console.table(usersData);
  })

  //Capturamos cualquier error que pueda ocurrir en el momento de la ejecucion del codigo
  .catch(error => console.error('Error:', error));

