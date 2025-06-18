import {mongoose} from 'mongoose';
import {config} from 'dotenv';
import expressModule from 'express';
const express = expressModule;
import patito from 'cors';
const cors = patito;
import { ApolloServer } from 'apollo-server-express';
import pkg from 'body-parser';
const bodyParser = pkg;
import { graphqlUploadExpress } from 'graphql-upload-ts';
// Importar modelos
import {
  Usuario,
  Direccion,
  Comuna,
  Ciudad,
  Region,
  Pedido,
  Evaluacion,
  Comentarios,
  Articulo,
  Imagenes,
  InformacionPagina,
  Contacto
} from './models/modelSchemas.js';

// Resolver y tipo de esquemas
import {resolvers} from './schemas/resolvers.js';
import {typeDefs} from './schemas/typeDefs.js';

import { crearUsuario, loginUsuario } from './controllers/usuarioController.js';

// Configuración de variables de entorno
config();

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar con MongoDB:', err));
// Opciones de CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"], // Permitir frontend y Apollo Sandbox
  credentials: true,
};

// Configurar express
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Configuración de Apollo Server
async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });
  app.listen(4000, () => {
    console.log(`🚀 Servidor GraphQL corriendo en http://localhost:4000/graphql`);
  });

}

app.post('/api/usuarios',crearUsuario);
app.post('/api/login', loginUsuario);

app.listen(5000, () => {
  console.log('🚀 Servidor Express corriendo en http://localhost:5000');
});

startServer();