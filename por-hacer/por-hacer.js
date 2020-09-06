const fs = require('fs');

let listadoPorHacer = [];

const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error(err);
    });

}

const cargarDb = () => {

    listadoPorHacer = require('../db/data.json');
}


let guardarDb2 = () => {

    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoPorHacer);

        fs.writeFile(`db/data.json`, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(`se guardo en db/data.json`);
            }
        });

    });
}

const crear = (descripcion) => {

    try {
        cargarDb();
    } catch (error) {
        listadoPorHacer = [];
    }

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDb();

    /*guardarDb2().then(resp => console.log(resp))
        .catch(err => {
            console.log(err);
        })*/

    return porHacer;

}

const getListado = () => {

    try {
        cargarDb();
    } catch (error) {
        listadoPorHacer = [];
    }

    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }

}

/*const borrarold = (descripcion) => {
    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDb();
        return true;
    } else {
        return false;
    }
}*/

const borrar = (descripcion) => {
    cargarDb();
    let nuevoListadoPorHacer = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListadoPorHacer;
        guardarDb();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}