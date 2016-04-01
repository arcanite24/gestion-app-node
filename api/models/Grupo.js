/**
* Grupo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true,
      unique: true
    },
    users: {
      collection: 'user',
      via: 'grupo'
    },
    profesores: {
      collection: 'user',
      via: 'grupoAsProfe'
    },
    horario: {
      collection: 'horario',
      via: 'grupo_horario'
    },
    tareas:{
      collection: 'tarea',
      via: 'grupo'
    }
  }
};
