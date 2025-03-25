import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { isAuth } from "../middlewares/is_auth.js";
import { rateLimit } from 'express-rate-limit'


const authRoutes = Router();

//middleware para limitar el numero de intentos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: {
        success: false,
        data: null,
        message: 'Numero de intentos excedido, intente mas tarde',
        error: null
    }
})

authRoutes.post('/login', limiter, AuthController.login)
authRoutes.post('/set-password', isAuth, AuthController.setPassword)

export default authRoutes;