
# Start this appication 
`npm i `

`nodemon index.js `

# How to use this api

`http://localhost:8000/register` - To register user 
## Method : Post

##  parameters 
##  data ={
         name:String
        mobile: Number,
        password: String,
}


`http://localhost:8000/login` - To login   
## Method : Post

##  parameters 
##  data ={
        mobile: Number,
        password: String,
}

`Copy the Jwt token and pass it in header  as Authorization : tokenHeder + jwttoken`

`http://localhost:8000/createorder` - To create order     
## Method : Post

##  parameters 
##  data ={
                    name:String,
                    mobile:number,
                    address:String,
                    amount: number,    
                    product_id:String
}


`http://localhost:8000/order` - To get order data  
## Method : Get



`http://localhost:8000/order/:mobile` - To ordered by customer     
## Method : Get
##  parameters 
##  data ={
                    name:String,
                    mobile:number,
                    address:String,
                    amount: number,    
                    product_id:String
}


`http://localhost:8000/cancelorder/:_id` - To Cancel Order     
## Method : Post
##  parameters 
##  data ={
                    name:string,
                    mobile:Number,
                    address:string,
                    amount: string,
                    uid:string,// ORDER Id should be passed to update order
}



`http://localhost:8000/cancelorder/:_id` - To delete Order     
## Method : Post
## order id should be passed to delete the order




`http://localhost:8000/upload` - To upload Product     
## Method : Post
##  parameters 
##  data ={
                    uploader:file,
                    productname:String

}


`http://localhost:8000/product/:product` - To find product based product id     
## Method : Post
## product id should be passed to fetch the product

