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
  Contacto,
  CamisetaPersonalizada
} from './models/modelSchemas.js';

// Resolver y tipo de esquemas
import {resolvers} from './schemas/resolvers.js';
import {typeDefs} from './schemas/typeDefs.js';

import authRoutes from './Routes/Auth.js';
import commentRoutes from './Routes/Comments.js';

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
  app.use('/api/auth', authRoutes);
  app.use('/api', commentRoutes);
  app.listen(5000, () => {
    console.log('🚀 Servidor corriendo en:');
    console.log(`   - GraphQL: http://localhost:5000/graphql`);
    console.log(`   - API REST: http://localhost:5000/api`);
  });

}

startServer();
