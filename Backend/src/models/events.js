const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name            :{type:String, required: true},
    email           :{type:String, required: true},
    studio          :{type:String, required: true},
    description     :{type: String},
    startTime       :{type:Date, required: true},
    endTime         :{type:Date, required: true},
    timeStamp       :{type:Date, default: Date.now()},
    requestStatus   :{type:String, default:'Pending' },
    isDeleted       :{type:Boolean, default:false},
    manager         :{type:String, required: true},
    team            :{type:String, required: true},
    shootType       :{type:String, required: true},
    assets          :{type:String, required: true},
    crew            :{type:String, required: true}
});

module.exports = mongoose.model('Event', eventSchema)