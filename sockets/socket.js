const {io} = require("../index");

// Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente Conectado");
    client.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });
    client.on('mensaje', (payload) => {
        console.log("Mensaje!!!", payload.nombre);

        // Emito un mensaje para todos los clientes
        io.emit("mensaje", {mensaje: "Recibí un mensaje de " + payload.nombre});
    });
});