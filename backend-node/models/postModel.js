const mongoose = require('mongoose')

const {Schema} = mongoose
const postSchema = new mongoose.Schema({
   
    username:{
        type:String
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    comments:[{
        
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{ collation: { locale: 'en_US', strength: 1 } }
)

module.exports  = mongoose.model('post', postSchema)

