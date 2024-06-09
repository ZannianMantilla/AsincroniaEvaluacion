const fs = require('fs');
// Importa el módulo 'fs' (File System) para trabajar con el sistema de archivos

// Leer el archivo user.json
fs.readFile('user.json', 'utf8', (err, data) => {
    // Lee el archivo 'user.json' en formato UTF-8

    if (err) {
        console.error('Error leyendo el archivo:', err);
        return;
        // Si ocurre un error al leer el archivo, lo muestra en la consola y termina la ejecución de la función
    }

    let users = JSON.parse(data);
    // Convierte los datos leídos del archivo (en formato JSON) a un objeto JavaScript y los asigna a la variable 'users'

    // Proxy handler para validar y transformar nombres
    const handler = {
        set: (obj, prop, value) => {
            if (prop === 'name') {
                // Si la propiedad que se está configurando es 'name'
                // Solo permitir letras mayúsculas y espacios
                obj[prop] = value.replace(/[^A-Z\s]/g, '');
                // Reemplaza cualquier carácter que no sea una letra mayúscula o un espacio con una cadena vacía
            } else {
                obj[prop] = value;
                // Si la propiedad no es 'name', simplemente asigna el valor a la propiedad
            }
            return true;
            // Indica que la asignación se realizó con éxito
        }
    };

    // Función para verificar y transformar usuarios
    const processUsers = (users) => {
        // Itera sobre cada usuario en el array 'users'
        users.forEach(user => {
            // Verifica si el usuario cumple con las condiciones:
            // - 'aprendiz' es verdadero
            // - El nombre tiene más de dos palabras
            // - El nombre de usuario contiene 'ADSO'
            if (user.aprendiz && user.name.split(' ').length > 2 && user.user.includes('ADSO')) {
                const proxyUser = new Proxy(user, handler);
                // Crea un proxy para el usuario utilizando el 'handler' definido anteriormente
                proxyUser.name = user.name.toUpperCase();
                // Transforma el nombre del usuario a mayúsculas utilizando el proxy, lo que también aplicará la validación
            }
        });
    };

    // Procesar los usuarios
    processUsers(users.users);
    // Llama a la función 'processUsers' pasando el array de usuarios del objeto 'users'

    // Escribir el archivo actualizado
    fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
        // Convierte el objeto 'users' de nuevo a una cadena JSON y escribe el archivo 'user.json'

        if (err) {
            console.error('Error escribiendo el archivo:', err);
            // Si ocurre un error al escribir el archivo, lo muestra en la consola
        } else {
            console.log('Archivo actualizado exitosamente.');
            // Si el archivo se escribió correctamente, muestra un mensaje en la consola
        }
    });
});
