import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
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
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating vote count
questionSchema.virtual('calculatedVoteCount').get(function() {
    return this.votes.reduce((total, vote) => total + vote.value, 0);
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
export default Question;