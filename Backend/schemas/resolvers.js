const { get, add } = require('lodash');
const {Usuario, Direccion, Comuna, Ciudad, Region, Pedido, Evaluacion, Comentaios, Articulo, Imagenes, InformacionPagina, Contacto} = require('../models');
const { getEnterLeaverForKind } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { AutenticationError } = require('apollo-server');

async function deletAll(model){
    try {
        const result = await model.deleteMany({});
        console.log(`Se han eliminado ${result.deletedCount} documentos de ${model.modelName}`);
        return result;
    } catch (error) {
        console.error(`Error al eliminar documentos de ${model.modelName}:`, error);
        throw error;
    }
}

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        // Queries para Usuario
        async getUsuarios (obj){
            try {
                const uruarios = await Usuario.find().populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return uruarios;
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                throw error;
            }
        },
        async getUsuario (obj, { id }){
            try {
                const usuario = await Usuario.findById(id).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                throw error;
            }
        },
        async getUsuarioByNombre (obj, { nombre }){
            try {
                const usuario = await Usuario.find({ nombre }).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario por nombre:', error);
                throw error;
            }
        },
        async getUsuarioByRol (obj, { rol }){
            try {
                const usuario = await Usuario.find({ rol }).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario por rol:', error);
                throw error;
            }
        },
        async getUsuarioByComuna (obj, { comuna }){
            try {
                const usuario = await Usuario.find({ 'direccion.comuna': comuna }).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario por comuna:', error);
                throw error;
            }
        },
        async getUsuarioByCiudad (obj, { ciudad }){
            try {
                const usuario = await Usuario.find({ 'direccion.comuna.ciudad': ciudad }).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario por ciudad:', error);
                throw error;
            }
        },
        async getUsuarioByRegion (obj, { region }){
            try {
                const usuario = await Usuario.find({ 'direccion.comuna.ciudad.region': region }).populate({
                    path: 'direccion',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                    },
                });
                return usuario;
            } catch (error) {
                console.error('Error al obtener el usuario por region:', error);
                throw error;
            }
        },
        // Queries para DIreccion
        async getDirecciones (obj){
            try {
                const direcciones = await Direccion.find();
                return direcciones;
            } catch (error) {
                console.error('Error al obtener las direcciones:', error);
                throw error;
            }
        },
        async getDireccion (obj, { id }){
            try {
                const direccion = await Direccion.findById(id);
                return direccion;
            } catch (error) {
                console.error('Error al obtener la direccion:', error);
                throw error;
            }
        },
        async getDireccionByComuna (obj, { comuna }){
            try {
                const direccion = await Direccion.find({'direccion.comuna': comuna}).populate({
                    path: 'comuna',
                    populate: {
                        path: 'ciudad',
                        populate: {
                            path: 'region',
                        },
                    }
                });
                return direccion;
            } catch (error) {
                console.error('Error al obtener la direccion por comuna:', error);
                throw error;
            }
        },
        async getDireccionByCiudad (obj, { ciudad }){
            try {
                const direccion = await Direccion.find({ 'comuna.ciudad.nombre': ciudad }).populate({
                    path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                });
                return direccion;
            } catch (error) {
                console.error('Error al obtener la direccion por ciudad:', error);
                throw error;
            }
        },
        async getDireccionByRegion (obj, { region }){
            try {
                const direccion = await Direccion.find({ 'comuna.ciudad.region.nombre': region }).populate({
                    path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                            },
                        },
                });
                return direccion;
            } catch (error) {
                console.error('Error al obtener la direccion por region:', error);
                throw error;
            }
        },
        // Queries para Comuna
        async getComunas (obj){
            try {
                const comunas = await Comuna.find();
                return comunas;
            } catch (error) {
                console.error('Error al obtener las comunas:', error);
                throw error;
            }
        },
        async getComuna (obj, { id }){
            try {
                const comuna = await Comuna.findById(id);
                return comuna;
            } catch (error) {
                console.error('Error al obtener la comuna:', error);
                throw error;
            }
        },
        async getComunaByNombre (obj, { nombre }){
            try {
                const comuna = await Comuna.find({ nombre });
                return comuna;
            } catch (error) {
                console.error('Error al obtener la comuna por nombre:', error);
                throw error;
            }
        },
        async getComunaByCiudad (obj, { ciudad }){
            try {
                const comuna = await Comuna.find({ 'ciudad.nombre': ciudad }).populate({
                    path: 'ciudad',
                    populate: 'region',
                });
                return comuna;
            } catch (error) {
                console.error('Error al obtener la comuna por ciudad:', error);
                throw error;
            }
        },
        async getComunaByRegion (obj, { region }){
            try {
                const comuna = await Comuna.find({ 'ciudad.region.nombre': region }).populate({
                    path: 'ciudad',
                    populate: 'region',
                });
                return comuna;
            } catch (error) {
                console.error('Error al obtener la comuna por region:', error);
                throw error;
            }
        },
        // Queries para Ciudad
        async getCiudades (obj){
            try {
                const ciudades = await Ciudad.find();
                return ciudades;
            } catch (error) {
                console.error('Error al obtener las ciudades:', error);
                throw error;
            }
        },
        async getCiudad (obj, { id }){
            try {
                const ciudad = await Ciudad.findById(id);
                return ciudad;
            } catch (error) {
                console.error('Error al obtener la ciudad:', error);
                throw error;
            }
        },
        async getCiudadByNombre (obj, { nombre }){
            try {
                const ciudad = await Ciudad.find({ nombre });
                return ciudad;
            } catch (error) {
                console.error('Error al obtener la ciudad por nombre:', error);
                throw error;
            }
        },
        async getCiudadesByRegion (obj, { region }){
            try {
                const ciudad = await Ciudad.find({ 'region.nombre': region }).populate('region');
                return ciudad;
            } catch (error) {
                console.error('Error al obtener la ciudad por region:', error);
                throw error;
            }
        },
        // Queries para Region
        async getRegiones (obj){
            try {
                const regiones = await Region.find();
                return regiones;
            } catch (error) {
                console.error('Error al obtener las regiones:', error);
                throw error;
            }
        },
        async getRegion (obj, { id }){
            try {
                const region = await Region.findById(id);
                return region;
            } catch (error) {
                console.error('Error al obtener la region:', error);
                throw error;
            }
        },
        async getRegionByNombre (obj, { nombre }){
            try {
                const region = await Region.find({ nombre });
                return region;
            } catch (error) {
                console.error('Error al obtener la region por nombre:', error);
                throw error;
            }
        },
        // Queries para Pedido
        async getPedidos (obj){
            try {
                const pedidos = await Pedido.find()
                    .populate({
                        path: 'usuario',
                        select: 'nombre correo', // Solo campos necesarios
                        populate: {
                            path: 'direccion',
                            select: 'calle numero',
                            populate: {
                                path: 'comuna',
                                select: 'nombre',
                                populate: {
                                    path: 'ciudad',
                                    select: 'nombre',
                                    populate: {
                                        path: 'region',
                                        select: 'nombre',
                                    },
                                },
                            },
                        },
                    })
                    .populate({
                        path: 'articulo',
                        select: 'nombre precio', // Solo campos relevantes
                    });
                return pedidos;
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
                throw error;
            }
        },
        async getPedido (obj, { id }){
            try {
                const pedido = await Pedido.findById(id);
                return pedido;
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
                throw error;
            }
        },
        async getPedidoByUsuario (obj, { usuario }){
            try {
                const pedido = await Pedido.find({ usuario }).populate({
                    path : 'usuario',
                    select: 'nombre correo',
                })
                .populate({
                    path: 'articulo',
                    select: 'nombre precio',
                });
                return pedido;
            } catch (error) {
                console.error('Error al obtener el pedido por usuario:', error);
                throw error;
            }
        },
        async getPedidoByArticulo (obj, { articulo }){
            try {
                const pedido = await Pedido.find({ articulo }).populate({
                    path: 'articulo',
                    select: 'nombre precio',
                })
                .populate({
                    path: 'usuario',
                    select: 'nombre correo',
                    populate: {
                        path: 'direccion',
                        select: 'calle numero',
                        populate: {
                            path: 'comuna',
                            select: 'nombre',
                            populate: {
                                path: 'ciudad',
                                select: 'nombre',
                                populate: {
                                    path: 'region',
                                    select: 'nombre',
                                },
                            },
                        },
                    },
                });
                return pedido;
            } catch (error) {
                console.error('Error al obtener el pedido por articulo:', error);
                throw error;
            }
        },
        async getPedidoByEstado (obj, { estado }){
            try {
                const pedido = await Pedido.find({ estado }).populate({
                    path: 'articulo',
                    select: 'nombre precio',
                })
                .populate({
                    path: 'usuario',
                    select: 'nombre correo',
                    populate: {
                        path: 'direccion',
                        select: 'calle numero',
                        populate: {
                            path: 'comuna',
                            select: 'nombre',
                            populate: {
                                path: 'ciudad',
                                select: 'nombre',
                                populate: {
                                    path: 'region',
                                    select: 'nombre',
                                },
                            },
                        },
                    },
                });
                return pedido;
            } catch (error) {
                console.error('Error al obtener el pedido por estado:', error);
                throw error;
            }
        },
        async getPedidoByFecha (obj, { fecha }){
            try {
                const pedido = await Pedido.find({ fecha }).populate({
                    path: 'articulo',
                    select: 'nombre precio',
                })
                .populate({
                    path: 'usuario',
                    select: 'nombre correo',
                    populate: {
                        path: 'direccion',
                        select: 'calle numero',
                        populate: {
                            path: 'comuna',
                            select: 'nombre',
                            populate: {
                                path: 'ciudad',
                                select: 'nombre',
                                populate: {
                                    path: 'region',
                                    select: 'nombre',
                                },
                            },
                        },
                    },
                });
                return pedido;
            } catch (error) {
                console.error('Error al obtener el pedido por fecha:', error);
                throw error;
            }
        },
        // Queries para Evaluacion
        async getEvaluaciones (obj){
            try {
                const evaluaciones = await Evaluacion.find().populate('usuario');
                return evaluaciones;
            } catch (error) {
                console.error('Error al obtener las evaluaciones:', error);
                throw error;
            }
        },
        async getEvaluacion (obj, { id }){
            try {
                const evaluacion = await Evaluacion.findById(id);
                return evaluacion;
            } catch (error) {
                console.error('Error al obtener la evaluacion:', error);
                throw error;
            }
        },
        async getEvaluacionByUsuario (obj, { usuario }){
            try {
                const evaluacion = await Evaluacion.find({ usuario }).populate('usuario');
                return evaluacion;
            } catch (error) {
                console.error('Error al obtener la evaluacion por usuario:', error);
                throw error;
            }
        },
        // Queries para Comentarios
        async getComentarios (obj){
            try {
                const comentarios = await Comentarios.find().populate({
                    path: 'usuario',
                    select: 'nombre correo',
                });
                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
                throw error;
            }
        },
        async getComentario (obj, { id }){
            try {
                const comentario = await Comentarios.findById(id);
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario:', error);
                throw error;
            }
        },
        async getComentariosByUsuario (obj, { usuario }){
            try {
                const comentario = await Comentarios.find({ usuario }).populate({path: 'usuario', select: 'nombre correo'});
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario por usuario:', error);
                throw error;
            }
        }, 
        async getComentariosByEstado (obj, { estado }){
            try {
                const comentario = await Comentarios.find({ estado }).populate({path: 'usuario', select: 'nombre correo'});
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario por estado:', error);
                throw error;
            }
        },
        async getComentariosByEtiqueta (obj, { etiqueta }){
            try {
                const comentario = await Comentarios.find({ etiqueta }).populate({path: 'usuario', select: 'nombre correo'});
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario por etiqueta:', error);
                throw error;
            }
        },
        async getComentariosByFecha (obj, { fecha }){
            try {
                const comentario = await Comentarios.find({ fecha }).populate({path: 'usuario', select: 'nombre correo'});
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario por fecha:', error);
                throw error;
            }
        },
        async getComentariosByEtiqueta (obj, { etiqueta }){
            try {
                const comentario = await Comentarios.find({ etiqueta }).populate({path: 'usuario', select: 'nombre correo'});
                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario por etiqueta:', error);
                throw error;
            }
        },
        // Queries para Articulo
        async getArticulos (obj){
            try {
                const articulos = await Articulo.find().populate('imagenes');
                return articulos;
            } catch (error) {
                console.error('Error al obtener los articulos:', error);
                throw error;
            }
        },
        async getArticulo (obj, { id }){
            try {
                const articulo = await Articulo.findById(id).populate('imagenes');
                return articulo;
            } catch (error) {
                console.error('Error al obtener el articulo:', error);
                throw error;
            }
        },
        async getArticuloByNombre (obj, { nombre }){
            try {
                const articulo = await Articulo.find({ nombre }).populate('imagenes');
                return articulo;
            } catch (error) {
                console.error('Error al obtener el articulo por nombre:', error);
                throw error;
            }
        },
        async getArticulosByPrecio (obj, { precio }){
            try {
                const articulo = await Articulo.find({ precio }).populate('imagenes');
                return articulo;
            } catch (error) {
                console.error('Error al obtener el articulo por precio:', error);
                throw error;
            }
        },
        async getArticulosByEtiqueta (obj, { etiqueta }){
            try {
                const articulo = await Articulo.find({ etiqueta }).populate('imagenes');
                return articulo;
            } catch (error) {
                console.error('Error al obtener el articulo por etiqueta:', error);
                throw error;
            }
        },
        // Queries para Imagenes
        async getImagenes (obj){
            try {
                const imagenes = await Imagenes.find();
                return imagenes;
            } catch (error) {
                console.error('Error al obtener las imagenes:', error);
                throw error;
            }
        },
        async getImagen (obj, { id }){
            try {
                const imagen = await Imagenes.findById(id);
                return imagen;
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
                throw error;
            }
        },
        async getImagenByNombre (obj, { nombre }){
            try {
                const imagen = await Imagenes.find({ nombre });
                return imagen;
            } catch (error) {
                console.error('Error al obtener la imagen por nombre:', error);
                throw error;
            }
        },
        // Queries para InformacionPagina
        async getInformacionPagina (obj, { id }){
            try {
                const informacionPagina = await InformacionPagina.findById(id);
                return informacionPagina;
            } catch (error) {
                console.error('Error al obtener la informacion de la pagina:', error);
                throw error;
            }
        },
        // Queries para Contacto
        async getContactos (obj){
            try {
                const contactos = await Contacto.find();
                return contactos;
            } catch (error) {
                console.error('Error al obtener los contactos:', error);
                throw error;
            }
        },
        async getContacto (obj, { id }){
            const contacto = await Contacto.findById(id);
            if (!contacto) {
                throw new Error('Contacto no encontrado');
            }
        }
    },
    Mutation: {
        // Mutations para Usuario
        async addUsuario (obj, { nombre, correo, contrasena, rol, direccion }){
            try {
                const usuarioExistente = await Usuario.findOne({ correo });
                if (usuarioExistente) {
                    throw new AutenticationError('El correo ya está en uso');
                }
                const usuario = new Usuario({ nombre, correo, contrasena, rol, direccion });
                if (nombre === '' || correo === '' || contrasena === '' || rol === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await usuario.save();
                return usuario;
            } catch (error) {
                console.error('Error al agregar el usuario:', error);
                throw error;
            }
        },
        async updateUsuario (obj, { id, nombre, correo, contrasena, rol, direccion }){
            try {
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    throw new Error('Usuario no encontrado');
                }
                if (nombre !== undefined) usuario.nombre = nombre;
                if (correo !== undefined) usuario.correo = correo;
                if (contrasena !== undefined) usuario.contrasena = contrasena;
                if (rol !== undefined) usuario.rol = rol;
                if (direccion !== undefined) usuario.direccion = direccion;
                await usuario.save();
                return usuario;
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                throw error;
            }
        },
        async deleteUsuario (obj, { id }){
            try {
                const usuario = await Usuario.findByIdAndDelete(id);
                if (!usuario) {
                    throw new Error('Usuario no encontrado');
                }
                return usuario;
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                throw error;
            }
        },
        // Mutations para Direccion
        async addDireccion (obj, { calle, numero, comuna }){
            try {
                const direccion = new Direccion({ calle, numero, comuna });
                if (calle === '' || numero === '' || comuna === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await direccion.save();
                return direccion;
            } catch (error) {
                console.error('Error al agregar la direccion:', error);
                throw error;
            }
        },
        async updateDireccion (obj, { id, calle, numero, comuna }){
            try {
                const direccion = await Direccion.findById(id);
                if (!direccion) {
                    throw new Error('Direccion no encontrada');
                }
                if (calle !== undefined) direccion.calle = calle;
                if (numero !== undefined) direccion.numero = numero;
                if (comuna !== undefined) direccion.comuna = comuna;
                await direccion.save();
                return direccion;
            } catch (error) {
                console.error('Error al actualizar la direccion:', error);
                throw error;
            }
        },
        async deleteDireccion (obj, { id }){
            try {
                const direccion = await Direccion.findByIdAndDelete(id);
                if (!direccion) {
                    throw new Error('Direccion no encontrada');
                }
                return direccion;
            } catch (error) {
                console.error('Error al eliminar la direccion:', error);
                throw error;
            }
        },
        // Mutations para Comuna
        async addComuna (obj, { nombre, ciudad }){
            try {
                const comuna = new Comuna({ nombre, ciudad });
                if (nombre === '' || ciudad === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await comuna.save();
                return comuna;
            } catch (error) {
                console.error('Error al agregar la comuna:', error);
                throw error;
            }
        },
        async updateComuna (obj, { id, nombre, ciudad }){
            try {
                const comuna = await Comuna.findById(id);
                if (!comuna) {
                    throw new Error('Comuna no encontrada');
                }
                if (nombre !== undefined) comuna.nombre = nombre;
                if (ciudad !== undefined) comuna.ciudad = ciudad;
                await comuna.save();
                return comuna;
            } catch (error) {
                console.error('Error al actualizar la comuna:', error);
                throw error;
            }
        },
        async deleteComuna (obj, { id }){
            try {
                const comuna = await Comuna.findByIdAndDelete(id);
                if (!comuna) {
                    throw new Error('Comuna no encontrada');
                }
                return comuna;
            } catch (error) {
                console.error('Error al eliminar la comuna:', error);
                throw error;
            }
        },
        // Mutations para Ciudad
        async addCiudad (obj, { nombre, region }){
            try {
                const ciudad = new Ciudad({ nombre, region });
                if (nombre === '' || region === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await ciudad.save();
                return ciudad;
            } catch (error) {
                console.error('Error al agregar la ciudad:', error);
                throw error;
            }
        },
        async updateCiudad (obj, { id, nombre, region }){
            try {
                const ciudad = await Ciudad.findById(id);
                if (!ciudad) {
                    throw new Error('Ciudad no encontrada');
                }
                if (nombre !== undefined) ciudad.nombre = nombre;
                if (region !== undefined) ciudad.region = region;
                await ciudad.save();
                return ciudad;
            } catch (error) {
                console.error('Error al actualizar la ciudad:', error);
                throw error;
            }
        },
        async deleteCiudad (obj, { id }){
            try {
                const ciudad = await Ciudad.findByIdAndDelete(id);
                if (!ciudad) {
                    throw new Error('Ciudad no encontrada');
                }
                return ciudad;
            } catch (error) {
                console.error('Error al eliminar la ciudad:', error);
                throw error;
            }
        },
        // Mutations para Region
        async addRegion (obj, { nombre }){
            try {
                const region = new Region({ nombre });
                if (nombre === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await region.save();
                return region;
            } catch (error) {
                console.error('Error al agregar la region:', error);
                throw error;
            }
        },
        async updateRegion (obj, { id, nombre }){
            try {
                const region = await Region.findById(id);
                if (!region) {
                    throw new Error('Region no encontrada');
                }
                if (nombre !== undefined) region.nombre = nombre;
                await region.save();
                return region;
            } catch (error) {
                console.error('Error al actualizar la region:', error);
                throw error;
            }
        },
        async deleteRegion (obj, { id }){
            try {
                const region = await Region.findByIdAndDelete(id);
                if (!region) {
                    throw new Error('Region no encontrada');
                }
                return region;
            } catch (error) {
                console.error('Error al eliminar la region:', error);
                throw error;
            }
        },
        // Mutations para Pedido
        async addPedido (obj, { fecha, total, estado, usuario, direccion }){
            try {
                const pedido = new Pedido({ fecha, total, estado, usuario, direccion });
                if (fecha === '' || total === '' || estado === '' || usuario === '' || direccion === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await pedido.save();
                return pedido;
            } catch (error) {
                console.error('Error al agregar el pedido:', error);
                throw error;
            }
        },
        async updatePedido (obj, { id, estado }){
            try {
                const pedido = Pedido.findById(id);
                if (!pedido) {
                    throw new Error('Pedido no encontrado');
                }
                if (estado !== undefined) pedido.estado = estado;
                await pedido.save();
            } catch (error) {
                console.error('Error al actualizar el pedido:', error);
                throw error;
            }
        },
        async deletePedido (obj, { id }){
            try {
                const pedido = await Pedido.findByIdAndDelete(id);
                if (!pedido) {
                    throw new Error('Pedido no encontrado');
                }
                return pedido;
            } catch (error) {
                console.error('Error al eliminar el pedido:', error);
                throw error;
            }
        },
        // Mutations para Evaluacion
        async addEvaluacion (obj, { puntuacion, usuario }){
            try {
                const evaluacion = new Evaluacion({ puntuacion, usuario });
                if (puntuacion === ''|| usuario === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await evaluacion.save();
                return evaluacion;
            } catch (error) {
                console.error('Error al agregar la evaluacion:', error);
                throw error;
            }
        },
        async updateEvaluacion (obj, { id, puntuacion, comentario }){
            try {
                const evaluacion = await Evaluacion.findById(id);
                if (!evaluacion) {
                    throw new Error('Evaluacion no encontrada');
                }
                if (puntuacion !== undefined) evaluacion.puntuacion = puntuacion;
                await evaluacion.save();
                return evaluacion;
            } catch (error) {
                console.error('Error al actualizar la evaluacion:', error);
                throw error;
            }
        },
        async deleteEvaluacion (obj, { id }){
            try {
                const evaluacion = await Evaluacion.findByIdAndDelete(id);
                if (!evaluacion) {
                    throw new Error('Evaluacion no encontrada');
                }
                return evaluacion;
            } catch (error) {
                console.error('Error al eliminar la evaluacion:', error);
                throw error;
            }
        },
        // Mutations para Comentarios
        async addComentario (obj, { comentario, estado, etiqueta, usuario }){
            try {
                const comentario = new Comentarios({ comentario, estado, etiqueta, usuario });
                if (comentario === '' || estado === '' || etiqueta === '' || usuario === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await comentario.save();
                return comentario;
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
                throw error;
            }
        },
        async updateComentario (obj, { id, comentario, estado, etiqueta }){
            try {
                const comentario = await Comentarios.findById(id);
                if (!comentario) {
                    throw new Error('Comentario no encontrado');
                }
                if (comentario !== undefined) comentario.comentario = comentario;
                if (estado !== undefined) comentario.estado = estado;
                if (etiqueta !== undefined) comentario.etiqueta = etiqueta;
                await comentario.save();
                return comentario;
            } catch (error) {
                console.error('Error al actualizar el comentario:', error);
                throw error;
            }
        },
        async deleteComentario (obj, { id }){
            try {
                const comentario = await Comentarios.findByIdAndDelete(id);
                if (!comentario) {
                    throw new Error('Comentario no encontrado');
                }
                return comentario;
            } catch (error) {
                console.error('Error al eliminar el comentario:', error);
                throw error;
            }
        },
        // Mutations para Articulo
        async addArticulo (obj, { nombre, precio, etiqueta, imagenes }){
            try {
                const articulo = new Articulo({ nombre, precio, etiqueta, imagenes });
                if (nombre === '' || precio === '' || etiqueta === '' || imagenes === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await articulo.save();
                return articulo;
            } catch (error) {
                console.error('Error al agregar el articulo:', error);
                throw error;
            }
        },
        async updateArticulo (obj, { id, nombre, precio, etiqueta, imagenes }){
            try {
                const articulo = await Articulo.findById(id);
                if (!articulo) {
                    throw new Error('Articulo no encontrado');
                }
                if (nombre !== undefined) articulo.nombre = nombre;
                if (precio !== undefined) articulo.precio = precio;
                if (etiqueta !== undefined) articulo.etiqueta = etiqueta;
                if (imagenes !== undefined) articulo.imagenes = imagenes;
                await articulo.save();
                return articulo;
            } catch (error) {
                console.error('Error al actualizar el articulo:', error);
                throw error;
            }
        },
        async deleteArticulo (obj, { id }){
            try {
                const articulo = await Articulo.findByIdAndDelete(id);
                if (!articulo) {
                    throw new Error('Articulo no encontrado');
                }
                return articulo;
            } catch (error) {
                console.error('Error al eliminar el articulo:', error);
                throw error;
            }
        },
        // Mutations para Imagenes
        uploadImage: async (_, { file }) => {
            const { createReadStream, filename } = await file;
      
            // 1. Genera un nombre único para el archivo
            const uniqueName = `${Date.now()}-${filename}`;
            const filePath = path.join(__dirname, 'uploads', uniqueName);
      
            // 2. Guarda el archivo en el servidor
            return new Promise((resolve, reject) => {
              createReadStream()
                .pipe(createWriteStream(filePath))
                .on('finish', () => {
                  resolve({
                    success: true,
                    message: 'Imagen subida correctamente',
                    url: `/uploads/${uniqueName}`, // Ruta accesible públicamente
                  });
                })
                .on('error', (error) => {
                  reject(new Error('Error al subir la imagen: ' + error.message));
                });
            });
        },
        async deleteImagen (obj, { id }){
            try {
                const imagen = await Imagenes.findByIdAndDelete(id);
                if (!imagen) {
                    throw new Error('Imagen no encontrada');
                }
                return imagen;
            } catch (error) {
                console.error('Error al eliminar la imagen:', error);
                throw error;
            }
        },
        // Mutations para InformacionPagina
        async addInformacionPagina (obj, { nombre, descripcion, imagenes }){
            try {
                const informacionPagina = new InformacionPagina({ nombre, descripcion, imagenes });
                if (nombre === '' || descripcion === '' || imagenes === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await informacionPagina.save();
                return informacionPagina;
            } catch (error) {
                console.error('Error al agregar la informacion de la pagina:', error);
                throw error;
            }
        },
        async updateInformacionPagina (obj, { id, nombre, descripcion, imagenes }){
            try {
                const informacionPagina = await InformacionPagina.findById(id);
                if (!informacionPagina) {
                    throw new Error('Informacion de la pagina no encontrada');
                }
                if (nombre !== undefined) informacionPagina.nombre = nombre;
                if (descripcion !== undefined) informacionPagina.descripcion = descripcion;
                if (imagenes !== undefined) informacionPagina.imagenes = imagenes;
                await informacionPagina.save();
                return informacionPagina;
            } catch (error) {
                console.error('Error al actualizar la informacion de la pagina:', error);
                throw error;
            }
        },
        async deleteInformacionPagina (obj, { id }){
            try {
                const informacionPagina = await InformacionPagina.findByIdAndDelete(id);
                if (!informacionPagina) {
                    throw new Error('Informacion de la pagina no encontrada');
                }
                return informacionPagina;
            } catch (error) {
                console.error('Error al eliminar la informacion de la pagina:', error);
                throw error;
            }
        },
        // Mutations para Contacto
        async addContacto (obj, { nombre, correo, telefono }){
            try {
                const contacto = new Contacto({ nombre, correo, telefono });
                if (nombre === '' || correo === '' || telefono === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await contacto.save();
                return contacto;
            } catch (error) {
                console.error('Error al agregar el contacto:', error);
                throw error;
            }
        },
        async updateContacto (obj, { id, nombre, correo, telefono }){
            try {
                const contacto = await Contacto.findById(id);
                if (!contacto) {
                    throw new Error('Contacto no encontrado');
                }
                if (nombre !== undefined) contacto.nombre = nombre;
                if (correo !== undefined) contacto.correo = correo;
                if (telefono !== undefined) contacto.telefono = telefono;
                await contacto.save();
                return contacto;
            } catch (error) {
                console.error('Error al actualizar el contacto:', error);
                throw error;
            }
        },
        async deleteContacto (obj, { id }){
            try {
                const contacto = await Contacto.findByIdAndDelete(id);
                if (!contacto) {
                    throw new Error('Contacto no encontrado');
                }
                return contacto;
            } catch (error) {
                console.error('Error al eliminar el contacto:', error);
                throw error;
            }
        }
    }
};

module.exports = resolvers;