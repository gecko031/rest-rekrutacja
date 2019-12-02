let mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        _id: Number,
        title: String,
        content: String,
        __v: Number
    },
    {   
        timestamps: true
    }
);
noteSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, {$inc: {__v: 0.5}}, next );
})


module.exports = mongoose.model('NoteModel', noteSchema)