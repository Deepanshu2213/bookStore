const express =require('express');
//const path = require('path');
const ShopController = require('../controllers/shop');

const router= express.Router();
router.get('/',ShopController.getIndex);
router.get('/products',ShopController.getProducts);
router.get('/product/:productId',ShopController.getOneProduct);
router.get('/cart',ShopController.getCart);
router.post('/cart',ShopController.postCart)
router.get('/orders',ShopController.getOrders);
router.get('/checkout',ShopController.getCheckOut);
router.post('/cart-delete-item',ShopController.postCartDeleteProduct); 
 module.exports= router;