import { Router } from 'express';
import Products from '../dao/dbManagers/products.js'
import carrito from '../dao/dbManagers/carts.js'

const router = Router();

const productsManager = new Products();


router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.render('products', { products })   
    } catch (error) {
        console.log(error);
    }
})

router.get("/carts/:cid" , async (req,res) => {
    const carritoId = await carrito.getCartsByID(req.params.cid).populate("products.product");
    console.log(carritoId);
    res.render("products",{carritoId})
})



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