import { connectToDatabase, productModel } from "../modeLs/products.js";

// Conexión a la base de datos
connectToDatabase();

export class Products {
  constructor() {
    console.log("working products with DB");
  }

  // Leer los productos de la base de datos paginados y ordenados
  readProducts = async (page, orderBy) => {
    try {
      const order = orderBy == 0 ? {} : { price: orderBy };
      const options = {
        page: page,
        limit: 4,
        sort: order
      };

      const products = await productModel.paginate({}, options);
      return products;
    } catch (error) {
      console.error("Error al leer los productos:", error);
      throw error;
    }
  };

  // Verificar si un producto existe en la base de datos
  exist = async (id) => {
    let products = await this.readProducts();
    return products.find(prod => prod.id === id);
  };

  // Agregar un producto a la base de datos
  addProducts = async (product) => {
    const result = await productModel.create(product);
    return result;
  };

  // Obtener productos paginados y ordenados
  getProducts = async (page, order) => {
    return await this.readProducts(page, order);
  };

  // Obtener un producto por su ID
  getProductsById = async (id) => {
    let productById = await this.exist(id);
    if (!productById) return "No Se Encuentra";
    return productById;
  };

  // Actualizar un producto por su ID
  updateProducts = async (id, product) => {
    let productById = await this.exist(id);
    if (!productById) return "No Se Encuentra";
    await this.deleteProducts(id);
    let productOld = await this.readProducts();
    let products = [{ ...product, id: id }, ...productOld];
    await this.writeProducts(products);
    return "Se Actualizo El Producto";
  };

  // Eliminar un producto por su ID
  deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProducts = products.some(prod => prod.id === id);
    if (existProducts) {
      let filterProducts = products.filter(prod => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Producto eliminado";
    }
    return "No Existe El Producto A Eliminar";
  };

  // Obtener todos los productos de la base de datos
  getAll = async () => {
    const options = {
      page: 1,
      limit: 10
    };

    const products = await productModel.paginate({}, options);
    return products.docs.map(product => product.toObject());
  };

  // Guardar un producto en la base de datos
  save = async (product) => {
    const result = await productModel.create(product);
    return result;
  };
}
