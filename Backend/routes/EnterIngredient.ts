import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()
import timestamp from 'time-stamp'
import DateCalculator from '../middleware/DateCalculator'


ROUTER.post('/enterIngredient',(req:Request,res:Response)=>{
    const entrydate=timestamp('YYYY/MM/DD')
    const { name, category, location, confection, expirydate}=req.body

    const INGREDIENT= new Ingredient({
        name:name,category:category,location:location,confection:confection,expirydate:expirydate,entrydate:entrydate
    })

    INGREDIENT.save()
    .then(Res=>{res.send(Res)})
    .catch(Err=>{console.log(Err)})
    
}) 

ROUTER.post('/enterIngredientwithdays',DateCalculator,(req:Request,res:Response)=>{
    const entrydate=timestamp('YYYY/MM/DD')
    const ExpiryDate=req.body.date
    const { name, category, location, confection}=req.body

    const INGREDIENT= new Ingredient({
        name:name,category:category,location:location,confection:confection,expirydate:ExpiryDate,entrydate:entrydate
    })

    INGREDIENT.save()
    .then(Res=>{res.send(Res)})
    .catch(Err=>{console.log(Err)})
    
}) 









module.exports=ROUTER