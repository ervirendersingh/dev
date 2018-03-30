let mongoose = require('mongoose');

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
