import  express from "express"
import ProductManager from "./components/productManager.js"

const app = express()
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req,res) => {
    let limit = parseInt (req.query.limit);
    if(!limit) return res.send(await readProducts)

    let allProducts = await readProducts;
    let productLimint = allProducts.slice(0, limit)
    
res.send(productLimint);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let producById = allProducts.find(product => product.id === id)
    res.send(producById)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`express por local Host ${server.address().port}`);
})
server.on("error", (error) => console.log(`error de servidor ${error}`))