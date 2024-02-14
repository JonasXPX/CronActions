import { Channel, Connection, Replies, connect } from 'amqplib';
import Queue from './Queue';

export default class Processor {
    url: string;
    channelQueue: Replies.AssertQueue | undefined;
    channel: Channel | undefined;

    constructor () {        
        this.url = process.env.RABBIT_URL as string;
    }

    async init(): Promise<void> {
        this.channel = await this.initAndCreateChannel();
    }

    async initAndCreateChannel(): Promise<Channel> {
        let con: Connection;
        try {
            console.log("connecting with: ", this.url);
            con = await connect(this.url);
            console.log("connected.");
            
            return con.createChannel();
        } catch (error) {
            console.error("Failed to connect to RabbitMQ server", { url: this.url });
        }
    
        return Promise.reject();
    }

    

    sendData(data: any, queue: Queue): void {
        if (!this.channel) {
            throw Error("Channel does not exists.");
        }

        const bufferData = Buffer.from(JSON.stringify(data));
        this.channel.sendToQueue(queue.getQueue().queue, bufferData);
        console.log("data sent: " + bufferData.byteLength);
    }

    consume(queue: Queue): void {
        this.channel?.consume(queue.getQueue().queue, (msg) => {
            console.log(`${msg}, received`);
        }, { noAck: true }).then((replies) => {
            console.log(replies);
        });
    }


}