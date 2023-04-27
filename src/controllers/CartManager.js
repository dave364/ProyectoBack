import {promises as fs} from "fs"
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/modeLs/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts);
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    exist = async (id) => {
        let carts = await this.readCarts();
      return carts.find(carts => carts.id === id)
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Has Agregado Al Carrito"
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) return "No Se Encuentra"
        return cartById
      };

      addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "No Se Encuentra"
        let productById = await productAll.exist(productId)
        if(!cartById) return "No Se Encuentra Producto"

        let cartsALL = await this.readCarts()
        let cartFilter = cartsALL.filter(cart => cart.id != cartId)

        if(cartById.products.some((prod) => prod.id === productId)) {
            let moreproductInCart = cartById.products.find(
                (prod) => prod.id === productId
                );
            moreproductInCart.cantidad++ ;
            //console.log(moreProductInCart.cantidad);
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Se Sumo Un Producto Al Carrito"
        } 
        cartById.products.push({ id: productById.id, cantidad: 1 })
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat)
        return "Producto Agregado Al Carrito"
      }
}

export default CartManager