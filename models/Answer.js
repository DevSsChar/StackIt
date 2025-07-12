const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    votes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        value: {
            type: Number,
            enum: [1, -1],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    voteCount: {
        type: Number,
        default: 0
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    acceptedAt: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating vote count
answerSchema.virtual('calculatedVoteCount').get(function() {
    return this.votes.reduce((total, vote) => total + vote.value, 0);
});

module.exports = mongoose.model('Answer', answerSchema);