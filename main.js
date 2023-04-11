class ProductManager {
    constructor(){
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, imagen, code, stock){
    for(let i = 0; i < this.products.length;i++){
        if(this.products[i].code === code) {
            console.log(`El codigo ${code} se repite`);
            break;
        }
    }


    const newProduct = {
    title, 
    description, 
    price, 
    imagen, 
    code, 
    stock, 
    }

    if (!Object.values(newProduct).includes(undefined)){
        ProductManager.id++;
        this.products.push({
            ...newProduct,
            id:ProductManager.id
         });
    } else {
       console.log("todos los campos se nececitan");
     }
    }

    getProduct() {
        return this.products;
    }

    existe(id) {
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id){
        !this.existe(id) ? console.log("not found") : console.log(this.existe(id));
        }
    }


const productos = new ProductManager();

//array vacio
console.log(productos.getProduct());

//productos agregados
productos.addProduct("titulo1", "descripcion1", 1000, "imagen1", "abc123", 5);
productos.addProduct("titulo2", "descripcion2", 1000, "imagen2",  6);

//array con los productos
console.log(productos.getProduct());

//validar codigo
productos.addProduct("titulo3", "descripcion3", 1000, "imagen3", "abc124", 7);

//id de productos
productos.getProductById(2)

//id no encontrado
productos.getProductById(3)


