module.exports = function(app,jwt){
/**
 * @swagger
 * /register:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
app.post('/register', (req,res) =>{
    var data ={
        name:req.body.name,
        mobile: req.body.mobile,
        password: req.body.password,
     }
    req.db.get("Users").insert(data, (err,users)=>{
    

        if(err){
            res.send({"statuscode": 400, "message":"failed"})
        }else{
            res.send({"StatusCode":200,"Message":"Success","docs":users})
        }
    })

})


app.post('/login', (req,res) =>{
        var data = {
            mobile:req.body.mobile,
            password:req.body.password
        }
        jwt.sign({data:data},'SecretKey',{expiresIn:'180s'},function(err, token){
     

     
    req.db.get('Users').findOne({$and: [ {mobile:req.body.mobile},{password:req.body.password} ]},{},(err,log) =>{
        if(log != null){
            res.send({"StatusCode":200,"Message":"Success LoggedIn","docs":log,authtoken:token})

        }else{
            res.send({"statuscode": 400, "message":"Invalid Credential"})

        }
        
    })
})

})


}