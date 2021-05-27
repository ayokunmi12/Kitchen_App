import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()

ROUTER.post('/fetchIngredients',(req:Request,res:Response)=>{
    Ingredient.find({})
    .then(Res=>{res.send(Res)}).catch(Err=>{console.log(Err)})
})

module.exports=ROUTER