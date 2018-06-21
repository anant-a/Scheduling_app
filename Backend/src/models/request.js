const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    requestId       :{type:String,required:true},
    name            :{type:String, required: true},
    email           :{type:String, required: true},
    studio          :{type:String, required: true},
    description     :{type: String},
    startTime       :{type:Date, required: true},
    endTime         :{type:Date, required: true},
    timeStamp       :{type:Date, default: Date.now()},
    requestStatus   :{type:String, default:'Pending' },
    isDeleted       :{type:Boolean, default:false}
});

module.exports = mongoose.model('Request', requestSchema)