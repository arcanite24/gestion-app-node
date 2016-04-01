/**
* Tarea.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true
    },
    texto: {
      type: 'string',
      required: true
    },
    entrega: {
      type: 'date',
      required: true
    },
    grupo: {
      model: 'grupo'
    }
  }
};
