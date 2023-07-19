const amqp = require('amqplib');

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqps://ejejtxro:zt5zcNLY1EsDdMdKQ_KsIh9Q5AT3R7Fu@jackal.rmq.cloudamqp.com/ejejtxro'); // RabbitMQ bağlantı adresini 
    const channel = await connection.createChannel();

    const queue = 'CalculationQueue'; // Tüketilecek kuyruk adı
    await channel.assertQueue(queue, { durable: false });

    console.log('Consumer başlatıldı. Mesajları bekleniyor...');

    channel.consume(queue, (msg) => {
      const message = msg.content.toString();
      console.log('Alınan mesaj:', message);

      // Mesajı işleme, hesaplama  vb.

      channel.ack(msg); // Mesajı işlendi olarak işaretleme
    });
  } catch (error) {
    console.error('Hata:', error);
  }
}

consumeMessages();