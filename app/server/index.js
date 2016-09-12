import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import ProductController from './controllers/productController';
import CustomerController from './controllers/customerController';
import OrderController from './controllers/orderController';
import Models from './models/models';
import CustomerSeed from './startup/customerSeed';
import ProductSeed from './startup/productSeed';

console.log('connecting to db');
const db = mongoose.connect('mongodb://127.0.0.1/cart');
Models.setup();
CustomerSeed.startup();
ProductSeed.startup();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', (socket) => {
  socket.emit('greeting', { message: 'hello world' });
});

app.use(bodyParser.json());
const publicFolder = path.resolve(__dirname, '../public');
app.use(express.static(publicFolder));

app.get('/products/get', ProductController.getProducts);
app.get('/orders/get', OrderController.getOrders);
app.post('/orders/add', OrderController.addOrder);
app.get('/customers/get', CustomerController.getCustomer);
app.post('/customers/update/shipping', CustomerController.updateShipping);
app.post('/customers/update/billing', CustomerController.updateBilling);
app.post('/customers/update/cart', CustomerController.updateCart);

app.get('*', (req, res) => {
  const indexFile = path.resolve(__dirname, '../client/index.html');
  res.sendFile(indexFile);
});

server.listen(82, () => {
  console.log('listening on port 82', __dirname);
});
