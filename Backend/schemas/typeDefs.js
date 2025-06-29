import { gql } from "apollo-server-express";


const typeDefs = gql`
    #Alerta para mensajes de error o exito 
     
    type Alert {
        message: String
    }
    
    # DEFINICION DE USUARIO

    type Usuario {
        id: ID!
        nombre: String!
        contrasena: String!
        correo: String!
        telefono: String!
        rol: String!
        direccion: String!
    }

    input UsuarioInput {
        nombre: String!
        contrasena: String!
        correo: String!
        telefono: String!
        rol: String!
        direccion: String!
    }
    
    # DEFINICION DE DIRECCION

    type Direccion {
        id: ID!
        calle: String!
        numero: String!
        comunaId: ID!
        comunaData: Comuna
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
        ciudadId: ID!
        ciudadData: Ciudad
    }
    
    input ComunaInput {
        nombre: String!
        ciudad: ID!
    }

    # DEFINICION CIUDAD

    type Ciudad {
        id: ID!
        nombre: String!
        regionId: ID!
        regionData: Region
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
        fecha: String!
        estado: String!
        total: Int!
        usuario: Usuario!
        articulo: Articulo!
    }
    
    input PedidoInput {
        cantidad: Int!
        fecha: String!
        estado: String!
        total: Int!
        usuario: ID!
        articulo: ID!

    }
    
    # DEFINICION DE EVALUACION

    type Evaluacion {
        id: ID!
        estrellas: Int!
        usuario: Usuario
    }
    
    input EvaluacionInput {
        estrellas: Int!
        usuario: ID!
    }
    
    # DEFINICION DE COMENTARIOS

    type Comentarios {
        id: ID!
        comentario: String!
        estado: String!
        etiqueta: String!
        fecha: String!
        usuario: Usuario
    }
    
    input ComentariosInput {
        comentario: String!
        estado: String!
        etiqueta: String!
        fecha: String!
        usuario: ID!
    }

    # DEFINICION DE ARTICULO

    type Articulo {
        id: ID!
        nombre: String!
        precio: Int!
        etiqueta: String!
        imagen: Imagenes
    }
    
    input ArticuloInput {
        nombre: String!
        precio: Int!
        etiqueta: String!
        imagen: ID!
    }

    # DEFINICION DE IMAGENES

    type Imagenes {
        id: ID!
        nombre: String!
        imagen: String!              # Se hará con este formato para almacenar imagenes en el buffer
    }
    scalar Upload

    input ImagenesInput {
        file: Upload!
    }

    # DEFINICION DE INFORMACION PAGINA

    type InformacionPagina{
        id: ID!
        logo: String
        imagenes: [Imagenes]
        contacto: Contacto
    }
    
    input InformacionPaginaInput {
        logo: String
        imagenes: [ID]
        contacto: ID
    }
    
    # DEFINICION DE CONTACTO

    type Contacto {
        id: ID!
        telefono: String!
        instagram: String!
        direccion: Direccion
    }
    
    input ContactoInput {
        telefono: String!
        instagram: String!
        direccion: ID
    }

    # DEFINICION DE CAMISETA PERSONALIZADA

    type CamisetaPersonalizada {
        id: ID!
        modelo: String!
        precio: Int!
        color: String
        talla: String
        nombreJugador: String
        numeroJugador: String
        logo: String
        imagenes: [Imagenes]
        usuario: Usuario!
        pedido: Pedido
    }

    input CamisetaPersonalizadaInput {
        modelo: String!
        precio: Int!
        color: String
        talla: String
        nombreJugador: String
        numeroJugador: String
        logo: String
        imagenes: [ID]
        usuario: ID!
        pedido: ID
    }

    # INICIOOOOOO DE LAS QUERYYYYYYYS

    type Query {

        # Queries para Usuario

        getUsuario(id: ID!): Usuario
        getUsuarios: [Usuario]
        getUsuarioByNombre(nombre: String!): Usuario
        getUsuariosByRol(rol: String!): [Usuario]
        getUsuariosByComuna(comuna: String!): [Usuario]
        getUsuariosByCiudad(ciudad: String!): [Usuario]
        getUsuariosByRegion(region: String!): [Usuario]

        # Queries para Direccion

        getDireccion(id: ID!): Direccion
        getDirecciones: [Direccion]
        getDireccionesByComuna(comuna: String!): [Direccion]
        getDireccionesByCiudad(ciudad: String!): [Direccion]
        getDireccionesByRegion(region: String!): [Direccion]

        # Queries para Comuna

        getComunaById(id: ID!): Comuna
        getComuna(nombre: String!): Comuna
        getComunas: [Comuna]
        getComunasByCiudad(ciudad: String!): [Comuna]
        getComunasByRegion(region: String!): [Comuna]

        # QUeries para Ciudad

        getCiudad(id: ID!): Ciudad
        getCiudadByNombre(nombre: String!): Ciudad
        getCiudades: [Ciudad]
        getCiudadesByRegion(region: String!): [Ciudad]

        # Queries para Region

        getRegion(id: ID!): Region
        getRegionByNombre(nombre: String!): Region
        getRegiones: [Region]

        # Queries para Pedido

        getPedido(id: ID!): Pedido
        getPedidos: [Pedido]
        getPedidosByUsuario(usuario: ID!): [Pedido]
        getPedidosByArticulo(articulo: String!): [Pedido]
        getPedidosByEstado(estado: String!): [Pedido]
        getPedidosByFecha(fecha: String!): [Pedido]

        # Queries para Evaluacion

        getEvaluacion(id: ID!): Evaluacion
        getEvaluaciones: [Evaluacion]
        getEvaluacionByUsuario(usuario: ID!): [Evaluacion]

        # Queries para Comentarios

        getComentario(id: ID!): Comentarios
        getComentarios: [Comentarios]
        getComentariosByUsuario(usuario: ID!): [Comentarios]
        getComentariosByEstado(estado: String!): [Comentarios]
        getComentariosByEtiqueta(etiqueta: String!): [Comentarios]
        getComentariosByFecha(fecha: String!): [Comentarios]
        getCimentariosByEtiqueta(etiqueta: String!): [Comentarios]

        # Queries para Articulo

        getArticulo(id: ID!): Articulo
        getArticulos: [Articulo]
        getArticuloByNombre(nombre: String!): Articulo
        getArticulosByPrecio(precio: Int!): [Articulo]
        getArticulosByEtiqueta(etiqueta: String!): [Articulo]

        # Queries para Imagenes

        getImagen(id: ID!): Imagenes
        getImagenes: [Imagenes]
        getImagenByNombre(nombre: String!): Imagenes

        # Queries para InformacionPagina

        getInformacionPagina(id: ID!): InformacionPagina

        # Queries para Contacto

        getContacto(id: ID!): Contacto
        getContactos: [Contacto]

        # Queries para Camiseta Personalizada
        getCamisetaPersonalizada(id: ID!): CamisetaPersonalizada
        getCamisetasPersonalizadas: [CamisetaPersonalizada]
        getCamisetasByUsuario(usuario: ID!): [CamisetaPersonalizada]
        getCamisetasPersonalizadasByPedido(pedido: ID!): [CamisetaPersonalizada]
    }

    # INICIOOOOOO DE LAS MUTACIONES

    type Mutation {

        # Mutation para Usuario

        addUsuario(input: UsuarioInput): Usuario
        updateUsuario(id: ID!, input: UsuarioInput): Usuario
        deleteUsuario(id: ID!): Alert

        # Mutation para Direccion
        addDireccion(input: DireccionInput): Direccion
        updateDireccion(id: ID!, input: DireccionInput): Direccion
        deleteDireccion(id: ID!): Alert

        # Mutation para Comuna
        addComuna(input: ComunaInput): Comuna
        updateComuna(id: ID!, input: ComunaInput): Comuna
        deleteComuna(id: ID!): Alert

        # Mutation para Ciudad
        addCiudad(input: CiudadInput): Ciudad
        updateCiudad(id: ID!, input: CiudadInput): Ciudad
        deleteCiudad(id: ID!): Alert

        # Mutation para Region
        addRegion(input: RegionInput): Region
        updateRegion(id: ID!, input: RegionInput): Region
        deleteRegion(id: ID!): Alert

        # Mutation para Pedido
        addPedido(input: PedidoInput): Pedido
        updatePedido(id: ID!, input: PedidoInput): Pedido
        deletePedido(id: ID!): Alert

        # Mutation para Evaluacion
        addEvaluacion(input: EvaluacionInput): Evaluacion
        updateEvaluacion(id: ID!, input: EvaluacionInput): Evaluacion
        deleteEvaluacion(id: ID!): Alert

        # Mutation para Comentarios
        addComentario(input: ComentariosInput): Comentarios
        updateComentario(id: ID!, input: ComentariosInput): Comentarios
        deleteComentario(id: ID!): Alert

        # Mutation para Articulo
        addArticulo(input: ArticuloInput): Articulo
        updateArticulo(id: ID!, input: ArticuloInput): Articulo
        deleteArticulo(id: ID!): Alert

        # Mutation para Imagenes
        uploadImagen(input: ImagenesInput): Imagenes
        deleteImagen(id: ID!): Alert

        # Mutation para InformacionPagina
        addInformacionPagina(input: InformacionPaginaInput): InformacionPagina
        updateInformacionPagina(id: ID!, input: InformacionPaginaInput): InformacionPagina
        deleteInformacionPagina(id: ID!): Alert

        # Mutation para Contacto
        addContacto(input: ContactoInput): Contacto
        updateContacto(id: ID!, input: ContactoInput): Contacto
        deleteContacto(id: ID!): Alert

        # Mutation para Camiseta Personalizada
        addCamisetaPersonalizada(input: CamisetaPersonalizadaInput): CamisetaPersonalizada
        updateCamisetaPersonalizada(id: ID!, input: CamisetaPersonalizadaInput): CamisetaPersonalizada
        deleteCamisetaPersonalizada(id: ID!): Alert

    }
`;

export {typeDefs};