import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const CartRouter = Router();
const cart = new CartManager();

// Obtener todos los carritos
CartRouter.get("/", async (req, res) => {
  const io = req.app.get("socketio");
  const carts = await cart.getCarts();
  console.log("carts", carts);
  io.emit("showProducts", carts);

  res.send({
    status: "success",
    data: carts,
  });
});

// Agregar un carrito
CartRouter.post("/", async (req, res) => {
  const io = req.app.get("socketio");

  const { products, price, name } = req.body;
  const addedCart = await cart.addCart(products, price, name);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: "success",
    data: addedCart,
  });
});

// Obtener un carrito por su ID
CartRouter.get("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  const id = req.params.id;
  const cartById = await cart.getCartById(id);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success',
    data: cartById
  });
});

// Actualizar un carrito por su ID
CartRouter.put("/:id", async (req, res) => {
  const io = req.app.get("socketio");

  const id = req.params.id;
  const updateCart = req.body;
  await cart.updateCart(id, updateCart);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: "success",
  });
});

// Eliminar un carrito por su ID
CartRouter.delete("/:id", async (req, res) => {
  const io = req.app.get("socketio");

  const id = req.params.id;
  await cart.deleteCart(id);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: "success",
  });
});

// Eliminar un producto de un carrito específico
CartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const io = req.app.get("socketio");
  const { cid, pid } = req.params;
  try {
    const result = await cart.deleteProductFromCart(cid, pid);
    io.emit("showProducts", await cart.getCarts());
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product from cart" });
  }
});

// Actualizar un carrito con nuevos productos
CartRouter.put("/:cid", async (req, res) => {
  const io = req.app.get("socketio");
  const { cid } = req.params;
  const products = req.body;
  try {
    const result = await cart.updateCartWithProducts(cid, products);
    io.emit("showProducts", await cart.getCarts());
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart with products" });
  }
});

// Actualizar la cantidad de un producto en un carrito específico
CartRouter.put("/:cid/products/:pid", async (req, res) => {
  const io = req.app.get("socketio");
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cart.updateProductQuantity(cid, pid, quantity);
    io.emit("showProducts", await cart.getCarts());
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update product quantity in cart" });
  }
});

// Vaciar un carrito específico
CartRouter.delete("/:cid", async (req, res) => {
  const io = req.app.get("socketio");
  const { cid } = req.params;
  try {
    const result = await cart.clearCart(cid);
    io.emit("showProducts", await cart.getCarts());
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default CartRouter;
