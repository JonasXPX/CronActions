import { Channel, Replies } from "amqplib";

class Queue {
    private channel: Channel;
    private queue: Replies.AssertQueue | undefined;
    private queueName;
    constructor(channel: Channel, queueName: string) {
        this.channel = channel;
        this.queueName = queueName;
    }

    getQueue(): Replies.AssertQueue {
        if (!this.queue) {
            throw Error("Queue does not exists.");
        }

        return this.queue;
    }

    async initQueue(): Promise<Replies.AssertQueue> {
        try { 
            const assertQueue = await this.channel.assertQueue(this.queueName, { durable: true });
            this.queue = assertQueue;
            return assertQueue;
        } catch (reason) {
            console.error(`Failed to create queue, ${reason}`);
            throw reason;
        }
    }
    
}

export default Queue;