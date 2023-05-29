import { productModel } from "../dao/modeLs/products.js";



class ProductManager {
    constructor() {
    }

    readProducts = async (page,orderBy) => {
        try {
        const order = orderBy == 0 ? {} : {price:orderBy}
        const options = {
            page: page,
            limit: 4,
            sort: order
        };

        const products = await productModel.paginate({}, options);
        return products  
        } catch (error) {
          console.error("Error al leer los productos:", error);
          throw error;
        }
      };


    exist = async (id) => {
        let products = await this.readProducts();
      return products.find(prod => prod.id === id)
    }

    addProducts = async (product) =>{
      const result = await productModel.create(product);
      return result;
    };

    getProducts = async (page,order) => {
        return await this.readProducts(page,order)
    };

    getProductsById = async (id) => {
      let productById = await this.exist(id)
      if(!productById) return "No Se Encuentra"
      return productById
    };

    

    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "No Se Encuentra"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
       return "Se Actualizo El Producto"


    } 

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id)
        if (existProducts) { 
        let filterProducts = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProducts)
        return "Producto eliminado"
        }
        return "No Existe El Producto A Eliminar "

    }
}

export default ProductManager;
