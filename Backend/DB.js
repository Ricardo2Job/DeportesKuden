const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('🟡 Desconectado de MongoDB correctamente');
  } catch (error) {
    console.error('🔴 Error al desconectarse de MongoDB:', error);
  }
};

module.exports = {
  connectDB,
  disconnectDB
};
