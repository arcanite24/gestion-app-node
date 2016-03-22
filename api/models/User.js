/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },
    password: {
      type: 'string',
      required: true
    },
    type: {
      type: 'integer',
      required: true
    },
    //Datos personales
    bornDate: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    //Relaciones
    datos: {
      collection: 'dato',
      via: 'user'
    },
    grupo: {
      model: 'grupo'
    },
    grupoAsProfe: {
      model: 'grupo'
    },
    notas: {
      collection: 'nota',
      via: 'user'
    }
  }
};
