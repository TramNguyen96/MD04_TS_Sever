/* Create Express Router */
import express from 'express'
const router = express.Router()

import UserController from '../../controllers/user.controller'

router.post("/login", UserController.login)
router.post("/", UserController.register)


export default router;