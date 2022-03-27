/**
 * Module Import
 */
import { Router } from "express";
import { Item } from "../models/item.js";
import paginatedResults from "../middlewares/paginatedResults.js";

import {
  addItem,
  updateItem,
  deleteItem,
  getItem,
  getItems
} from "../controllers/item_controller.js";

const router = Router();



router.route("/")
  .post(addItem)
  .get(paginatedResults(Item),getItems);

router.route("/:id")
  .get(getItem)
  .patch(updateItem)
  .delete(deleteItem);



export default router;