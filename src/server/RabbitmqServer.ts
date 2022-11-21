import { Channel, connect, Connection } from "amqplib";

class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  async start() {
    this.conn = await connect('amqp://guest:guest@localhost:5672');
    this.channel = await this.conn.createChannel();
  }

  async publishExchange(exchange: string, message: string) {
    return this.channel.publish(exchange, '', Buffer.from(message));
  }
}

export { RabbitmqServer };
