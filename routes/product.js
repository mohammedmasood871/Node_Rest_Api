module.exports = function(app,jwt){
    var multer = require('multer')

    var storage =   multer.diskStorage({
        destination: 'uploads',
        filename: function (req, file, callback) {
          callback(null, file.originalname );
        }
      });
      // text/csv application/vnd.ms-excel
      
      var upload = multer({ storage : storage}).single('uploader');
       
      app.post('/upload',upload,verifyToken,function(req,res){

        jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
          if(err){
          res.send(403)
          }else{
            if( req.file.mimetype ==  "text/csv" || req.file.mimetype =="application/vnd.ms-excel"){

              var data ={
                 uploadedFile : "uploads/" +req.originalname,
                 productname:req.body.name
              }
                req.db.get('product').insert(data, (e, callback)=>{
                  console.log(callback)
                  res.send({"status":200,"message":"file uploaded Successfully"})
  
                })
             
  
  
            }else{
              res.send({"status":404,"message":"Invalid file type please upload excel or csv file "})
  
            }
          }
      })
          
      });

       app.get('/product/:product', verifyToken, (req,res) =>{


         jwt.verify(req.token,'SecretKey', (err,authdata) =>{
             if(err){
               res.send(403)
             }else{
               req.db.get('order').find({product_id:req.params.product}, {}, (e, data)=>{
                 console.log(e)

                res.send({"status":200,"message":"file uploaded Successfully", searchdata:data})

               })
             }


         })
       })



        
            // Verifing token 
      function verifyToken(req,res,next){
        //   setting header
          const tokenHeder =  req.headers['authorization']

          if(typeof tokenHeder !== 'undefined'){
                // spliting array for header
                 const token = tokenHeder.split(' ');
                 //token value from array
                 const tokenarray = token[1];
                 // token value 
                 req.token = tokenarray;
                 next();
          }else{
              res.send(403)
          }

      }


    // verifing token
}
