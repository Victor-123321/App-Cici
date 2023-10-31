const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usuarioModel = require('./src/Usuario/usuarioModel');

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(function () {
  console.log("Conexión Exitosa");
})
.catch(function(error){
  console.log(error);
});

app.post('/api/enviarbdd', (req, res) => {
  
  console.log('Datos del Usuario:', req.body); // Aquí se reciben los datos en JSON del usuario

  const DatosPostBack = req.body;

  const datosModelo = {
    nombre: DatosPostBack.datosGenerales.name,
    email: DatosPostBack.datosGenerales.email,
    fechanacimiento: JSON.stringify(DatosPostBack.infoUsuario.cumpleaños),
    avatar: DatosPostBack.datosGenerales.picture,
    sexo: DatosPostBack.infoUsuario.genero
    //seguir con todos los campos que podamos llenar, hay que ver como llenar los que no, como tomar
    //la ubicación del usuario, su género y su edad
  }

  const nuevoUsuario = new usuarioModel(datosModelo);

  nuevoUsuario.save()
  .then(() => {
    res.status(200).send('Datos Guardados satisfactoriamente');
  })
  .catch((error) => {
    console.error('Error guardando datos: ', error);
    res.status(500).send('Error saving data');
  });

  //Aquí hay que enviarla a la base de datos de Mongo

  
});

  



// Define your MongoDB Schema and Models here
 
// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});