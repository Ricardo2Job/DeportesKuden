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
  } from '../models/modelSchemas.js';
import { GraphQLUpload } from 'graphql-upload-ts';

import { AuthenticationError } from 'apollo-server-express';


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
                const usuarios = await Usuario.find()
                    .populate({
                        path: 'direccion',
                        populate: [{
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region'
                                }
                            }
                        }]
                    });

                // Transformar el resultado para asegurar que los IDs se manejen correctamente
                const usuariosFormateados = usuarios.map(usuario => {
                    const usuarioObj = usuario.toObject();
                    if (usuarioObj.direccion) {
                        if (usuarioObj.direccion.comuna) {
                            usuarioObj.direccion.comunaId = usuarioObj.direccion.comuna._id;
                            usuarioObj.direccion.comunaData = {
                                ...usuarioObj.direccion.comuna,
                                ciudadId: usuarioObj.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...usuarioObj.direccion.comuna.ciudad,
                                    regionId: usuarioObj.direccion.comuna.ciudad.region._id,
                                    regionData: usuarioObj.direccion.comuna.ciudad.region
                                }
                            };
                            delete usuarioObj.direccion.comuna;
                        }
                    }
                    return usuarioObj;
                });

                return usuariosFormateados;
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
                const usuario = await Usuario.find({ nombre })
                return usuario[0]; // Retornamos solo el primer usuario encontrado según el schema
            } catch (error) {
                console.error('Error al obtener los usuarios por nombre:', error);
                throw error;
            }
        },
        async getUsuariosByRol (obj, { rol }){
            try {
                const usuarios = await Usuario.find({ rol })
                    .populate({
                        path: 'direccion',
                        populate: [{
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region'
                                }
                            }
                        }]
                    });

                const usuariosFormateados = usuarios.map(usuario => {
                    const usuarioObj = usuario.toObject();
                    if (usuarioObj.direccion) {
                        if (usuarioObj.direccion.comuna) {
                            usuarioObj.direccion.comunaId = usuarioObj.direccion.comuna._id;
                            usuarioObj.direccion.comunaData = {
                                ...usuarioObj.direccion.comuna,
                                ciudadId: usuarioObj.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...usuarioObj.direccion.comuna.ciudad,
                                    regionId: usuarioObj.direccion.comuna.ciudad.region._id,
                                    regionData: usuarioObj.direccion.comuna.ciudad.region
                                }
                            };
                            delete usuarioObj.direccion.comuna;
                        }
                    }
                    return usuarioObj;
                });

                return usuariosFormateados;
            } catch (error) {
                console.error('Error al obtener los usuarios por rol:', error);
                throw error;
            }
        },
        async getUsuariosByComuna (obj, { comuna }){
            try {
                const usuarios = await Usuario.find()
                    .populate({
                        path: 'direccion',
                        populate: [{
                            path: 'comuna',
                            model: 'Comuna',
                            match: { nombre: comuna },
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region'
                                }
                            }
                        }]
                    });

                const usuariosFiltrados = usuarios.filter(usuario => 
                    usuario.direccion && 
                    usuario.direccion.comuna && 
                    usuario.direccion.comuna.nombre === comuna
                );

                const usuariosFormateados = usuariosFiltrados.map(usuario => {
                    const usuarioObj = usuario.toObject();
                    if (usuarioObj.direccion) {
                        if (usuarioObj.direccion.comuna) {
                            usuarioObj.direccion.comunaId = usuarioObj.direccion.comuna._id;
                            usuarioObj.direccion.comunaData = {
                                ...usuarioObj.direccion.comuna,
                                ciudadId: usuarioObj.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...usuarioObj.direccion.comuna.ciudad,
                                    regionId: usuarioObj.direccion.comuna.ciudad.region._id,
                                    regionData: usuarioObj.direccion.comuna.ciudad.region
                                }
                            };
                            delete usuarioObj.direccion.comuna;
                        }
                    }
                    return usuarioObj;
                });

                return usuariosFormateados;
            } catch (error) {
                console.error('Error al obtener los usuarios por comuna:', error);
                throw error;
            }
        },
        async getUsuariosByCiudad (obj, { ciudad }){
            try {
                const usuarios = await Usuario.find()
                    .populate({
                        path: 'direccion',
                        populate: [{
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                match: { nombre: ciudad }
                            }
                        }]
                    });

                // Filtrar usuarios que tienen la ciudad especificada
                const usuariosFiltrados = usuarios.filter(usuario => 
                    usuario.direccion && 
                    usuario.direccion.comuna && 
                    usuario.direccion.comuna.ciudad && 
                    usuario.direccion.comuna.ciudad.nombre === ciudad
                );

                // Transformar el resultado para asegurar que los IDs se manejen correctamente
                const usuariosFormateados = usuariosFiltrados.map(usuario => {
                    const usuarioObj = usuario.toObject();
                    if (usuarioObj.direccion) {
                        if (usuarioObj.direccion.comuna) {
                            usuarioObj.direccion.comunaId = usuarioObj.direccion.comuna._id;
                            usuarioObj.direccion.comunaData = {
                                ...usuarioObj.direccion.comuna,
                                ciudadId: usuarioObj.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...usuarioObj.direccion.comuna.ciudad,
                                    regionId: usuarioObj.direccion.comuna.ciudad.region._id,
                                    regionData: usuarioObj.direccion.comuna.ciudad.region
                                }
                            };
                            delete usuarioObj.direccion.comuna;
                        }
                    }
                    return usuarioObj;
                });

                return usuariosFormateados;
            } catch (error) {
                console.error('Error al obtener los usuarios por ciudad:', error);
                throw error;
            }
        },
        async getUsuariosByRegion (obj, { region }){
            try {
                const usuarios = await Usuario.find()
                    .populate({
                        path: 'direccion',
                        populate: [{
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region',
                                    match: { nombre: region }
                                }
                            }
                        }]
                    });

                const usuariosFiltrados = usuarios.filter(usuario => 
                    usuario.direccion && 
                    usuario.direccion.comuna && 
                    usuario.direccion.comuna.ciudad && 
                    usuario.direccion.comuna.ciudad.region && 
                    usuario.direccion.comuna.ciudad.region.nombre === region
                );

                const usuariosFormateados = usuariosFiltrados.map(usuario => {
                    const usuarioObj = usuario.toObject();
                    if (usuarioObj.direccion) {
                        if (usuarioObj.direccion.comuna) {
                            usuarioObj.direccion.comunaId = usuarioObj.direccion.comuna._id;
                            usuarioObj.direccion.comunaData = {
                                ...usuarioObj.direccion.comuna,
                                ciudadId: usuarioObj.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...usuarioObj.direccion.comuna.ciudad,
                                    regionId: usuarioObj.direccion.comuna.ciudad.region._id,
                                    regionData: usuarioObj.direccion.comuna.ciudad.region
                                }
                            };
                            delete usuarioObj.direccion.comuna;
                        }
                    }
                    return usuarioObj;
                });

                return usuariosFormateados;
            } catch (error) {
                console.error('Error al obtener los usuarios por region:', error);
                throw error;
            }
        },
        // Queries para DIreccion
        async getDirecciones (obj){
            try {
                const direcciones = await Direccion.find()
                    .populate({
                        path: 'comuna',
                        model: 'Comuna',
                        populate: {
                            path: 'ciudad',
                            model: 'Ciudad',
                            populate: {
                                path: 'region',
                                model: 'Region'
                            }
                        }
                    });

                const direccionesFormateadas = direcciones.map(direccion => {
                    const direccionObj = direccion.toObject();
                    if (direccionObj.comuna) {
                        direccionObj.comunaId = direccionObj.comuna._id;
                        direccionObj.comunaData = {
                            ...direccionObj.comuna,
                            ciudadId: direccionObj.comuna.ciudad._id,
                            ciudadData: {
                                ...direccionObj.comuna.ciudad,
                                regionId: direccionObj.comuna.ciudad.region._id,
                                regionData: direccionObj.comuna.ciudad.region
                            }
                        };
                        delete direccionObj.comuna;
                    }
                    return direccionObj;
                });

                return direccionesFormateadas;
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
        async getDireccionesByComuna (obj, { comuna }){
            try {
                const direcciones = await Direccion.find()
                    .populate({
                        path: 'comuna',
                        model: 'Comuna',
                        match: { nombre: comuna },
                        populate: {
                            path: 'ciudad',
                            model: 'Ciudad',
                            populate: {
                                path: 'region',
                                model: 'Region'
                            }
                        }
                    });

                const direccionesFiltradas = direcciones.filter(direccion => 
                    direccion.comuna && direccion.comuna.nombre === comuna
                );

                const direccionesFormateadas = direccionesFiltradas.map(direccion => {
                    const direccionObj = direccion.toObject();
                    if (direccionObj.comuna) {
                        direccionObj.comunaId = direccionObj.comuna._id;
                        direccionObj.comunaData = {
                            ...direccionObj.comuna,
                            ciudadId: direccionObj.comuna.ciudad._id,
                            ciudadData: {
                                ...direccionObj.comuna.ciudad,
                                regionId: direccionObj.comuna.ciudad.region._id,
                                regionData: direccionObj.comuna.ciudad.region
                            }
                        };
                        delete direccionObj.comuna;
                    }
                    return direccionObj;
                });

                return direccionesFormateadas;
            } catch (error) {
                console.error('Error al obtener las direcciones por comuna:', error);
                throw error;
            }
        },
        async getDireccionesByCiudad (obj, { ciudad }){
            try {
                const direcciones = await Direccion.find()
                    .populate({
                        path: 'comuna',
                        model: 'Comuna',
                        populate: {
                            path: 'ciudad',
                            model: 'Ciudad',
                            match: { nombre: ciudad },
                            populate: {
                                path: 'region',
                                model: 'Region'
                            }
                        }
                    });

                const direccionesFiltradas = direcciones.filter(direccion => 
                    direccion.comuna && 
                    direccion.comuna.ciudad && 
                    direccion.comuna.ciudad.nombre === ciudad
                );

                const direccionesFormateadas = direccionesFiltradas.map(direccion => {
                    const direccionObj = direccion.toObject();
                    if (direccionObj.comuna) {
                        direccionObj.comunaId = direccionObj.comuna._id;
                        direccionObj.comunaData = {
                            ...direccionObj.comuna,
                            ciudadId: direccionObj.comuna.ciudad._id,
                            ciudadData: {
                                ...direccionObj.comuna.ciudad,
                                regionId: direccionObj.comuna.ciudad.region._id,
                                regionData: direccionObj.comuna.ciudad.region
                            }
                        };
                        delete direccionObj.comuna;
                    }
                    return direccionObj;
                });

                return direccionesFormateadas;
            } catch (error) {
                console.error('Error al obtener las direcciones por ciudad:', error);
                throw error;
            }
        },
        async getDireccionesByRegion (obj, { region }){
            try {
                const direcciones = await Direccion.find()
                    .populate({
                        path: 'comuna',
                        model: 'Comuna',
                        populate: {
                            path: 'ciudad',
                            model: 'Ciudad',
                            populate: {
                                path: 'region',
                                model: 'Region',
                                match: { nombre: region }
                            }
                        }
                    });

                const direccionesFiltradas = direcciones.filter(direccion => 
                    direccion.comuna && 
                    direccion.comuna.ciudad && 
                    direccion.comuna.ciudad.region && 
                    direccion.comuna.ciudad.region.nombre === region
                );

                const direccionesFormateadas = direccionesFiltradas.map(direccion => {
                    const direccionObj = direccion.toObject();
                    if (direccionObj.comuna) {
                        direccionObj.comunaId = direccionObj.comuna._id;
                        direccionObj.comunaData = {
                            ...direccionObj.comuna,
                            ciudadId: direccionObj.comuna.ciudad._id,
                            ciudadData: {
                                ...direccionObj.comuna.ciudad,
                                regionId: direccionObj.comuna.ciudad.region._id,
                                regionData: direccionObj.comuna.ciudad.region
                            }
                        };
                        delete direccionObj.comuna;
                    }
                    return direccionObj;
                });

                return direccionesFormateadas;
            } catch (error) {
                console.error('Error al obtener las direcciones por region:', error);
                throw error;
            }
        },
        // Queries para Comuna
        async getComunas (obj){
            try {
                const comunas = await Comuna.find()
                    .populate({
                        path: 'ciudad',
                        model: 'Ciudad',
                        populate: {
                            path: 'region',
                            model: 'Region'
                        }
                    });

                const comunasFormateadas = comunas.map(comuna => {
                    const comunaObj = comuna.toObject();
                    if (comunaObj.ciudad) {
                        comunaObj.ciudadId = comunaObj.ciudad._id;
                        comunaObj.ciudadData = {
                            ...comunaObj.ciudad,
                            regionId: comunaObj.ciudad.region._id,
                            regionData: comunaObj.ciudad.region
                        };
                        delete comunaObj.ciudad;
                    }
                    return comunaObj;
                });

                return comunasFormateadas;
            } catch (error) {
                console.error('Error al obtener las comunas:', error);
                throw error;
            }
        },
        async getComunaById (obj, { id }){
            try {
                const comuna = await Comuna.findById(id)
                    .populate({
                        path: 'ciudad',
                        model: 'Ciudad',
                        populate: {
                            path: 'region',
                            model: 'Region'
                        }
                    });

                if (!comuna) {
                    throw new Error('Comuna no encontrada');
                }

                const comunaObj = comuna.toObject();
                if (comunaObj.ciudad) {
                    comunaObj.ciudadId = comunaObj.ciudad._id;
                    comunaObj.ciudadData = {
                        ...comunaObj.ciudad,
                        regionId: comunaObj.ciudad.region._id,
                        regionData: comunaObj.ciudad.region
                    };
                    delete comunaObj.ciudad;
                }

                return comunaObj;
            } catch (error) {
                console.error('Error al obtener la comuna:', error);
                throw error;
            }
        },
        async getComuna (obj, { nombre }){
            try {
                const comunas = await Comuna.find({ nombre })
                    .populate({
                        path: 'ciudad',
                        model: 'Ciudad',
                        populate: {
                            path: 'region',
                            model: 'Region'
                        }
                    });

                const comunasFormateadas = comunas.map(comuna => {
                    const comunaObj = comuna.toObject();
                    if (comunaObj.ciudad) {
                        comunaObj.ciudadId = comunaObj.ciudad._id;
                        comunaObj.ciudadData = {
                            ...comunaObj.ciudad,
                            regionId: comunaObj.ciudad.region._id,
                            regionData: comunaObj.ciudad.region
                        };
                        delete comunaObj.ciudad;
                    }
                    return comunaObj;
                });

                return comunasFormateadas[0]; // Retornamos solo la primera comuna encontrada según el schema
            } catch (error) {
                console.error('Error al obtener la comuna por nombre:', error);
                throw error;
            }
        },
        async getComunasByCiudad (obj, { ciudad }){
            try {
                const comunas = await Comuna.find()
                    .populate({
                        path: 'ciudad',
                        model: 'Ciudad',
                        match: { nombre: ciudad },
                        populate: {
                            path: 'region',
                            model: 'Region'
                        }
                    });

                const comunasFiltradas = comunas.filter(comuna => 
                    comuna.ciudad && comuna.ciudad.nombre === ciudad
                );

                const comunasFormateadas = comunasFiltradas.map(comuna => {
                    const comunaObj = comuna.toObject();
                    if (comunaObj.ciudad) {
                        comunaObj.ciudadId = comunaObj.ciudad._id;
                        comunaObj.ciudadData = {
                            ...comunaObj.ciudad,
                            regionId: comunaObj.ciudad.region._id,
                            regionData: comunaObj.ciudad.region
                        };
                        delete comunaObj.ciudad;
                    }
                    return comunaObj;
                });

                return comunasFormateadas;
            } catch (error) {
                console.error('Error al obtener las comunas por ciudad:', error);
                throw error;
            }
        },
        async getComunasByRegion (obj, { region }){
            try {
                const comunas = await Comuna.find()
                    .populate({
                        path: 'ciudad',
                        model: 'Ciudad',
                        populate: {
                            path: 'region',
                            model: 'Region',
                            match: { nombre: region }
                        }
                    });

                const comunasFiltradas = comunas.filter(comuna => 
                    comuna.ciudad && 
                    comuna.ciudad.region && 
                    comuna.ciudad.region.nombre === region
                );

                const comunasFormateadas = comunasFiltradas.map(comuna => {
                    const comunaObj = comuna.toObject();
                    if (comunaObj.ciudad) {
                        comunaObj.ciudadId = comunaObj.ciudad._id;
                        comunaObj.ciudadData = {
                            ...comunaObj.ciudad,
                            regionId: comunaObj.ciudad.region._id,
                            regionData: comunaObj.ciudad.region
                        };
                        delete comunaObj.ciudad;
                    }
                    return comunaObj;
                });

                return comunasFormateadas;
            } catch (error) {
                console.error('Error al obtener las comunas por región:', error);
                throw error;
            }
        },
        // Queries para Ciudad
        async getCiudades (obj){
            try {
                const ciudades = await Ciudad.find()
                    .populate({
                        path: 'region',
                        model: 'Region'
                    });

                const ciudadesFormateadas = ciudades.map(ciudad => {
                    const ciudadObj = ciudad.toObject();
                    if (ciudadObj.region) {
                        ciudadObj.regionId = ciudadObj.region._id;
                        ciudadObj.regionData = ciudadObj.region;
                        delete ciudadObj.region;
                    }
                    return ciudadObj;
                });

                return ciudadesFormateadas;
            } catch (error) {
                console.error('Error al obtener las ciudades:', error);
                throw error;
            }
        },
        async getCiudad (obj, { id }){
            try {
                const ciudad = await Ciudad.findById(id)
                    .populate({
                        path: 'region',
                        model: 'Region'
                    });

                if (!ciudad) {
                    throw new Error('Ciudad no encontrada');
                }

                const ciudadObj = ciudad.toObject();
                if (ciudadObj.region) {
                    ciudadObj.regionId = ciudadObj.region._id;
                    ciudadObj.regionData = ciudadObj.region;
                    delete ciudadObj.region;
                }

                return ciudadObj;
            } catch (error) {
                console.error('Error al obtener la ciudad:', error);
                throw error;
            }
        },
        async getCiudadByNombre (obj, { nombre }){
            try {
                const ciudades = await Ciudad.find({ nombre })
                    .populate({
                        path: 'region',
                        model: 'Region'
                    });

                if (ciudades.length === 0) {
                    return null;
                }

                const ciudadObj = ciudades[0].toObject();
                if (ciudadObj.region) {
                    ciudadObj.regionId = ciudadObj.region._id;
                    ciudadObj.regionData = ciudadObj.region;
                    delete ciudadObj.region;
                }

                return ciudadObj;
            } catch (error) {
                console.error('Error al obtener la ciudad por nombre:', error);
                throw error;
            }
        },
        async getCiudadesByRegion (obj, { region }){
            try {
                const ciudades = await Ciudad.find()
                    .populate({
                        path: 'region',
                        model: 'Region',
                        match: { nombre: region }
                    });

                const ciudadesFiltradas = ciudades.filter(ciudad => 
                    ciudad.region && ciudad.region.nombre === region
                );

                const ciudadesFormateadas = ciudadesFiltradas.map(ciudad => {
                    const ciudadObj = ciudad.toObject();
                    if (ciudadObj.region) {
                        ciudadObj.regionId = ciudadObj.region._id;
                        ciudadObj.regionData = ciudadObj.region;
                        delete ciudadObj.region;
                    }
                    return ciudadObj;
                });

                return ciudadesFormateadas;
            } catch (error) {
                console.error('Error al obtener las ciudades por región:', error);
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
                if (!region) {
                    throw new Error('Región no encontrada');
                }
                return region;
            } catch (error) {
                console.error('Error al obtener la región:', error);
                throw error;
            }
        },
        async getRegionByNombre (obj, { nombre }){
            try {
                const regiones = await Region.find({ nombre });
                return regiones[0]; // Retornamos solo la primera región encontrada según el schema
            } catch (error) {
                console.error('Error al obtener la región por nombre:', error);
                throw error;
            }
        },
        // Queries para Pedido
        async getPedidos (obj){
            try {
                const pedidos = await Pedido.find()
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                const pedidosFormateados = pedidos.map(pedido => {
                    const pedidoObj = pedido.toObject();
                    
                    // Formatear datos del usuario
                    if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                        if (pedidoObj.usuario.direccion.comuna) {
                            pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                            pedidoObj.usuario.direccion.comunaData = {
                                ...pedidoObj.usuario.direccion.comuna,
                                ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...pedidoObj.usuario.direccion.comuna.ciudad,
                                    regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                    regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                                }
                            };
                            delete pedidoObj.usuario.direccion.comuna;
                        }
                    }

                    return pedidoObj;
                });

                return pedidosFormateados;
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
                throw error;
            }
        },
        async getPedido (obj, { id }){
            try {
                const pedido = await Pedido.findById(id)
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                if (!pedido) {
                    throw new Error('Pedido no encontrado');
                }

                const pedidoObj = pedido.toObject();
                
                // Formatear datos del usuario
                if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                    if (pedidoObj.usuario.direccion.comuna) {
                        pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                        pedidoObj.usuario.direccion.comunaData = {
                            ...pedidoObj.usuario.direccion.comuna,
                            ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                            ciudadData: {
                                ...pedidoObj.usuario.direccion.comuna.ciudad,
                                regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                            }
                        };
                        delete pedidoObj.usuario.direccion.comuna;
                    }
                }

                return pedidoObj;
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
                throw error;
            }
        },
        async getPedidosByUsuario (obj, { usuario }){
            try {
                const pedidos = await Pedido.find({ usuario })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                const pedidosFormateados = pedidos.map(pedido => {
                    const pedidoObj = pedido.toObject();
                    
                    // Formatear datos del usuario
                    if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                        if (pedidoObj.usuario.direccion.comuna) {
                            pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                            pedidoObj.usuario.direccion.comunaData = {
                                ...pedidoObj.usuario.direccion.comuna,
                                ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...pedidoObj.usuario.direccion.comuna.ciudad,
                                    regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                    regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                                }
                            };
                            delete pedidoObj.usuario.direccion.comuna;
                        }
                    }

                    return pedidoObj;
                });

                return pedidosFormateados;
            } catch (error) {
                console.error('Error al obtener los pedidos por usuario:', error);
                throw error;
            }
        },
        async getPedidosByArticulo (obj, { articulo }){
            try {
                const pedidos = await Pedido.find({ articulo })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                const pedidosFormateados = pedidos.map(pedido => {
                    const pedidoObj = pedido.toObject();
                    
                    // Formatear datos del usuario
                    if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                        if (pedidoObj.usuario.direccion.comuna) {
                            pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                            pedidoObj.usuario.direccion.comunaData = {
                                ...pedidoObj.usuario.direccion.comuna,
                                ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...pedidoObj.usuario.direccion.comuna.ciudad,
                                    regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                    regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                                }
                            };
                            delete pedidoObj.usuario.direccion.comuna;
                        }
                    }

                    return pedidoObj;
                });

                return pedidosFormateados;
            } catch (error) {
                console.error('Error al obtener los pedidos por artículo:', error);
                throw error;
            }
        },
        async getPedidosByEstado (obj, { estado }){
            try {
                const pedidos = await Pedido.find({ estado })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                const pedidosFormateados = pedidos.map(pedido => {
                    const pedidoObj = pedido.toObject();
                    
                    // Formatear datos del usuario
                    if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                        if (pedidoObj.usuario.direccion.comuna) {
                            pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                            pedidoObj.usuario.direccion.comunaData = {
                                ...pedidoObj.usuario.direccion.comuna,
                                ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...pedidoObj.usuario.direccion.comuna.ciudad,
                                    regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                    regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                                }
                            };
                            delete pedidoObj.usuario.direccion.comuna;
                        }
                    }

                    return pedidoObj;
                });

                return pedidosFormateados;
            } catch (error) {
                console.error('Error al obtener los pedidos por estado:', error);
                throw error;
            }
        },
        async getPedidosByFecha (obj, { fecha }){
            try {
                const pedidos = await Pedido.find({ fecha })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono',
                        populate: {
                            path: 'direccion',
                            model: 'Direccion',
                            populate: {
                                path: 'comuna',
                                model: 'Comuna',
                                populate: {
                                    path: 'ciudad',
                                    model: 'Ciudad',
                                    populate: {
                                        path: 'region',
                                        model: 'Region'
                                    }
                                }
                            }
                        }
                    })
                    .populate({
                        path: 'articulo',
                        model: 'Articulo',
                        select: 'nombre precio etiqueta',
                        populate: {
                            path: 'imagenes',
                            model: 'Imagenes'
                        }
                    });

                const pedidosFormateados = pedidos.map(pedido => {
                    const pedidoObj = pedido.toObject();
                    
                    // Formatear datos del usuario
                    if (pedidoObj.usuario && pedidoObj.usuario.direccion) {
                        if (pedidoObj.usuario.direccion.comuna) {
                            pedidoObj.usuario.direccion.comunaId = pedidoObj.usuario.direccion.comuna._id;
                            pedidoObj.usuario.direccion.comunaData = {
                                ...pedidoObj.usuario.direccion.comuna,
                                ciudadId: pedidoObj.usuario.direccion.comuna.ciudad._id,
                                ciudadData: {
                                    ...pedidoObj.usuario.direccion.comuna.ciudad,
                                    regionId: pedidoObj.usuario.direccion.comuna.ciudad.region._id,
                                    regionData: pedidoObj.usuario.direccion.comuna.ciudad.region
                                }
                            };
                            delete pedidoObj.usuario.direccion.comuna;
                        }
                    }

                    return pedidoObj;
                });

                return pedidosFormateados;
            } catch (error) {
                console.error('Error al obtener los pedidos por fecha:', error);
                throw error;
            }
        },
        // Queries para Evaluacion
        async getEvaluaciones (obj){
            try {
                const evaluaciones = await Evaluacion.find()
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return evaluaciones;
            } catch (error) {
                console.error('Error al obtener las evaluaciones:', error);
                throw error;
            }
        },
        async getEvaluacion (obj, { id }){
            try {
                const evaluacion = await Evaluacion.findById(id)
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                if (!evaluacion) {
                    throw new Error('Evaluación no encontrada');
                }

                return evaluacion;
            } catch (error) {
                console.error('Error al obtener la evaluacion:', error);
                throw error;
            }
        },
        async getEvaluacionByUsuario (obj, { usuario }){
            try {
                const evaluaciones = await Evaluacion.find({ usuario })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return evaluaciones;
            } catch (error) {
                console.error('Error al obtener las evaluaciones por usuario:', error);
                throw error;
            }
        },
        // Queries para Comentarios
        async getComentarios (obj){
            try {
                const comentarios = await Comentarios.find()
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
                throw error;
            }
        },
        async getComentario (obj, { id }){
            try {
                const comentario = await Comentarios.findById(id)
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                if (!comentario) {
                    throw new Error('Comentario no encontrado');
                }

                return comentario;
            } catch (error) {
                console.error('Error al obtener el comentario:', error);
                throw error;
            }
        },
        async getComentariosByUsuario (obj, { usuario }){
            try {
                const comentarios = await Comentarios.find({ usuario })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios por usuario:', error);
                throw error;
            }
        },
        async getComentariosByEstado (obj, { estado }){
            try {
                const comentarios = await Comentarios.find({ estado })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios por estado:', error);
                throw error;
            }
        },
        async getComentariosByEtiqueta (obj, { etiqueta }){
            try {
                const comentarios = await Comentarios.find({ etiqueta })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios por etiqueta:', error);
                throw error;
            }
        },
        async getComentariosByFecha (obj, { fecha }){
            try {
                const comentarios = await Comentarios.find({ fecha })
                    .populate({
                        path: 'usuario',
                        model: 'Usuario',
                        select: 'nombre correo telefono'
                    });

                return comentarios;
            } catch (error) {
                console.error('Error al obtener los comentarios por fecha:', error);
                throw error;
            }
        },
        // Queries para Articulo
        async getArticulos (obj){
            try {
                const articulos = await Articulo.find()
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    });

                return articulos;
            } catch (error) {
                console.error('Error al obtener los artículos:', error);
                throw error;
            }
        },
        async getArticulo (obj, { id }){
            try {
                const articulo = await Articulo.findById(id)
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    });

                if (!articulo) {
                    throw new Error('Artículo no encontrado');
                }

                return articulo;
            } catch (error) {
                console.error('Error al obtener el artículo:', error);
                throw error;
            }
        },
        async getArticuloByNombre (obj, { nombre }){
            try {
                const articulos = await Articulo.find({ nombre })
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    });

                if (articulos.length === 0) {
                    return null;
                }

                return articulos[0];
            } catch (error) {
                console.error('Error al obtener el artículo por nombre:', error);
                throw error;
            }
        },
        async getArticulosByPrecio (obj, { precio }){
            try {
                const articulos = await Articulo.find({ precio })
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    });

                return articulos;
            } catch (error) {
                console.error('Error al obtener los artículos por precio:', error);
                throw error;
            }
        },
        async getArticulosByEtiqueta (obj, { etiqueta }){
            try {
                const articulos = await Articulo.find({ etiqueta })
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    });

                return articulos;
            } catch (error) {
                console.error('Error al obtener los artículos por etiqueta:', error);
                throw error;
            }
        },
        // Queries para Imagenes
        async getImagenes (obj){
            try {
                const imagenes = await Imagenes.find();
                return imagenes;
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
                throw error;
            }
        },
        async getImagen (obj, { id }){
            try {
                const imagen = await Imagenes.findById(id);
                if (!imagen) {
                    throw new Error('Imagen no encontrada');
                }
                return imagen;
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
                throw error;
            }
        },
        async getImagenByNombre (obj, { nombre }){
            try {
                const imagenes = await Imagenes.find({ nombre });
                if (imagenes.length === 0) {
                    return null;
                }
                return imagenes[0];
            } catch (error) {
                console.error('Error al obtener la imagen por nombre:', error);
                throw error;
            }
        },
        // Queries para InformacionPagina
        async getInformacionPagina (obj, { id }){
            try {
                const informacionPagina = await InformacionPagina.findById(id)
                    .populate({
                        path: 'imagenes',
                        model: 'Imagenes'
                    })
                    .populate({
                        path: 'contacto',
                        model: 'Contacto'
                    });

                if (!informacionPagina) {
                    throw new Error('Información de página no encontrada');
                }

                return informacionPagina;
            } catch (error) {
                console.error('Error al obtener la información de la página:', error);
                throw error;
            }
        },
        // Queries para Contacto
        async getContactos (obj){
            try {
                const contactos = await Contacto.find()
                    .populate({
                        path: 'direccion',
                        model: 'Direccion',
                        populate: {
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region'
                                }
                            }
                        }
                    });

                const contactosFormateados = contactos.map(contacto => {
                    const contactoObj = contacto.toObject();
                    if (contactoObj.direccion && contactoObj.direccion.comuna) {
                        contactoObj.direccion.comunaId = contactoObj.direccion.comuna._id;
                        contactoObj.direccion.comunaData = {
                            ...contactoObj.direccion.comuna,
                            ciudadId: contactoObj.direccion.comuna.ciudad._id,
                            ciudadData: {
                                ...contactoObj.direccion.comuna.ciudad,
                                regionId: contactoObj.direccion.comuna.ciudad.region._id,
                                regionData: contactoObj.direccion.comuna.ciudad.region
                            }
                        };
                        delete contactoObj.direccion.comuna;
                    }
                    return contactoObj;
                });

                return contactosFormateados;
            } catch (error) {
                console.error('Error al obtener los contactos:', error);
                throw error;
            }
        },
        async getContacto (obj, { id }){
            try {
                const contacto = await Contacto.findById(id)
                    .populate({
                        path: 'direccion',
                        model: 'Direccion',
                        populate: {
                            path: 'comuna',
                            model: 'Comuna',
                            populate: {
                                path: 'ciudad',
                                model: 'Ciudad',
                                populate: {
                                    path: 'region',
                                    model: 'Region'
                                }
                            }
                        }
                    });

                if (!contacto) {
                    throw new Error('Contacto no encontrado');
                }

                const contactoObj = contacto.toObject();
                if (contactoObj.direccion && contactoObj.direccion.comuna) {
                    contactoObj.direccion.comunaId = contactoObj.direccion.comuna._id;
                    contactoObj.direccion.comunaData = {
                        ...contactoObj.direccion.comuna,
                        ciudadId: contactoObj.direccion.comuna.ciudad._id,
                        ciudadData: {
                            ...contactoObj.direccion.comuna.ciudad,
                            regionId: contactoObj.direccion.comuna.ciudad.region._id,
                            regionData: contactoObj.direccion.comuna.ciudad.region
                        }
                    };
                    delete contactoObj.direccion.comuna;
                }

                return contactoObj;
            } catch (error) {
                console.error('Error al obtener el contacto:', error);
                throw error;
            }
        },
        //Queries para personalización
        getCamisetasPersonalizadas: async () => {
                return await CamisetaPersonalizada.find()
                    .populate('usuario')
                    .populate('imagenes')
                    .populate('pedido');
                },
        getCamisetasByUsuario: async (obj, { usuarioId }) => {
                return await CamisetaPersonalizada.find({ usuario: usuarioId })
                    .populate('usuario')
                    .populate('imagenes')
                    .populate('pedido');
        },
        async getCamisetasPersonalizadasByPedido (obj, { pedidoId }){
            try {
                const camisetas = await CamisetaPersonalizada.find({ pedido: pedidoId })
                    .populate('usuario')
                    .populate('imagenes')
                    .populate('pedido');

                return camisetas;
            } catch (error) {
                console.error('Error al obtener las camisetas personalizadas por pedido:', error);
                throw error;
            }
        },
    },
    Mutation: {
        // Mutations para Usuario
        async addUsuario (obj, { input }){
            try {
                const { nombre, correo, contrasena, rol, direccion, telefono } = input;
                const usuarioExistente = await Usuario.findOne({ correo });
                if (usuarioExistente) {
                    throw new AuthenticationError('El correo ya está en uso');
                }
                const usuario = new Usuario({ nombre, correo, contrasena, rol, direccion, telefono });
                if (nombre === '' || correo === '' || contrasena === '' || rol === '' || direccion === '' || telefono === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await usuario.save();
                return usuario;
            } catch (error) {
                console.error('Error al agregar el usuario:', error);
                throw error;
            }
        },
        async updateUsuario (obj, { input }){
            try {
                const { id, nombre, correo, contrasena, rol, direccion } = input;
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
        async deleteUsuario (obj, { input }){
            try {
                const { id } = input;
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
        async addDireccion (obj, { input }){
            try {
                const { calle, numero, comuna } = input;
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
        async updateDireccion (obj, { input }){
            try {
                const { id, calle, numero, comuna } = input;
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
        async deleteDireccion (obj, { input }){
            try {
                const { id } = input;
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
        async addComuna (obj, { input }){
            try {
                const { nombre, ciudad } = input;
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
        async addCiudad (obj, { input }){
            try {
                const { nombre, region } = input;
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
        async addRegion (obj, { input }){
            try {
                const { nombre } = input;
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
        async addPedido (obj, { input }){
            try {
                const { fecha, total, estado, usuario, direccion } = input;
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
        async updatePedido (obj, { input }){
            try {
                const { id, estado } = input;
                const pedido = await Pedido.findById(id);
                if (!pedido) {
                    throw new Error('Pedido no encontrado');
                }
                if (estado !== undefined) pedido.estado = estado;
                await pedido.save();
                return pedido;
            } catch (error) {
                console.error('Error al actualizar el pedido:', error);
                throw error;
            }
        },
        async deletePedido (obj, { input }){
            try {
                const { id } = input;
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
        async addEvaluacion (obj, { input }){
            try {
                const { puntuacion, usuario } = input;
                const evaluacion = new Evaluacion({ puntuacion, usuario });
                if (puntuacion === '' || usuario === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await evaluacion.save();
                return evaluacion;
            } catch (error) {
                console.error('Error al agregar la evaluacion:', error);
                throw error;
            }
        },
        async updateEvaluacion (obj, { input }){
            try {
                const { id, puntuacion, comentario } = input;
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
        async deleteEvaluacion (obj, { input }){
            try {
                const { id } = input;
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
        async addComentario (obj, { input }){
            try {
                const { comentario, estado, etiqueta, usuario } = input;
                const nuevoComentario = new Comentarios({ comentario, estado, etiqueta, usuario });
                if (comentario === '' || estado === '' || etiqueta === '' || usuario === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
                await nuevoComentario.save();
                return nuevoComentario;
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
                throw error;
            }
        },
        async updateComentario (obj, { input }){
            try {
                const { id, comentario, estado, etiqueta } = input;
                const comentarioExistente = await Comentarios.findById(id);
                if (!comentarioExistente) {
                    throw new Error('Comentario no encontrado');
                }
                if (comentario !== undefined) comentarioExistente.comentario = comentario;
                if (estado !== undefined) comentarioExistente.estado = estado;
                if (etiqueta !== undefined) comentarioExistente.etiqueta = etiqueta;
                await comentarioExistente.save();
                return comentarioExistente;
            } catch (error) {
                console.error('Error al actualizar el comentario:', error);
                throw error;
            }
        },
        async deleteComentario (obj, { input }){
            try {
                const { id } = input;
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
        async addArticulo (obj, { input }){
            try {
                const { nombre, precio, etiqueta, imagenes } = input;
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
        async updateArticulo (obj, { input }){
            try {
                const { id, nombre, precio, etiqueta, imagenes } = input;
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
        async deleteArticulo (obj, { input }){
            try {
                const { id } = input;
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
        uploadImagen: async (_, { input }) => {
            const { file } = input;
            const { createReadStream, filename } = await file;
      
            const uniqueName = `${Date.now()}-${filename}`;
            const filePath = path.join(__dirname, 'uploads', uniqueName);
            
            const uploadDir = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            return new Promise((resolve, reject) => {
              createReadStream()
                .pipe(createWriteStream(filePath))
                .on('finish', () => {
                  resolve({
                    success: true,
                    message: 'Imagen subida correctamente',
                    url: `/uploads/${uniqueName}`,
                  });
                })
                .on('error', (error) => {
                  reject(new Error('Error al subir la imagen: ' + error.message));
                });
            });
        },
        async deleteImagen (obj, { input }){
            try {
                const { id } = input;
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
        async addInformacionPagina (obj, { input }){
            try {
                const { nombre, descripcion, imagenes } = input;
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
        async updateInformacionPagina (obj, { input }){
            try {
                const { id, nombre, descripcion, imagenes } = input;
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
        async deleteInformacionPagina (obj, { input }){
            try {
                const { id } = input;
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
        async addContacto (obj, { input }){
            try {
                const { nombre, correo, telefono } = input;
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
        async updateContacto (obj, { input }){
            try {
                const { id, nombre, correo, telefono } = input;
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
        async deleteContacto (obj, { input }){
            try {
                const { id } = input;
                const contacto = await Contacto.findByIdAndDelete(id);
                if (!contacto) {
                    throw new Error('Contacto no encontrado');
                }
                return contacto;
            } catch (error) {
                console.error('Error al eliminar el contacto:', error);
                throw error;
            }
        },
        // Mutations para Personalizacion
        addCamisetaPersonalizada: async (obj, { input }) => {
            const camiseta = new CamisetaPersonalizada(input);
            await camiseta.save();
            return camiseta;
        },

        updateCamisetaPersonalizada: async (obj, { input }) => {
            const { id, ...rest } = input;
            const camiseta = await CamisetaPersonalizada.findByIdAndUpdate(id, rest, { new: true });
            if (!camiseta) throw new Error('Camiseta no encontrada');
            return camiseta;
        },

        deleteCamisetaPersonalizada: async (obj, { id }) => {
            const camiseta = await CamisetaPersonalizada.findByIdAndDelete(id);
            if (!camiseta) throw new Error('Camiseta no encontrada');
            return camiseta;
        },
    }
};

export {resolvers};