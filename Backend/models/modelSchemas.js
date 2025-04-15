const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    contraseña: { type: String, required: true, minlength: [8, 'La contraseña debe tener minimo 8 caracteres'] },
    correo: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Por favor ingrese un correo valido'] },
    telefono: { type: String, required: true },
    rol: { type: String, required: true, enum:['usuario', 'admind'], default: 'usuario' },
    direccion: { type: Schema.Types.ObjectId, ref: 'Direccion' }
});

const direccionSchema = new Schema({
    calle: { type: String, required: true },
    numero: { type: String, required: true },
    comuna: { type: Schema.Types.ObjectId, ref: 'Comuna' }
});

const comunaSchema = new Schema({
    nombre: { type: String, required: true },
    ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' }
});

const ciudadSchema = new Schema({
    nombre: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: 'Region' }
});

const regionSchema = new Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true }
});

const pedidoSchema = new Schema({
    fecha: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    estado: { type: String, required: true, enum:['pintando', 'cortando', 'planchando', 'enbolsando'], default: 'pintando' }, 
    /*TODO Este hay que ⤊⤊⤊⤊⤊⤊⤊⤊⤊⤊⤊⤊
     ver bien que estados va a tener, despues será importante para que el cliente vea en que parte del proceso esta este coso*/
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    direccion: { type: Schema.Types.ObjectId, ref: 'Direccion' }
});

const evaluacionSchema = new Schema({
    puntuacion: { type: Number, required: true, min: 1, max: 5 },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

const comentariosSchema = new Schema({
    comentario: { type: String, required: true },
    estado: { type: String, required: true, enum:['pendiente', 'aprobado'], default: 'pendiente' },
    etiqueta: { type: String, required: true, enum:['camisetas', 'calsetas', 'banderin']}, //TODO Este hay que comprobar las etiquetas posibles
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha: { type: Date, default: Date.now }
});

const articuloSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    etiqueta: { type: String, required: true, enum:['camisetas', 'calsetas', 'banderin']}, //TODO Este hay que comprobar las etiquetas posibles
    imagenes: [{ type: Schema.Types.ObjectId, ref: 'Imagenes' }],
});

const imagenesSchema = new Schema({
    imagen: { type: String, required: true },
    nombre: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Direccion = mongoose.model('Direccion', direccionSchema);
const Comuna = mongoose.model('Comuna', comunaSchema);
const Ciudad = mongoose.model('Ciudad', ciudadSchema);
const Region = mongoose.model('Region', regionSchema);
const Pedido = mongoose.model('Pedido', pedidoSchema);
const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);
const Comentarios = mongoose.model('Comentarios', comentariosSchema);
const Articulo = mongoose.model('Articulo', articuloSchema);
const Imagenes = mongoose.model('Imagenes', imagenesSchema);

module.exports = {
    Usuario,
    Direccion,
    Comuna,
    Ciudad,
    Region,
    Pedido,
    Evaluacion,
    Comentarios,
    Articulo,
    Imagenes
};