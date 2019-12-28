let mongoose = require('mongoose');

const historySchema = mongoose.Schema(
    {   
        status: String,
        noteContent: {
            id: String,
            title: String,
            content: String,
            v: String,
            createdAt: Date,
            updatedAt: Date,
        }
    },
    {   
        timestamps: true
    }
);

module.exports = mongoose.model('historyNote', historySchema)