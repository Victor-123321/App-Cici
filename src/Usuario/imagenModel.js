var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenModel = new Schema({

    
    usuario: {
        type:String,
        required: true
    },
    source: {
        type:String,
        required: true
    },
    nombre: {
        type:String,
        required: true
    },

    detalles: {
        type:String,
        required: true
    },
    ubicacion: {
        type: Object,
        required: true
    }

});
module.exports = mongoose.model('ImagenModel', ImagenModel)