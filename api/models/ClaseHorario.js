/**
* ClaseHorario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nombre_materia: {
      type: 'string',
      required: true
    },
    dia: 'integer',
    hora_inicio: 'string',
    hora_fin: 'string',
    horario: {
      model: 'horario'
    }
  }
};
