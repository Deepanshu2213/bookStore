const serv = require('http');//global module http by node js
const BodyParser = require('body-parser');
const express= require('express');
const app= express();
//const expressHbs= require('express-handlebars')
const path =require('path');
const admin = require('./routes/admin');
const shop = require('./routes/shop');
const db = require('./util/database');

app.use(BodyParser.urlencoded({extended: false}));
/*app.engine('hbs',expressHbs({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "/views"
  }));*/
app.set('view engine','ejs');
////app.set('view engine','pug');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(shop);
app.use('/admin',admin);

app.use('/message',(req,res,next)=>{
            console.log("4nd middlewear"); 
           // res.send('<h1>Welcome to 3 the express js Platform</h1>');
           res.redirect('/');
            });
            app.use('/',(req,res,next)=>{
                console.log("1st middlewear")
                //res.status(404).sendFile(path.join(__dirname,'views','404.html'))
                res.status(404).render('404',{PageTitle: 'Page Not Found',path: ''});
                
            });
app.listen(3000); //npm init for json package
//install 3rd party package npm install nodemon --save-dev in this project only 
//npm install nodemen --g for global {dont run} 
// npm install --save express for installing express
 //npm body parser npm install --save body-parser
 //npm install --save ejs pug express-handlebars for installing templates
 //npm install --save mysql2 install mysql