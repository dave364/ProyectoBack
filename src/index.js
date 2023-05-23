import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import usersRouter from './router/users.js'
import coursesRouter from './router/courses.js'
import viewsRouter from './router/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import ProductRouter from "./router/product.routes.js";
//import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";
//import { io } from "socket.io-client";



const app = express();
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
app.set("views", path.resolve(__dirname + "/views") )



app.use('/', viewsRouter);


try {
    await mongoose.connect('mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}

//app.listen(8080);

//ItNaMTm4F5cwWs0v

const PORT = 4000
const product = new ProductManager();

app.use("/api/products", ProductRouter)


/*app.get("/", async (req, res) => {
    let allproducts = await product.getProducts()
    res.render("realTimeProducts", {
        title : "Backend | Handlebars",
        products : allproducts
    });  
});*/

app.get("/api/cart", (req, res) => res.send("Users Cart"))

/*app.get("/:id", async (req, res) => {
    let users = await product.getProductsById(req.params.id)
    res.render("products", {
        title : "Backend | Handlebars",
        products : users
    });  
});
*/

const server = app.listen(PORT, () => {
    console.log(`servidor express Puerto ${PORT}`);
});

const io = new Server(server);


app.set('socketio', io);


io.on ('connection',async socket=>{
    console.log("Cliente socket conectado")

    socket.on('addProducts',async data=>{
        console.log("addProducts conectado")
        await product.addProducts(data)
        let allproducts = await product.getProducts()
        socket.emit('showProducts',allproducts);
    })

    socket.on('getProducts',async (page,order)=>{
        console.log("getProducts conectado",page)
        let allproducts = await product.getProducts(page,order)
        //console.log("allproducts",allproducts)
        socket.emit('showProducts',allproducts,order);
    })

    socket.on('deleteProducts',async data=>{
        console.log("deleteProducts conectado",data)
        await product.deleteProducts(data)
        let allproducts = await product.getProducts()
        socket.emit('showProducts',allproducts);
    })

    socket.on('disconnect', () => {
        console.log("Cliente socket desconectado")
    });

})

