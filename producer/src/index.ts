import 'dotenv/config';
import Processor from "./processor";
import Queue from './Queue';
import express from 'express'
const app = express();
const processor = new Processor();
let _queue: Queue;
processor.init().then(async () => {
    if (processor.channel) {
        const queue = new Queue(processor.channel, process.env.QUEUE_ALPHA as string);
        await queue.initQueue();
        _queue = queue;
    }
});

app.post('/', (req, res) => {
    processor.sendData({ test: 'Jonas' }, _queue);
    res.status(200).end();
})

app.listen(8080, () => {
    console.log('Server listening at: 8080');
    processor.consume(_queue);
})