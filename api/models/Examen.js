/**
* Examen.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    fecha: {
      type: 'date',
      required: true
    },
    hora: {
      type: 'string',
      required: true
    },
    materia: {
      model: 'clase'
    }
  }
};
