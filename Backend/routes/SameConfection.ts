import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()

ROUTER.post('/sameconfection',(req:Request,res:Response)=>{
const CONFECTION=req.body.confection
Ingredient.find({confection:CONFECTION})
.then(Res=>{res.send(Res)})
.catch(Err=>{console.log(Err)})
})



module.exports=ROUTER