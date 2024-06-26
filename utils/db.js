const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "INFO: Conexión a base de Datos correcta:",
      conn.connection.name
    );
  } catch (error) {
   error.message;
  }
};

module.exports = connectMongo;