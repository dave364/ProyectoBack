/*import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const CartRouter = Router();
const cart = new CartManager();

CartRouter.get("/", async (req, res) => {
  const io = req.app.get('socketio');
  const carts = await cart.getCarts(); // Corregir el nombre del método
  console.log("carts", carts);
  io.emit("showProducts", carts);

  res.send({
    status: 'success',
    data: carts
  });
});

CartRouter.get("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  let id = req.params.id;
  let cartById = await cart.getCartsById(id); // Corregir el nombre del método
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success',
    data: cartById
  });
});

CartRouter.post("/", async (req, res) => {
  const io = req.app.get('socketio');

  let newCart = req.body;
  await cart.addCarts(newCart);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success'
  });
});

CartRouter.put("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  let id = req.params.id;
  let updateCart = req.body;
  await cart.updateCarts(id, updateCart);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success'
  });
});

CartRouter.delete("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  let id = req.params.id;
  await cart.deleteCarts(id);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success'
  });
});

export default CartRouter;*/

import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const CartRouter = Router();
const cart = new CartManager();

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

CartRouter.post("/", async (req, res) => {
  const io = req.app.get("socketio");

  const { productId, price, name } = req.body;
  const addedCart = await cart.addCart(productId, price, name);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: "success",
    data: addedCart,
  });
});

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

CartRouter.put("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  const id = req.params.id;
  const updateCart = req.body;
  await cart.updateCart(id, updateCart);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success'
  });
});

CartRouter.delete("/:id", async (req, res) => {
  const io = req.app.get('socketio');

  const id = req.params.id;
  await cart.deleteCart(id);
  io.emit("showProducts", await cart.getCarts());
  res.send({
    status: 'success'
  });
});

export default CartRouter;

