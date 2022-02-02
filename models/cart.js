const fs = require('fs');
const path = require('path');


const p= path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)


module.exports= class Cart {
   static addProduct(id, productPrice) {
       //fetch the previous cart
       fs.readFile(p,(err,fileContent)=>{
           let cart = {products: [],totalPrice: 0};//initializing cart 
           if(!err){// get existing cart 
               cart = JSON.parse(fileContent);
           }
           // Analyze the cart => find the existing product
           const existingProductIndex = cart.products.findIndex(prod=>prod.id=== id);// find id of product on which we want our product to added on cart
           const existingProduct = cart.products[existingProductIndex]// in products arrray copying id product to existing product 
           let updatedProduct;
           if(existingProduct){//if the product we wanted to aadd in cart is repeated 
            updatedProduct = {...existingProduct};
            updatedProduct.qty= updatedProduct.qty + 1;//qty by one which is property of product
            cart.products = [...cart.products]//copying product 
            cart.products[existingProductIndex] = updatedProduct; //swap value of existing product 

           }
           else{
               updatedProduct = { id: id,qty: 1}; // new product to added in cart with property of id and qty 
               cart.products = [...cart.products,updatedProduct];

           }
           cart.totalPrice = cart.totalPrice + +productPrice;// to convert it into number add +sign before cart
           fs.writeFile(p,JSON.stringify(cart), err =>{// adding part to cart.json
               console.log(err);
           });

       });
       
       //Add new product/ increase quantity
       
   }
  static deleteProduct(id,productPrice){
    fs.readFile(p,(err,fileContent)=>{ 
     if(err){
         return ;
     }
     const cart = JSON.parse(fileContent);
     const updatedCart = { ...cart};
     const product = updatedCart.products.find(p=>p.id === id);
     if(!product){
         return ;//if this statement is true then rest will not executed
     }
     const productQty = product.qty;
     updatedCart.products = updatedCart.products.filter(p=> p.id !== id)
     updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;
     fs.writeFile(p,JSON.stringify(updatedCart), err =>{// adding part to cart.json
        console.log(err);
    });
    });
  }
    static getCart(cb){
        fs.readFile(p,(err,filecontent)=>{
            const cart = JSON.parse(filecontent);
            if(err){
                cb(null)
            }
            else{
                cb(cart);
            }
        });
    }
}