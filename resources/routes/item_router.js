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
/**
 * 
 * @swagger
 * /api/item:
 *  post:
 *    description: Create new to-do task
 *    consumes:
 *    - application/json:
 *    parameters:
 *    - in: body
 *      name: item     
 *      description : Title (required) and description of the task
 *      schema:
 *        type: object
 *        required:
 *        - title
 *        properties:
 *          title:
 *            type: string
 *          description:
 *             type: string          
 *    responses:
 *      '200':
 *        description: Created New task successfully
 *      '400':
 *        description: Didn't send correct data
 *      '500':
 *        description: Internal Server Error
 *  get: 
 *    description: Get all to-do tasks
 *    parameters: 
 *    - in: query
 *      name: status
 *      default: incomplete
 *      type: string
 *      description: incomplete or completed
 *    - in: query
 *      name: limit
 *      default: 5
 *      type: integer
 *      description: Number of results in one page
 *    - in: query
 *      name: page
 *      default: 1
 *      type: integer
 *      description: Page number
 *    responses:
 *      '200':
 *        description: Successfully retrived all data
 *      '500':
 *        description: Internal Server Error
 */
router.route("/")
  .post(addItem)
  .get(paginatedResults(Item),getItems);


/**
 * @swagger
 * /api/item/{id}: 
 *  get:
 *   description: Get tak by ID
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     type: string
 *     minimum: 12
 *     description: The user ID.
 *   responses:
 *     200:
 *       description: Success
 *     400:
 *       description: id not specfied
 *     404:
 *       description: Item not found
 *     500:
 *       description: Internal Server Error
 *  delete:
 *   description: Delete task by ID
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     type: string
 *     minimum: 12
 *     description: The user ID.
 *   responses:
 *     200:
 *       description: Success
 *     400:
 *       description: id not specfied
 *     404:
 *       description: Item not found
 *     500:
 *       description: Internal Server Error
 *  patch:
 *    description: Updateto-do task
 *    consumes:
 *    - application/json:
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: string
 *      minimum: 12
 *      description: The user ID.
 *    - in: body
 *      name: item     
 *      description : Title (required), description and status(completed or incomplete) of the task
 *      schema:
 *        type: object
 *        required:
 *        - title
 *        properties:
 *          title:
 *            type: string
 *          description:
 *             type: string
 *          status:
 *             type: string          
 *    responses:
 *      '200':
 *        description: Created New task successfully
 *      '400':
 *        description: Didn't send correct data
 *      '500':
 *        description: Internal Server Error
 */
router.route("/:id")
  .get(getItem)
  .patch(updateItem)
  .delete(deleteItem);



export default router;