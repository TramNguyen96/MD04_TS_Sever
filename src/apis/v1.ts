/* Create Express Router */
import express from 'express'
const router = express.Router()

import userModule from './modules/user'
router.use('/users', userModule)

import authenModule from './modules/authen.api'
router.use('/auth', authenModule)

export default router;