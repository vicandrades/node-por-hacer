const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripcion de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'marca como completado o pendiente una tarea'
};

const argv = require('yargs')
    .command('crear', 'crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'actualiza el estado de una tarea por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'elimina un tarea de la lista de tareas por hacer', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}