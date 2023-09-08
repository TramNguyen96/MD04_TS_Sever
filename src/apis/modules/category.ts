/* Create Express Router */
import express from 'express'
const router = express.Router()

import categoryController from '../../controllers/category.controller';

router.post('/', categoryController.createCategory)
router.get('/', categoryController.findMany);


export default router;