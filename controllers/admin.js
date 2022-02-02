const Product= require('../models/products')


exports.getAddProductPage= (req,res,next)=>{
    console.log("2nd middlewear"); 
    //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
      res.render('admin/add-product',{path: '/admin/add-product'})
};
exports.postAddProductPage= (req,res,next)=>{
    console.log(req.body); 
      const product = new Product(null,req.body.title,req.body.imageUrl,req.body.description,req.body.price);
      product.save();
    res.redirect('/message');
    };
exports.getProducts = (req,res,next)=>{
  Product.fetchAll(product=>{
    console.log('shop.js',product);

//res.sendFile(path.join(__dirname,'../','views','shop.html'))
res.render('admin/productss',{prods: product,docTitle: 'shop',hasProduct: product.length>0,path: '/admin/products'});
  });
}
exports.getEditProductPage= (req,res,next)=>{
   const editMode = req.query.edit;// edit is key value pair set in url ar query
  //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
  if(editMode==null){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId,(product)=>{
    res.render('admin/edit-product',
    {path: '/admin/add-product',
     PageTitle: 'Edit Product',
     editing: editMode,
     product: product
  });
  })
    
};
exports.postEditProductPage=(req,res,next)=>{
const prodId = req.body.productId;
const updatedTitle = req.body.title;
const updatedPrice = req.body.price;
const updatedImageUrl = req.body.imageUrl;
const updatedDescription = req.body.description;
const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice);
updatedProduct.save();
res.redirect('/admin/add-products');
}
exports.postDeleteProduct = (req,res,next)=>{
 const prodId = req.body.productId; 
 Product.deleteById(prodId);
 res.redirect('/admin/add-products')
}