import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()
import DateCalculator from '../middleware/DateCalculator'



ROUTER.post('/expiresoon',DateCalculator,(req:Request,res:Response)=>{
    const DATE=req.body.date
    Ingredient.find({expirydate:DATE})
    .then(Res=>{
        res.send(Res)
    }).catch(Err=>{console.log(Err)})
    
})












module.exports=ROUTER