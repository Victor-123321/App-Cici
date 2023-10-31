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
  

  const DatosPostBack = req.body;

  const datosModelo = {
    nombre: DatosPostBack.datosGenerales.name,
    email: DatosPostBack.datosGenerales.email,
    fechanacimiento: JSON.stringify(DatosPostBack.infoUsuario.cumpleaños),
    avatar: DatosPostBack.datosGenerales.picture,
    sexo: DatosPostBack.infoUsuario.genero
    // Add other fields as needed
  };
  
  async function checkAndSaveUser() {
    try {
      const existingDocument = await usuarioModel.findOne({ email: datosModelo.email });
  
      if (existingDocument) {
        console.log("Usuario ya existente en la base de datos");
      } else {
        const nuevoUsuario = new usuarioModel(datosModelo);
        await nuevoUsuario.save();
        console.log("Usuario guardado en la base de datos");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  checkAndSaveUser();
  //Aquí hay que enviarla a la base de datos de Mongo

  
});

  



// Define your MongoDB Schema and Models here
 
// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});