var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Iusuario = new Schema({

    nombre: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        
    },
    /*edad: {
        type:String,
        
    },*/
    fechanacimiento: {
        type:String,
    },
    direccion: {
        type:String,

    },
    colonia: {
        type:String,
     
    },
    cp: {
        type:String,
    
    },
    sexo: {
        type:String,
        
    },
    giro: {
        type:String,
        
    },
    avatar: {
        type:String,
        required: true
    }

});

module.exports = mongoose.model('usuario', Iusuario)