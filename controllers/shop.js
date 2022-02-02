
const Product= require('../models/products');
const Cart = require('../models/cart')
exports.getProducts = (req,res,next)=>{
    Product.fetchAll(product=>{
      console.log('shop.js',product);

//res.sendFile(path.join(__dirname,'../','views','shop.html'))
res.render('shop/product-list',{prods: product,docTitle: 'shop',hasProduct: product.length>0,
path: '/products'});
    });
    
};
exports.getIndex =(req,res,next)=>{
  Product.fetchAll(product=>{
    console.log('shop.js',product);

//res.sendFile(path.join(__dirname,'../','views','shop.html'))
res.render('shop/index',{prods: product,docTitle: 'shop',hasProduct: product.length>0,
path: '/'});
  })
}
exports.getCart = (req,res,next)=>{
  Cart.getCart(cart =>{
    Product.fetchAll(products =>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(p=> p.id === product.id);
        if(cartProductData){
           cartProducts.push({productData: product,qty: cartProductData.qty})
        }
      }
      res.render('shop/cart',{pageTitle: 'Your Cart',
    path: '/cart' ,
     products: cartProducts       
  });
    });
    
  });

}
exports.getCheckOut =(req,res,next)=>{
   res.render('shop/checkout',
   {pageTitle: 'Checkout',
  path: '/checkout'})
}

exports.getOrders = (req,res,next)=>{
  res.render('shop/order',{pageTitle: 'Orders',
path: '/orders'})
}
exports.getOneProduct = (req,res,next)=>{
 
const productId = req.params.productId;
Product.findById(productId,product=>{
res.render('shop/product-info',{product: product,pageTitle: product.title,path: '/products'})
});
};
exports.postCart =(req,res,next)=>{
const prodId = req.body.productId;
Product.findById(prodId, (products)=>{
Cart.addProduct(prodId,products.price);
});
res.redirect('/cart');
}
exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart');
  });
};