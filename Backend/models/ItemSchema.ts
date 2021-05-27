import {model,Schema,Model,Document}from 'mongoose'


interface INGREDIENTS extends Document{
    name:string
    category:string,
    location:string,
    confection:string,
    expirydate:string,
    entrydate:string
}


const IngredientSchema: Schema =new Schema({
    name:{type:String,required:true,trim:true},
    category:{type:String,enum:['fruit', 'vegetable', 'dairy', 'fish', 'meat', 'liquid','' ],default:''},
    location:{type:String,enum:['pantry','fridge','freezer',''],default:''},
    confection:{type:String,enum:['fresh','canned','frozen','cured',''],default:''},
    expirydate:{type:String,trim:true,default:''},
    entrydate:{type:String}

})

const Ingredient:Model<INGREDIENTS>=model('Ingredient',IngredientSchema)
export default Ingredient


