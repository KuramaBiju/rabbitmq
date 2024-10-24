var amqp = require('amqplib/callback_api');


amqp.connect('amqp://127.0.0.1', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = 'task_queue';
      const msg = process.argv.slice(2).join(' ') || "Hello World.....";
      
      channel.assertQueue(queue, {
        durable: true
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });
      console.log(" [x] Sent '%s'", msg);
    });
  });