
//Questions functionality


exports.createQuestion = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const question = await Question.create({
            title,
            description,
            tags,
            author: req.user._id
        });

        res.status(201).json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('author', 'username')
            .populate({
                path: 'answers',
                populate: { path: 'author', select: 'username' }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('author', 'username')
            .populate({
                path: 'answers',
                populate: { path: 'author', select: 'username' }
            });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuestionsByTags = async (req, res) => {
    try {
        const { tags } = req.query; // expect tags as comma-separated string
        
        // Convert comma-separated string to array and trim whitespace
        const tagArray = tags.split(',').map(tag => tag.trim());
        
        const questions = await Question.find({
            tags: { $in: tagArray } // MongoDB $in operator to match any of the tags
        })
        .populate('author', 'username')
        .populate({
            path: 'answers',
            populate: { path: 'author', select: 'username' }
        })
        .sort({ createdAt: -1 });

        res.json({ 
            success: true, 
            count: questions.length,
            data: questions 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// answers functionality



const Answer = require('../models/Answer');
const Question = require('../models/Question');
const User=require('../models/User')

exports.createAnswer = async (req, res) => {
    try {
        const { content } = req.body;
        const questionId = req.params.questionId;

        const answer = await Answer.create({
            content,
            author: req.user._id,
            question: questionId
        });

        // Update question with new answer
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: answer._id }
        });

        // Create notification for question author
        const question = await Question.findById(questionId);
        await User.findByIdAndUpdate(question.author, {
            $push: {
                notifications: {
                    type: 'answer',
                    content: `${req.user.username} answered your question`,
                }
            }
        });

        res.status(201).json({ success: true, data: answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.voteAnswer = async (req, res) => {
    try {
        const { type } = req.body; // 'upvote' or 'downvote'
        const answer = await Answer.findById(req.params.answerId);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const userId = req.user._id;
        const userUpvoted = answer.votes.upvotes.includes(userId);
        const userDownvoted = answer.votes.downvotes.includes(userId);

        if (type === 'upvote') {
            if (userUpvoted) {
                answer.votes.upvotes.pull(userId);
            } else {
                answer.votes.upvotes.push(userId);
                if (userDownvoted) {
                    answer.votes.downvotes.pull(userId);
                }
            }
        } else if (type === 'downvote') {
            if (userDownvoted) {
                answer.votes.downvotes.pull(userId);
            } else {
                answer.votes.downvotes.push(userId);
                if (userUpvoted) {
                    answer.votes.upvotes.pull(userId);
                }
            }
        }

        await answer.save();
        res.json({ success: true, data: answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.acceptAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.answerId);
        const question = await Question.findById(answer.question);

        if (question.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only question author can accept answers' });
        }

        // Remove previously accepted answer if exists
        if (question.acceptedAnswer) {
            await Answer.findByIdAndUpdate(question.acceptedAnswer, {
                isAccepted: false
            });
        }

        // Accept new answer
        answer.isAccepted = true;
        await answer.save();

        question.acceptedAnswer = answer._id;
        await question.save();

        res.json({ success: true, data: answer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};