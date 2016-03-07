/**
* Horario.js
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
    grupo_horario: {
      model: 'grupo'
    },
    materias: {
      collection: 'claseHorario',
      via: 'horario'
    }
  }

};
