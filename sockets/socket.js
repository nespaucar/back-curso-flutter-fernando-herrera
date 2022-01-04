const {io} = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();
bands.addBand(new Band('RBD'));
bands.addBand(new Band('Michael Jackson'));
bands.addBand(new Band('Mariposa Traicionera'));
bands.addBand(new Band('Rio Roma'));
bands.addBand(new Band('Ed Sheeran'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente Conectado");

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });
    client.on('mensaje', (payload) => {
        console.log("Mensaje!!!", payload.nombre);

        // Emito un mensaje para todos los clientes
        io.emit("mensaje", {mensaje: "Recibí un mensaje de " + payload.nombre});
    });
    client.on('emitir-mensaje', (payload) => {
        // Emito un mensaje para todos los clientes
        io.emit("emitir-mensaje", payload);
    });
    client.on('vote-band', (payload) => {
        // Emito un mensaje para todos los clientes
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', (payload) => {
        // Emito un mensaje para todos los clientes
        // console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        // Emito un mensaje para todos los clientes
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});