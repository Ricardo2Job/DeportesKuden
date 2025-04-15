const { get } = require('lodash');
const {Usuario, Direccion, Comuna, Ciudad, Region, Pedido, Evaluacion, Comentaios, Articulo, Imagenes, InformacionPagina, Contacto} = require('../models');
const { getEnterLeaverForKind } = require('graphql');

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
                const usuario = new Usuario({ nombre, correo, contrasena, rol, direccion });
                await usuario.save();
                return usuario;
            } catch (error) {
                console.error('Error al agregar el usuario:', error);
                throw error;
            }
        }
    }
}