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
    password: 'string',
    type: {
      type: 'integer',
      defaultsTo: 2
    },
    //Datos personales
    bornDate: 'string',
    name: 'string',
    address: 'string',
    //Relaciones
    datos: {
      collection: 'dato',
      via: 'user'
    }
  }
};
