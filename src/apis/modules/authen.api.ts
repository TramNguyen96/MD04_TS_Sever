import express from 'express'
const router = express.Router()

import authController from '../../controllers/auth.controller';
import token from '../../middlewares/token';

router.get("/email-confirm/:token", token.validateToken, authController.confirmEmail)
router.get("/", token.validateToken, authController.authentication)


export default router;