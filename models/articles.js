let mongoose = require('mongoose');

//Addedd new comeent
// Articles schema
let Schema = mongoose.Schema;
let articlesSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type:String,
    required: true
  },
  body:{
    type:String,
    required:true
  }
});

let Articles = module.exports = mongoose.model('Articles', articlesSchema);
