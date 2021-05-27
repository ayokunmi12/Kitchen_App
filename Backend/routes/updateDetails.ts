import EXPRESS ,{Router,Request,Response}from 'express'
import Ingredient from '../models/ItemSchema'
const ROUTER:Router=EXPRESS.Router()


ROUTER.post('/updatedetails',(req:Request,res:Response)=>{
    const {id,name,location,category,confection,entrydate,expirydate}=req.body
    Ingredient.findByIdAndUpdate(id,{
        name:name,
        location:location,
        category:category,
        confection:confection,
        entrydate:entrydate,
        expirydate:expirydate
    },{returnOriginal:false})
    .then(Res=>res.send(Res))
    .catch(Err=>console.log(Err))
})

module.exports=ROUTER