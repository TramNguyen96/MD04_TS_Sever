/* Create Express Router */
import express from 'express'
const router = express.Router()

import UserController from '../../controllers/user.controller';
import validate from '../../middlewares/validate';
import userController from '../../controllers/user.controller';

router.post("/login", UserController.login)
router.post("/", UserController.register)
router.get('/', userController.findMany)


export default router;