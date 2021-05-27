import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()

ROUTER.post('/samecategory',(req:Request,res:Response)=>{
const CATEGORY=req.body.category
Ingredient.find({category:CATEGORY})
.then(Res=>{res.send(Res)})
.catch(Err=>{console.log(Err)})
})



module.exports=ROUTER