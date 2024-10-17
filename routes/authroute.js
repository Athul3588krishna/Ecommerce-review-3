import express from 'express';
import { registerController, loginController, testController, } from "../controllers/authController.js"; // Ensure both controllers are imported
const router = express.Router();
// authroute.js
import { requireSignIn } from "../middleware/authMiddleware.js"; // Named import
import { isAdmin } from '../middleware/authMiddleware.js';

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

//test routes
router.get('/test',requireSignIn,isAdmin, testController)

export default router;
