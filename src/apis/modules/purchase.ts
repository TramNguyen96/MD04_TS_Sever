/* Create Express Router */
import express from 'express'
const router = express.Router()

import purchaseController from '../../controllers/purchase.controller';

router.post('/order-history', purchaseController.findGuestReceipt)
router.post('/', purchaseController.createGuestReceipt)
router.get('/', purchaseController.findAllGuestReceipt)

export default router;