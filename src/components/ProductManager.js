
import {promises as fs} from "fs"


export default class ProductManager {
    constructor(){
         this.patch = "./productos.txt"
         this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++
        
        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        };
    
        this.products.push(newProduct)
        
       await fs.writeFile(this.patch,JSON.stringify(this.products));
       

    };

    readProducts = async () => {
        let respuesta =  await fs.readFile(this.patch, "utf-8")
        return  JSON.parse(respuesta)
    }

    getproducts = async () => {
        let respuesta2 = await this.readProducts()
      return  console.log(respuesta2)
    }
     
    getproductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (respuesta3.find(product => product,id === id)){
            console.log("producto no encontrado");
        } else {
            console.log(respuesta3.find(product => product,id === id));
        }

    };

    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch,JSON.stringify(productFilter));
        console.log("producto eliminado");
     };
    
     updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsModif = [{...producto, id} , ...productOld];
        await fs.writeFile(this.patch,JSON.stringify(productsModif));
     };
}

//const productos = new ProductManager();

//wait productos.addProduct("Titulo1", "Description1", 1000, "imagen1", "abc123", 5);
//await productos.addProduct("Titulo2", "Description2", 2000, "imagen2", "abc124", 6);
//await productos.addProduct("Titulo3", "Description3", 3000, "imagen3", "abc125", 7); 


//productos.getproducts()

//productos.getproductsById(2);
//productos.deleteProductsById(3);

/*productos.updateProducts({
    title: 'Titulo3',
    description: 'Description3',
    price: 4000,
    imagen: 'imagen3',
    code: 'abc125',
    stock: 7, 
    id: 3
})*/