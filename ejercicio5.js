const fs = require('fs');

// Leer el archivo user.json
fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error leyendo el archivo:', err);
        return;
    }

    let users = JSON.parse(data);

    // Proxy handler para validar y transformar nombres
    const handler = {
        set: (obj, prop, value) => {
            if (prop === 'name') {
                // Solo permitir letras mayúsculas y espacios
                obj[prop] = value.replace(/[^A-Z\s]/g, '');
            } else {
                obj[prop] = value;
            }
            return true;
        }
    };

    // Función para verificar y transformar usuarios
    const processUsers = (users) => {
        users.forEach(user => {
            if (user.aprendiz && user.name.split(' ').length > 2 && user.user.includes('ADSO')) {
                const proxyUser = new Proxy(user, handler);
                proxyUser.name = user.name.toUpperCase(); // Transformar el nombre a mayúsculas
            }
        });
    };

    // Procesar los usuarios
    processUsers(users.users);

    // Escribir el archivo actualizado
    fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error escribiendo el archivo:', err);
        } else {
            console.log('Archivo actualizado exitosamente.');
        }
    });
});