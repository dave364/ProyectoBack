import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";



const app = express()
const PORT = 4000
const product = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)



//HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views") )

//CSS
app.use("/", express.static(__dirname + "/public"))



app.get("/", async (req, res) => {
    let allproducts = await product.getProducts()
    res.render("realTimeProducts", {
        title : "Backend | Handlebars",
        products : allproducts
    });  
});

app.get("/:id", async (req, res) => {
    let prod = await product.getProductsById(req.params.id)
    res.render("prod", {
        title : "Backend | Handlebars",
        products : prod
    });  
});


const server = app.listen(PORT, () => {
    console.log(`servidor express Puerto ${PORT}`);
});


const io = new Server(server);

app.set('socketio', io);


