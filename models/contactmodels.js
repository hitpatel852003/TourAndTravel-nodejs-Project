const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
firstname : {type:String, require:true},
lastname : {type:String, require:true},
email : {type:String, require:true, unique:true},
message : String,
subscribedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Contact', contactSchema);