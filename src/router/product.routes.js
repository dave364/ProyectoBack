import { Router } from "express";
import { Products } from "../dao/dbManagers/products.js";

const ProductRouter = Router();
const product = new Products();

// Obtener todos los productos
ProductRouter.get("/", async (req, res) => {
    const io = req.app.get('socketio');
    const products = await product.getAll();
    console.log("products", products);
    io.emit("showProducts", products);

    res.send({
        status: 'success',
        data: products
    });
});

// Obtener un producto por su ID
ProductRouter.get("/:id", async (req, res) => {
    const io = req.app.get('socketio');

    let id = req.params.id;
    const productById = await product.getProductsById(id);
    io.emit("showProducts", await product.getAll());
    res.send({
        status: 'success',
        data: productById
    });
});

// Agregar un nuevo producto
ProductRouter.post("/", async (req, res) => {
    const io = req.app.get('socketio');

    let newProduct = req.body;
    await product.save(newProduct);
    io.emit("showProducts", await product.getAll());
    res.send({
        status: 'success'
    });
});

// Actualizar un producto por su ID
ProductRouter.put("/:_id", async (req, res) => {
    const io = req.app.get('socketio');

    let id = req.params.id;
    let updateProduct = req.body;
    await product.updateProducts(id, updateProduct);
    io.emit("showProducts", await product.getAll());
    res.send({
        status: 'success'
    });
});

// Eliminar un producto por su ID
ProductRouter.delete("/:id", async (req, res) => {
    const io = req.app.get('socketio');

    let id = req.params.id;
    await product.deleteProducts(id);
    io.emit("showProducts", await product.getAll());
    res.send({
        status: 'success'
    });
});

export default ProductRouter;
