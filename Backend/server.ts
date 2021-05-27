import EXPRESS,{Application} from 'express'
import 'dotenv/config'
import cors from 'cors'
import MONGOOSE from 'mongoose'
const APP:Application=EXPRESS()
const {PORT,MONGO_URL}=process.env

APP.use(EXPRESS.json())
APP.use(cors())

MONGOOSE.connect(`${MONGO_URL}`,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false })
.then(Res=>{
    console.log(">>>>....DATABASE CONNECTED....<<<<")
   //console.log(Res)
}).catch(Err=>{console.log(Err)})

APP.use('/kitchen',require('./routes/EnterIngredient'))
APP.use('/kitchen',require('./routes/WillExpireIn'))
APP.use('/kitchen',require('./routes/RecentAdded'))
APP.use('/kitchen',require('./routes/SameCategory'))
APP.use('/kitchen',require('./routes/SameConfection'))
APP.use('/kitchen',require('./routes/SameLocation'))
APP.use('/kitchen',require('./routes/FetchIngredients'))
APP.use('/kitchen',require('./routes/updateDetails'))

 

APP.listen(PORT,()=>{
    console.log(`Server is listening on PORT:${PORT}`)
})












//const add=(a:number,b:number):number=>a+b
  // console.log(add(5,5))