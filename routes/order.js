module.exports = function(app,jwt){

    app.post('/createorder',verifyToken,  (req,res) =>{
            jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
            console.log(authdata, "check")
            if(err){
                res.send(403)
            }else{
                var orderdata = {
                    name:req.body.name,
                    mobile:req.body.mobile,
                    address:req.body.address,
                    amount: req.body.amount,    
                    product_id:req.body.product_id
                }
                req.db.get("order").insert(orderdata, (err,order) =>{
                    if(err){
                        res.send({"statuscode": 400, "message":" Order Creation failed"})
                    }else{
                        res.send({"StatusCode":200,"Message":"Order Created Successfully","docs":order,authdata:authdata})
                    }
                })
            }

       
    })


    })
    // jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
    //     if(err){

    //     }else{
            
    //     }
    app.get('/order', verifyToken,(req,res) =>{
        jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
            if(err){
             res.send(403)
            }else{
                req.db.get("order").find({}, {}, (err,order) =>{
                    if(err){
                        res.send({"statuscode": 400, "message":" Order Fecthing failed"})
                    }else{
                        res.send({"StatusCode":200,"Message":"Order Fecthed Successfully","docs":order,authdata:authdata})
                    }
                })
            }

       
    })

    })

    app.get('/order/:mobile',verifyToken, (req,res) =>{
        jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
        if(err){
        res.send(403)
        }else{
            req.db.get("order").find({mobile:req.params.mobile}, {}, (err,order) =>{
                if(err){
                    res.send({"statuscode": 400, "message":" Order Fecthing failed"})
                }else{
                    res.send({"StatusCode":200,"Message":"Order Fecthed Successfully","docs":order,authdata:authdata})
                }
            })  
        }
    })  

    })
    app.get('/update', (req,res) =>{

        jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
            if(err){
            res.send(403)
            }else{
                var orderdata = {
                    name:req.body.name,
                    mobile:req.body.mobile,
                    address:req.body.address,
                    amount: req.body.amount,
                }
                
                req.db.get("order").findOneAndUpdate({_id:req.body._id}, {$set:{orderdata}}, {new:true},(err,order) =>{
                    if(err){
                        res.send({"statuscode": 400, "message":" Order Fecthing failed"})
                    }else{
                        res.send({"StatusCode":200,"Message":"Order Fecthed Successfully","docs":order,authdata:authdata})
                    }
                })
            }
        })

    })

    app.post('/cancelorder/:_id', (req,res) =>{
        jwt.verify(req.token, 'SecretKey',(err,authdata) =>{
            if(err){
            res.send(403)
            }else{
                req.db.get("order").findOneAndDelete({_id:req.params._id}, {}, (err,order) =>{
                    if(err){
                        res.send({"statuscode": 400, "message":" Order Deleting failed"})
                    }else{
                        res.send({"StatusCode":200,"Message":"Order Deleted Successfully","docs":order,authdata:authdata})
                    }
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