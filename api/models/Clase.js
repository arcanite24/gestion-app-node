/**
* Clase.js
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
    semestre: {
      type: 'integer',
      enum: [1, 2, 3, 4, 5, 6],
      required: true
    }
  }
};
