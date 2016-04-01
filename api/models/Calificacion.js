/**
* Calificacion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    parcial: {
      type: 'integer',
      enum: [1, 2, 3],
      required: true
    },
    user: {
      model: 'user'
    },
    materia: {
      model: 'clase'
    },
    value: {
      type: 'integer',
      required: true
    }
  }
};
