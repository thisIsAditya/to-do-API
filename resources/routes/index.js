import { Router } from "express";

import ItemRouter from "./item_router.js";


const router = Router();


router.use("/item", ItemRouter);

export default router;
