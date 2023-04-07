import express from "express";
import {
  // create,
  get,
  getAll,
  remove,
  // update,
  // put,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", get);
// router.post("/products", create);
router.delete("/users/:id", remove);
// router.patch("/products/:id", update);
// router.put("/products/:id", put);

// router.post("/users", checkPermission, create);
// router.post("/products/:id", checkPermission, update)
// router.post("users/:id", checkPermission, remove)

export default router;