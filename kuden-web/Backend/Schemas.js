const { gql } = require("apollo-server-express");

const typeDefs = gql`

    #Alerta para mensajes de error o exito 
     
    type Alert {
        message: String
    }
    
    # DEFINICION DE USUARIO

    type Usuario {
        id: ID!
        nombre: String!
        contraseña: String!
        correo: String!
        telefono: String!
        rol: String!
        direccion: Direccion
    }

    input UsuarioInput {
        nombre: String!
        contraseña: String!
        correo: String!
        telefono: String!
        rol: String!
        direccion: ID!
    }
    
    # DEFINICION DE DIRECCION

    type Direccion {
        id: ID!
        calle: String!
        numero: String!
        comuna: ID!
    }
    
    input DireccionInput {
        calle: String!
        numero: String!
        comuna: ID!
    }

    # DEFINICION DE COMUNA

    type Comuna {
        id: ID!
        nombre: String!
        ciudad: Ciudad
    }
    
    input ComunaInput {
        nombre: String!
        ciudad: ID!
    }

    # DEFINICION CIUDAD

    type Ciudad {
        id: ID!
        nombre: String!
        region: Region
    }
    
    input CiudadInput {
        nombre: String!
        region: ID!
    }
    
    # DEFINICION DE REGION

    type Region {
        id: ID!
        nombre: String!
    }
    
    input RegionInput {
        nombre: String!
    }

    # DEFINICION DE PEDIDO

    type Pedido {
        id: ID!
        cantidad: Int!
        usuario: Usuario
        articulo: Articulo
    }
    
    input PedidoInput {
        cantidad: int!
        usuario: ID!
        articulo: ID!
    }
    
    # DEFINICION DE EVALUACION

    
`;

module.exports = typeDefs;
