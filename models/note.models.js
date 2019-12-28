let mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        title: String,
        content: String
    },
    {   
        timestamps: true
    }
);
noteSchema.pre('findOneAndUpdate', function(next) {
    this.updateOne({}, {$inc: {__v: 0.5}}, next );
})


module.exports = mongoose.model('Notes', noteSchema)