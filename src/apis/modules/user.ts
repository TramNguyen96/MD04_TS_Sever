/* Create Express Router */
import express from 'express'
const router = express.Router()

import UserController from '../../controllers/user.controller'

router.get("/", UserController.getUsers)


export default router;