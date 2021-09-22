import { Worker, isMainThread, parentPort } from 'worker_threads';

// if (isMainThread) {
// console.log(__filename);
const coin_worker = new Worker(__dirname + '/worker.js');
// coin_worker.on('message',(msg)=>{

// });
// }
