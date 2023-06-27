import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import viewsRouter from './router/views.router.js';
import mongoose from 'mongoose';
import { Server } from "socket.io";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import { Products } from "./dao/dbManagers/products.js";

const app = express();

// Configuración de directorio estático para archivos públicos
app.use(express.static('src/public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "views"))

// Enrutador para las vistas
app.use('/', viewsRouter);

try {
  // Conexión a la base de datos MongoDB
  await mongoose.connect('mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority');
  console.log('DB CONNECTED')
} catch (error) {
  console.log(error);
}

const PORT = 4000;
const product = new Products();

// Enrutador para las rutas de productos
app.use("/api/products", ProductRouter);

// Enrutador para las rutas de carritos
app.use("/api/carts", CartRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor express en el puerto ${PORT}`);
});

const io = new Server(server);

app.set('socketio', io);

io.on('connection', async socket => {
  console.log("Cliente socket conectado");

  // Evento para agregar productos
  socket.on('addProducts', async data => {
    console.log("addProducts conectado");
    await product.save(data);
    let allProducts = await product.getAll();
    socket.emit('showProducts', allProducts);
  });

  // Evento para obtener productos con paginación y orden
  socket.on('getProducts', async (page, order) => {
    console.log("getProducts conectado", page);
    let allProducts = await product.getProducts(page, order);
    socket.emit('showProducts', allProducts, order);
  });

  // Evento para eliminar productos
  socket.on('deleteProducts', async data => {
    console.log("deleteProducts conectado", data);
    await product.deleteProducts(data);
    let allProducts = await product.getAll();
    socket.emit('showProducts', allProducts);
  });

  socket.on('disconnect', () => {
    console.log("Cliente socket desconectado");
  });
});
