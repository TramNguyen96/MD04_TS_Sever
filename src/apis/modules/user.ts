/* Create Express Router */
import express from 'express'
const router = express.Router()

import UserController from '../../controllers/user.controller';
import validate from '../../middlewares/validate';

router.post("/login", UserController.login)
router.post("/", validate.validateRegister, UserController.register)


export default router;