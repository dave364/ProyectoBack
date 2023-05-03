import { Router } from "express";


const router = Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get('/realtimeproducts', async (req,res)=>{       
    res.render('realTimeProducts',{
      css:'realtimeproducts'  
    });
})

export default router;