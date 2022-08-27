//const products =[]; 

const fs = require('fs');
const path = require('path');
const cart = require('./cart')
 
const p = path.join(// global because when we pass our getProductsFromFile in save method the 
    //fuction callback does not know the the path p
    path.dirname(process.mainModule.filename),//for root directory
    'data',
    'products.json'
  );
 
const getProductsFromFile = cb => {
    
    fs.readFile(p,(err,fileContent)=>{
       if(err){
         cb([]);
       } 
       else{
        cb(JSON.parse(fileContent));
       }
       
    })
  };
 module.exports = class Product{
     constructor(id,title,imageUrl, description, price){//for edit button some changes are done if adding new product just pass id to null
      //otherwise it will take id dynamically if it have id then we will update that product in save method else give product new id
       this.id = id;
         this.title=title;
         this.description = description;
         this.imageUrl = imageUrl;
         this.price = price;
     }


  /*   save(){
         this.id = Math.random().toString();
         //products.push(this)
         const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');//for root directory
         fs.readFile(p,(err,fileContent)=>{
             let product =[]
         if(!err){
            product = JSON.parse(fileContent);
          }
          product.push(this);
          fs.writeFile(p,JSON.stringify(product),(err)=>{
              console.log(err)
          })
         }
         );
     }*/
     save() {
      
        getProductsFromFile(products => {
          if(this.id){
           const findProductIndex = products.findIndex(prod =>prod.id === this.id);
           const updatedProduct = [...products];
           updatedProduct[findProductIndex] = this;
           fs.writeFile(p, JSON.stringify(updatedProduct), err => {
            console.log(err);
          });
          }
         else{
        this.id = Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
        }
        });
      }
     
     
      static fetchAll(cb){//asynchronous function so file read gets added in event listner but function gets called without returning anything thats why cb-call back is called
        getProductsFromFile(cb);
        
     }
     static findById(id,cb){
         getProductsFromFile(products=>{
             const product = products.find(p=>/* The find() method returns the value of the first element in an array that pass a test (provided as a function).

             The find() method executes the function once for each element present in the array:
             
             If it finds an array element where the function returns a true value, find() returns the value of that array element (and does not check the remaining values)
             Otherwise it returns undefined*/
                 p.id ===id);
             cb(product)
         })
     }
     static deleteById(id){
      getProductsFromFile(products=>{
        const product = products.find(p=> p.id === id);
        const updatedProducts = products.filter(p=>
            p.id !==id);/* The filter() method creates an array filled with all array elements that pass a test (provided as a function).

            Note: filter() does not execute the function for array elements without values.
            
            Note: filter() does not change the original array.  */
        fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
          if(!err){
           cart.deleteProduct(id,product.price);
          }
        });
        
    });
     }
     static updateProduct(id){
      var products = this.fetchAll();
      
     }
 } 