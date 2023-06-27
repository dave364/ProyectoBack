import { Router } from 'express';
import { Products } from '../dao/dbManagers/products.js';
import CartManager from '../dao/dbManagers/carts.js';

const router = Router();

const productsManager = new Products();
const cartManager = new CartManager();

// Ruta principal que muestra todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.render('products', { products });   
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error retrieving products' });
    }
});

// Ruta para mostrar productos paginados y ordenados
router.get('/products', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const orderBy = req.query.orderBy || 0;
        const products = await productsManager.getProducts(page, orderBy);
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error retrieving products' });
    }
});

// Ruta para mostrar los detalles de un producto específico
router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productsManager.getProductsById(id);
        res.render('product-details', { product });
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error retrieving product' });
    }
});

// Ruta para agregar un producto al carrito
router.post('/products/:id/add-to-cart', async (req, res) => {
    try {
        const id = req.params.id;
        await cartManager.addToCart(id);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error adding product to cart' });
    }
});

// Ruta para mostrar los detalles de un carrito específico
router.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        res.render('cart', { cart });
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Error retrieving cart' });
    }
});

export default router;




/*
router.get("/", (req, res) => {
    res.render("index");
});

router.get('/realtimeproducts', async (req,res)=>{       
    res.render('realTimeProducts',{
      css:'realtimeproducts'  
    });
})

export default router;*/