import {Request,Response,NextFunction} from 'express'
import datetime from 'node-datetime'
import timeStamp from 'time-stamp'


function DateCalculator(req:Request,res:Response,next:NextFunction){
const days=req.body.days
const daysInMS=1000*3600*24*days



    const todayDate=timeStamp('YYYY/MM/DD')


    const todayDateTimeStamp = datetime.create(todayDate); 


    const todayDateTimeStampInMS = todayDateTimeStamp.now();


    const destDateInMS=todayDateTimeStampInMS+daysInMS


    const destDateTimeStamp=datetime.create(destDateInMS)


    const destDate:string=destDateTimeStamp.format('Y/m/d')
    
    

    req.body.date=destDate
    next()

}
export default DateCalculator



