import express from "express";
const router = express.Router();

import productController from "../../controllers/product.controller";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/',upload.array('imgs'), productController.create)
router.get('/:productId', productController.findById)
router.get('/', productController.findMany )



export default router;