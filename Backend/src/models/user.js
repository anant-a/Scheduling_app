const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username 	: {type:String},
	email		: {type:String,unique:true,required:true},
	password 	: {type:String,default:'',required:true},
	activated 	: {type:Boolean,default:false},
	isDeleted 	: {type:Boolean,default:false},
	created 	: {type:Date},
	lastLogin	: {type:Date}
});

module.exports = mongoose.model('User', userSchema)