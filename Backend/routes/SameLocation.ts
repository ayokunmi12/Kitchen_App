import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()

ROUTER.post('/samelocation',(req:Request,res:Response)=>{
const LOCATION=req.body.location
Ingredient.find({location:LOCATION})
.then(Res=>{res.send(Res)})
.catch(Err=>{console.log(Err)})
})



module.exports=ROUTER