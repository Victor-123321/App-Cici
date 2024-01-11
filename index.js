const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usuarioModel = require('./src/Usuario/usuarioModel');
const imagenModel = require('./src/Usuario/imagenModel');

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));

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

//Hay que poner un límite de unos 2mb para la imágen

app.post('/api/enviarimagenbdd', (req, res) => {

  const DatosPostBack = req.body;

  const datosModelo = {
    usuario: DatosPostBack.usuario,
    source: DatosPostBack.source,
    nombre: DatosPostBack.nombre,
    detalles: DatosPostBack.detalles,
    ubicacion: DatosPostBack.ubicacion
  }

  const nuevoUsuario = new imagenModel(datosModelo);
   nuevoUsuario.save();

});

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await mongoose.model(datosModelo).find({});
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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

  
});

//Cargar todos los reportes de la base de datos
//TODO: Cargar los datos del usuario que lo subió, mínimo Nombre y Foto
app.get('/api/cargarReportes', async (req, res) => {
  try {
      const images = await imagenModel.find().exec();

      const userEmails = images.map(image => image.usuario);

      const users = await usuarioModel.find({ email: { $in: userEmails } }, 'avatar nombre email');

      const userMap = users.reduce((acc, user) => {
          acc[user.email] = user;
          return acc;
      }, {});

      const mappedImages = images.map(image => ({
          source: image.source,
          nombre: image.nombre,
          detalles: image.detalles,
          ubicacion: image.ubicacion,
          usuario: {
              avatar: userMap[image.usuario].avatar,
              nombre: userMap[image.usuario].nombre,
              email: userMap[image.usuario].email
          }
      }));

      res.status(200).json(mappedImages);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

//Cargar reportes del usuario de la base de datos

app.get('/api/cargarReportesUsuario/:Usuario', async (req,res) => {
  try{
    const videos = await imagenModel.find({}).where('usuario').equals(req.params.Usuario);
    res.json(videos)
  } catch(ex) {
    res.status(500).send(ex);
  }
});

//Actualizar la información del usuario

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});