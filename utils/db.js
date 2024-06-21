const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("INFO: Conexión a base de Datos correcta:", conn.connection.name);
  } catch (error) {
    console.error("ERROR:", error.message); // Corregido el manejo del error
    process.exit(1); // Salir del proceso con un error
  }
};

module.exports = connectMongo;
