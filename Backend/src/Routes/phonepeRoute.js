import { checkStatus } from "../Controllers/phonepayController.js";
import { newPayment } from "../Controllers/phonepayController.js";

import express from "express";
export const phonepeRoute = express.Router();

phonepeRoute.post('/payments', newPayment);
phonepeRoute.post('/status/:txnId', checkStatus);

