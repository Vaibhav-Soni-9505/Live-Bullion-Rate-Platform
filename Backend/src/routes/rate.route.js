import { Router } from "express";
import { getBullionRates } from "../controllers/rate.controller.js";

const router = Router();

router.get("/bullion", getBullionRates);
router.get("/gold", getBullionRates);

export default router;
