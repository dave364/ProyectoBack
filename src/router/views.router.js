import { Router } from 'express';
import Products from '../dao/dbManagers/products.js'
import Courses from '../dao/dbManagers/carts.js'

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