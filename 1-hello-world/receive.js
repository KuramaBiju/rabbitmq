/*  -> consumidor.js */

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "my_first_queue";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Esperando por mensajes %s. Toca CTRL+C para cerrar el proceso", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Mensaje recibido %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});