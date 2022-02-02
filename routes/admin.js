const express = require('express');
//const path = require('path');
const AdminController = require('../controllers/admin');

const Router =express.Router();

Router.use('/add-products',AdminController.getProducts);
Router.get('/add-product',AdminController.getAddProductPage);
Router.post('/add-product',AdminController.postAddProductPage);//same url but diffrent request
//Router.get('/products',AdminController.getProducts)
Router.get('/edit-product/:productId',AdminController.getEditProductPage);// dynamically taking product id from req.params
Router.post('/edit-product',AdminController.postEditProductPage); 
Router.post('/delete-product',AdminController.postDeleteProduct);
   
module.exports= Router;
   