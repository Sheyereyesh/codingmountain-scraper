import { Worker } from 'worker_threads';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import { json } from 'body-parser';
import updateData from './lib/update_data';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import watchListRoute from './route/watchList';
import coinRoute from './route/coin';
import homeRoute from './route/home';
import notificationRoute from './route/notification';

updateData();

const coin_worker = new Worker(__dirname + '/worker.js');
const app = express();

app.use(json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(homeRoute);
app.use(coinRoute);
app.use(watchListRoute);
app.use(notificationRoute);

app.use(errorHandlerMiddleware);

app.listen(8000, function () {
	console.log('listening on port 8000');
});
