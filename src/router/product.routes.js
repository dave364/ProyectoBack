import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) =>{
    const io = req.app.get('socketio');
    const products = await product.getProducts()
    console.log("products",products)
    io.emit("showProducts",  products );

    res.send({
        status: 'success',
        data: products
    })
});

ProductRouter.get("/:id", async (req, res) =>{
    const io = req.app.get('socketio');

    let id = req.params.id
    await product.getProductsById(id)
    io.emit("showProducts", await product.getProducts() );
    res.send({
        status: 'success',
        data: productById
    })
});

ProductRouter.post("/", async (req, res) =>{
    const io = req.app.get('socketio');

   let newProducts = req.body
   await product.addProducts(newProducts)
   io.emit("showProducts", await product.getProducts() );
    res.send({
        status: 'success'
    }) 
});

ProductRouter.put("/:_id", async (req,res) => {
    const io = req.app.get('socketio');

    let id = req.params.id
    let updateProduct = req.body;
    await product.updateProducts(id, updateProduct)
    io.emit("showProducts", await product.getProducts() );
    res.send({
        status: 'success'
    }) 
});

ProductRouter.delete("/:id", async (req,res) => {
    const io = req.app.get('socketio');

    let id = req.params.id
    await product.deleteProducts(id)
    io.emit("showProducts", await product.getProducts() );
    res.send({
        status: 'success'
    }) 
});

export default ProductRouter;