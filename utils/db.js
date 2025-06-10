const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    const port = process.env.CUSTOM_PORT || 3000;
    console.log(
      `✅ Conexión a base de datos correcta: ${conn.connection.name}\n🚀 Servidor escuchando en el puerto ${port}\n🔗 http://localhost:${port}`
    );
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
  }
};

module.exports = connectMongo;