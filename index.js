const express = require('express')
const app = express()
const path = require('path')
const swaggerUi = require('swagger-ui-express');

const bodyparser = require('body-parser')
 const mongoose = require('mongoose')

 const monk = require('monk')
 const morgan = require('morgan')
 var jwt = require('jsonwebtoken')
 const dburl = "mongodb+srv://mohammed:GnVfs5D88z5zyA18@cluster0.hwv3s.mongodb.net/Restapi"



const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'Hello World',
    
    },
  },
 apis:["index.js","./routes/user"]
};

const swaggerjssetup = swaggerJsdoc(options);

 mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }); // Mongoose for login
 var db = monk(dburl); // Monk For API View

 app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerjssetup))
 
 app.use(function(req, res, next) { req.db = db;
     next(); })
 app.use(morgan('dev'));
 app.use(express.static(path.join(__dirname, 'public' ))) 

 app.use(bodyparser());
 app.use(bodyparser.urlencoded({
    extended: true  
}));
 app.set('view engine', 'ejs');


 app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    // Pass to next layer of middleware
    next();
});


 

app.get('',(req,res) =>{
  res.send('hello worldrs')
})

 require('./routes/user')(app,jwt)
 require('./routes/order')(app,jwt)

 require('./routes/product')(app,jwt)

 app.listen(8000, function(err, run) {
     console.log("running in port 8000")
 })